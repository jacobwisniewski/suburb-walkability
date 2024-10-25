import { NextApiRequest, NextApiResponse } from "next";
import { initializeAppDataSource } from "@/helpers/initializeDataSource";
import { getIsochroneForLocation } from "@/helpers/getLocationIsochrone";
import { FeatureCollection, MultiPolygon } from "geojson";
import { Point, Polygon } from "typeorm";
import { doAllIsochronesExist } from "@/helpers/queries/doAllIsochronesExist";
import { getLocationsWithoutIsochrones } from "@/helpers/queries/getLocationsWithoutIsochrones";
import { getSuburbsWithFilters } from "@/helpers/queries/getSuburbsWithFilters";
import { IsochroneFilter, PoiType } from "@/pages/api/poiValues";

export interface QueryBodyParams {
  commuteFilters: IsochroneFilter[];
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  propertyTypes: ("house" | "unit")[];
}

export interface QueryResponse {
  commutePolygon: {
    union: FeatureCollection<MultiPolygon>;
    poi: {
      poiType: PoiType;
      points: FeatureCollection<Point>;
    };
  };
  pocketPolygons: FeatureCollection<
    Polygon,
    { sa1Code: string; salCode: string }
  >;
  suburbPolygons: FeatureCollection<Polygon, { salCode: string }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse | { error: string }>,
) {
  try {
    await initializeAppDataSource();
    const { commuteFilters, minPrice, maxPrice, minBedrooms, propertyTypes } =
      req.body as QueryBodyParams;

    // Check if the isochrones for the commute filters are already in the database
    // If not, fetch them and store them in the database
    for (const filter of commuteFilters) {
      const allIsochronesExist = await doAllIsochronesExist(filter);

      if (!allIsochronesExist) {
        const locations = await getLocationsWithoutIsochrones(filter);

        for (const location of locations) {
          await getIsochroneForLocation(
            location,
            filter.type,
            filter.method,
            filter.value,
          );
        }
      }
    }

    // Query for the suburbs that satisfy the filters
    const { commutePolygon, pocketPolygons, suburbPolygons } =
      await getSuburbsWithFilters({
        commuteFilters,
        minPrice,
        maxPrice,
        minBedrooms,
        propertyTypes,
      });

    res.status(200).json({
      pocketPolygons,
      commutePolygon,
      suburbPolygons,
    });
  } catch (error) {
    console.error("Failed to fetch intersection of isochrones:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

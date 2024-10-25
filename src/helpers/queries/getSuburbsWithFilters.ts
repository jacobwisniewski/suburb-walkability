import { Point, Polygon } from "typeorm";
import { FeatureCollection, MultiPolygon } from "geojson";
import { getIntersectionFromIsochroneFilters } from "./getIntersectionFromIsochroneFilters";
import { getPocketsFromIsochroneFilters } from "./getPocketsFromIsochroneFilters";
import { getSuburbsFromIsochroneFilters } from "./getSuburbsFromIsochroneFilters";
import { IsochroneFilter, PoiType } from "@/pages/api/poiValues";

interface GetSuburbsWithFiltersArgs {
  commuteFilters: IsochroneFilter[];
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  propertyTypes: ("house" | "unit")[];
}

export const getSuburbsWithFilters = async ({
  commuteFilters,
  minPrice,
  maxPrice,
  minBedrooms,
  propertyTypes,
}: GetSuburbsWithFiltersArgs): Promise<{
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
}> => {
  const [
    commuteFeatureCollection,
    pocketsFeatureCollection,
    suburbsFeatureCollection,
  ] = await Promise.all([
    await getIntersectionFromIsochroneFilters(commuteFilters),
    await getPocketsFromIsochroneFilters(
      commuteFilters,
      minPrice,
      maxPrice,
      minBedrooms,
      propertyTypes,
    ),
    await getSuburbsFromIsochroneFilters(
      commuteFilters,
      minPrice,
      maxPrice,
      minBedrooms,
      propertyTypes,
    ),
  ]);

  return {
    commutePolygon: {
      union: commuteFeatureCollection,
      poi: {
        poiType: commuteFilters[0].poi,
        points: {
          type: "FeatureCollection",
          features: [],
        },
      },
    },
    pocketPolygons: pocketsFeatureCollection,
    suburbPolygons: suburbsFeatureCollection,
  };
};

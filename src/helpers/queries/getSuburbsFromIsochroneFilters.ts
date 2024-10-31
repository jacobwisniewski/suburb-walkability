import { AppDataSource } from "@/data-source";
import { getIntersectionQuery } from "./getIntersectionQuery";
import { FeatureCollection, Polygon } from "geojson";
import { IsochroneFilter } from "@/pages/api/poiValues";

export const getSuburbsFromIsochroneFilters = async (
  filters: IsochroneFilter[],
  minPrice: number,
  maxPrice: number,
  minBedrooms: number,
  propertyTypes: ("house" | "unit")[],
): Promise<FeatureCollection<Polygon, { salCode: string }>> => {
  const intersectionQuery = getIntersectionQuery(filters);

  const combinedQuery = `
    ${intersectionQuery},
    filtered_properties AS (
      SELECT sal.code AS "salCode", sal.geometry
      FROM sal
      JOIN property_price pp ON sal.code = pp."salCode"
      WHERE pp.value BETWEEN $1 AND $2
        AND pp.bedrooms >= $3
        AND pp.type = ANY($4)
    )
    SELECT DISTINCT ON (fp.geometry) ST_AsGeoJSON(fp.geometry) AS geometry, fp."salCode"
    FROM filtered_properties fp
    JOIN intersection ON ST_Intersects(fp.geometry, intersection.intersection)
  `;

  const results = (await AppDataSource.manager.query(combinedQuery, [
    minPrice,
    maxPrice,
    minBedrooms,
    propertyTypes,
  ])) as { geometry: string; salCode: string }[];

  return {
    type: "FeatureCollection",
    features: results.map(({ geometry, salCode }) => ({
      type: "Feature",
      geometry: JSON.parse(geometry),
      properties: { salCode },
    })),
  };
};

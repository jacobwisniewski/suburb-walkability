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
    ${intersectionQuery}
      
    SELECT DISTINCT ON (sal.geometry) ST_AsGeoJSON(sal.geometry) AS geometry, sal.code AS "salCode"
    FROM sal 
      JOIN property_price pp ON sal.code = pp."salCode"
      JOIN intersection ON ST_Intersects(sal.geometry, intersection.intersection)
    WHERE pp.value BETWEEN $1 AND $2
      AND pp.bedrooms >= $3
      AND pp.type = ANY($4)
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

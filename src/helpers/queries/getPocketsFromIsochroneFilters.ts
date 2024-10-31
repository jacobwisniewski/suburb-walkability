import { FeatureCollection, Polygon } from "geojson";
import { AppDataSource } from "@/data-source";
import { getIntersectionQuery } from "./getIntersectionQuery";

import { IsochroneFilter } from "@/pages/api/poiValues";

export const getPocketsFromIsochroneFilters = async (
  filters: IsochroneFilter[],
  minPrice: number,
  maxPrice: number,
  minBedrooms: number,
  propertyTypes: ("house" | "unit")[],
): Promise<
  FeatureCollection<Polygon, { sa1Code: string; salCode: string }>
> => {
  const intersectionQuery = getIntersectionQuery(filters);

  const combinedQuery = `
    ${intersectionQuery},
    valid_sal_geometries AS (
      SELECT DISTINCT sal.geometry, sal.code
      FROM sal
      JOIN property_price pp ON sal.code = pp."salCode"
      WHERE pp.value BETWEEN $1 AND $2
        AND pp.bedrooms >= $3
        AND pp.type = ANY($4)
    )
    SELECT DISTINCT ON (sa1.geometry)
      ST_AsGeoJSON(sa1.geometry) as geometry,
      sa1.code as "sa1Code",
      valid_sal_geometries.code as "salCode"
    FROM valid_sal_geometries
    JOIN sa1_sal_mapping ON valid_sal_geometries.code = sa1_sal_mapping.sal_code
    JOIN sa1 ON sa1_sal_mapping.sa1_code = sa1.code
    JOIN intersection ON ST_Intersects(sa1.geometry, intersection.intersection)
  `;

  console.time("getPocketsFromIsochroneFilters");
  const sa1Results = (await AppDataSource.manager.query(combinedQuery, [
    minPrice,
    maxPrice,
    minBedrooms,
    propertyTypes,
  ])) as { geometry: string; sa1Code: string; salCode: string }[];
  console.timeEnd("getPocketsFromIsochroneFilters");

  return {
    type: "FeatureCollection",
    features: sa1Results.map(({ geometry, salCode, sa1Code }) => ({
      type: "Feature",
      geometry: JSON.parse(geometry),
      properties: { sa1Code, salCode },
    })),
  };
};

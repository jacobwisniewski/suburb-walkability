import { getTableNameFromPoi } from "./getEntityFromPoiType";

import { IsochroneFilter } from "@/pages/api/poiValues";

export const getIntersectionQuery = (filters: IsochroneFilter[]): string => {
  const withClauses = filters
    .map(
      (filter, index) => `
        union_isochrones_${index} AS (
          SELECT ST_Union(isochrone.geom) as union_geom
          FROM isochrone
          INNER JOIN ${getTableNameFromPoi(filter.poi)} entity ON entity.id = isochrone."locationId"
          WHERE isochrone."transportType" = '${filter.type}'
            AND isochrone.method = '${filter.method}'
            AND isochrone.value = ${filter.value}
        )`,
    )
    .join(", ");

  return `
    WITH 
        ${withClauses},
        intersection AS (
            SELECT ST_IntersectionArray(ARRAY[${filters.map((_, index) => `(SELECT union_geom FROM union_isochrones_${index})`).join(", ")}]) AS intersection
        )
  `;
};

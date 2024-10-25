import { AppDataSource } from "@/data-source";
import { FeatureCollection, MultiPolygon } from "geojson";
import { getIntersectionQuery } from "./getIntersectionQuery";

import { IsochroneFilter } from "@/pages/api/poiValues";

export const getIntersectionFromIsochroneFilters = async (
  filters: IsochroneFilter[],
): Promise<FeatureCollection<MultiPolygon>> => {
  const intersectionQuery = getIntersectionQuery(filters);

  const combinedQuery = `
  ${intersectionQuery}
  SELECT ST_AsGeoJSON(intersection.intersection) AS intersection FROM intersection  
  `;

  const intersection = await AppDataSource.manager.query(combinedQuery);

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: JSON.parse(intersection[0].intersection),
        properties: {},
      },
    ],
  };
};

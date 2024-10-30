import { getEntityFromPoi, getTableNameFromPoi } from "./getEntityFromPoiType";
import { Location } from "@/entity/Location";
import { AppDataSource } from "@/data-source";

import { IsochroneFilter } from "@/pages/api/poiValues";

export const getLocationsWithoutIsochrones = async ({
  poi,
  type,
  method,
  value,
}: IsochroneFilter): Promise<Location[]> => {
  const entity = getTableNameFromPoi(poi);

  return await AppDataSource.manager
    .createQueryBuilder(Location, "location")
    .innerJoin(entity, "entity", "entity.id = location.id")
    .where(
      `location.id NOT IN (
        SELECT isochrone."locationId"
        FROM isochrone
        WHERE isochrone."transportType" = :type
        AND isochrone.method = :method
        AND isochrone.value = :value
      )`,
      {
        type,
        method,
        value,
      },
    )
    .getMany();
};

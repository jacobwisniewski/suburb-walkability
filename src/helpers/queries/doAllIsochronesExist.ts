import { getTableNameFromPoi } from "./getEntityFromPoiType";
import { AppDataSource } from "@/data-source";
import { Location } from "@/entity/Location";

import { IsochroneFilter } from "@/pages/api/poiValues";
import { createConnection } from "typeorm";

export const doAllIsochronesExist = async ({
  poi,
  type,
  method,
  value,
}: IsochroneFilter): Promise<boolean> => {
  const entity = getTableNameFromPoi(poi);

  // Query for getting number of locations that do not have the isochrone
  const count = await AppDataSource.manager
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
    .getCount();

  return count === 0;
};

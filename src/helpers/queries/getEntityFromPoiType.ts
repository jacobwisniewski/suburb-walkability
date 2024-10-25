import { PtvStation } from "@/entity/PtvStation";
import { WoolworthsStore } from "@/entity/WoolworthsStore";
import { Coles } from "@/entity/Coles";
import { Aldi } from "@/entity/Aldi";
import { AppDataSource } from "@/data-source";

import { PoiType } from "@/pages/api/poiValues";

export type AcceptedLocations =
  | typeof PtvStation
  | typeof WoolworthsStore
  | typeof Coles
  | typeof Aldi;

export const getEntityFromPoi = (poi: PoiType): AcceptedLocations => {
  switch (poi) {
    case "ptv-stations":
      return PtvStation;
    case "woolworths":
      return WoolworthsStore;
    case "coles":
      return Coles;
    case "aldi":
      return Aldi;
  }
};

export const getTableNameFromPoi = (poi: PoiType): string => {
  const metadata = AppDataSource.getMetadata(getEntityFromPoi(poi));
  return metadata.tableName;
};

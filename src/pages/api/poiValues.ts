import {
  IsochroneMethod,
  IsochroneTransportType,
} from "@/helpers/getLocationIsochrone";

export const poiValues = [
  "ptv-stations",
  "woolworths",
  "coles",
  "aldi",
] as const;
export type PoiType = (typeof poiValues)[number];

export interface IsochroneFilter {
  poi: PoiType;
  type: IsochroneTransportType;
  method: IsochroneMethod;
  value: number;
}

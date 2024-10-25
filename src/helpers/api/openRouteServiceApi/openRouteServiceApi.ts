import dotenv from "dotenv";
import type {IsochroneResponse} from "./types.ts";
import { baseApiClient } from "../baseClient";

dotenv.config();

const BASE_URL =
  process.env["OPEN_ROUTE_SERVICE_HOST"] ?? "https://api.openrouteservice.org";

export const openRouteServiceApi = baseApiClient.extend({
  prefixUrl: BASE_URL,
  headers: {
    Accept: "application/geo+json;charset=UTF-8",
  },
});

export const getIsochrone = async (
  locationCoordinates: [number, number],
  transportType: "foot-walking" | "driving-car",
  value: number,
  method: "distance" | "time",
): Promise<IsochroneResponse> =>
  await openRouteServiceApi
    .post(`v2/isochrones/${transportType}`, {
      json: {
        locations: [locationCoordinates as [number, number]],
        range: [method === "time" ? value : value],
        units: "km",
        range_type: method,
        smoothing: 0.9,
        area_units: "km",
      },
    })
    .json();

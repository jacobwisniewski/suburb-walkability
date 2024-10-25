import dotenv from "dotenv";
import {baseApiClient} from "../baseClient";
import {GoogleMapsGeocodeResponse} from "./types";

dotenv.config();

const googleMapsApi = baseApiClient.extend({
  prefixUrl: "https://maps.googleapis.com",
  searchParams: {
    key: process.env.GOOGLE_MAPS_API_KEY,
  },
  responseType: "json",
});

export const getCoordinates = async (address: string): Promise<GoogleMapsGeocodeResponse> =>
  await googleMapsApi.get("maps/api/geocode/json", {
    searchParams: {
      address,
    },
  }).json();
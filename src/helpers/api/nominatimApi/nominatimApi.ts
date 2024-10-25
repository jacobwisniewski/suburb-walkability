import {baseApiClient} from "../baseClient";
import pLimit from "p-limit";
import {FeatureCollection} from "geojson";
import {Point} from "typeorm";

const limit = pLimit(1);

export const nominatimApi = baseApiClient.extend({
  prefixUrl: "https://nominatim.openstreetmap.org",
  hooks: {
    beforeRequest: [
      async () => {
        await limit(() => new Promise(resolve => setTimeout(resolve, 1000)));
      }
    ]
  }
});


export const getCoordinates = async (address: string): Promise<FeatureCollection<Point, Location>> =>
  await nominatimApi.get("search", {
    searchParams: {
      q: address,
      format: "geojson",
    },
  }).json()

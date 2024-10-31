import { Isochrone } from "@/entity/Isochrone";
import { Location } from "@/entity/Location";
import { getIsochrone } from "./api/openRouteServiceApi/openRouteServiceApi";
import { AppDataSource } from "@/data-source";

export type IsochroneTransportType = "foot-walking" | "driving-car";
export type IsochroneMethod = "distance" | "time";

export const getIsochroneForLocation = async (
  location: Location,
  transportType: IsochroneTransportType = "foot-walking",
  method: IsochroneMethod = "time",
  value: number = 900,
): Promise<Isochrone | null> => {
  try {
    console.log("ENV IS", process.env["OPEN_ROUTE_SERVICE_HOST"]);
    const response = await getIsochrone(
      location.geom.coordinates as [number, number],
      transportType,
      value,
      method,
    );
    console.log(
      `Fetching isochrone for ${location.id} with ${transportType} ${method} ${value}`,
    );

    const isochrone = new Isochrone();
    isochrone.geom = response.features[0].geometry;
    isochrone.locationId = location.id;
    isochrone.method = method;
    isochrone.transportType = transportType;
    isochrone.value = value;

    await AppDataSource.manager.save(isochrone);

    return isochrone;
  } catch (error) {
    console.error("Failed to fetch isochrone:", {
      locationId: location.id,
      transportType,
      method,
      value,
      error,
    });
    return null;
  }
};

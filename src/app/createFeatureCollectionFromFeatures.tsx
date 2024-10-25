import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";

export const createFeatureCollectionFromFeatures = <
  G extends Geometry | null = Geometry,
  P = GeoJsonProperties,
>(
  features: Feature<G, P>[],
): FeatureCollection<G, P> => ({
  type: "FeatureCollection",
  features: features.map((feature) => ({
    type: "Feature",
    geometry: feature.geometry,
    properties: feature.properties,
  })),
});
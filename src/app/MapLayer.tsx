import React, { ComponentProps, FunctionComponent } from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import { FeatureCollection } from "geojson";

export interface PolygonLayerProps {
  id: string;
  name: string;
  geojson: FeatureCollection;
  layer: Omit<ComponentProps<typeof Layer>, "id">;
  visible?: boolean;
}

export const MapLayer: FunctionComponent<PolygonLayerProps> = ({
  id,
  geojson,
  layer,
  visible = true,
}) => {
  return (
    <Source id={`${id}Source`} type="geojson" data={geojson}>
      {/* @ts-expect-error: Ignore type error for layer prop */}
      {visible && <Layer {...layer} id={`${id}Layer`} />}
    </Source>
  );
};

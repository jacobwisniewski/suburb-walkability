import React, { ComponentProps, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapLayer } from "@/app/MapLayer";

interface LayerToggleProps {
  layers: ComponentProps<typeof MapLayer>[];
  visibleLayers: { [key: string]: boolean };
  setVisibleLayer: (
    value:
      | ((prevState: { [p: string]: boolean }) => { [p: string]: boolean })
      | { [p: string]: boolean },
  ) => void;
}

export function LayerToggle({
  layers,
  visibleLayers,
  setVisibleLayer,
}: LayerToggleProps) {
  useEffect(() => {
    const initialVisibleLayers = layers.reduce(
      (acc, layer) => ({
        ...acc,
        [layer.id]: true,
      }),
      {},
    );
    setVisibleLayer(initialVisibleLayers);
  }, []);

  const handleToggleLayer = (layerId: string) => {
    setVisibleLayer((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  return (
    <Card className="w-64">
      <CardContent className="p-4">
        {layers.map((layer) => (
          <div key={layer.id} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={layer.id}
              checked={visibleLayers[layer.id]}
              onCheckedChange={() => handleToggleLayer(layer.id)}
            />
            <div
              className="w-4 h-4 border"
              style={{
                borderColor:
                  (layer.layer as any)?.paint?.["line-color"] || "transparent",
                backgroundColor:
                  (layer.layer as any)?.paint?.["fill-color"] || "transparent",
              }}
            />
            <Label htmlFor={layer.id}>{layer.name}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

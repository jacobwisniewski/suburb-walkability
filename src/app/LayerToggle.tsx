import React, { ComponentProps } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapLayer } from "@/app/MapLayer";

interface LayerToggleProps {
  layers: ComponentProps<typeof MapLayer>[];
  visibleLayers: { [key: string]: boolean };
  onToggle: (layerId: string) => void;
}

export function LayerToggle({
  layers,
  visibleLayers,
  onToggle,
}: LayerToggleProps) {
  return (
    <Card className="w-64">
      <CardContent className="p-4">
        {layers.map((layer) => (
          <div key={layer.id} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={layer.id}
              checked={visibleLayers[layer.id]}
              onCheckedChange={() => onToggle(layer.id)}
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

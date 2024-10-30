"use client";
import React, { ComponentProps, useEffect, useState } from "react";
import Map, { MapLayerMouseEvent, MapRef } from "react-map-gl/maplibre";
import styled from "styled-components";
import IsochroneFilterForm from "./IsochroneFilterForm";
import { QueryBodyParams, QueryResponse } from "@/pages/api/query";
import { MapLayer } from "./MapLayer";
import { LayerToggle } from "./LayerToggle";
import turf from "turf";
import dotenv from "dotenv";

dotenv.config();

export const Body = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
`;

export const MapContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const Controls = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

export const LayerToggles = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 2;
`;

const Home = () => {
  const [data, setData] = useState<ComponentProps<typeof MapLayer>[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState<{
    [key: string]: boolean;
  }>({});
  const [highlightedSuburb, setHighlightedSuburb] = useState<string | null>(
    null,
  );
  const mapRef = React.useRef<MapRef>(null);

  useEffect(() => {
    if (!data && !isLoading) {
      setIsLoading(true);
      fetchDataAndLoadLayers({
        commuteFilters: [
          {
            poi: "ptv-stations",
            type: "foot-walking",
            method: "time",
            value: 600,
          },
        ],
        minPrice: 0,
        maxPrice: 1000000,
        minBedrooms: 1,
        propertyTypes: ["house", "unit"],
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [data, isLoading]);

  const fetchDataAndLoadLayers = async (
    filters: QueryBodyParams,
  ): Promise<void> => {
    const queryResponse: QueryResponse = await (
      await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      })
    ).json();

    setData([
      {
        id: "commuteIsochrone",
        name: "Commute Isochrone",
        geojson: queryResponse.commutePolygon.union,
        layer: {
          type: "fill",
          paint: {
            "fill-color": "#0000FF",
            "fill-opacity": 0.2,
          },
        },
      },
      {
        id: "suburbs",
        name: "Valid Suburbs",
        geojson: queryResponse.suburbPolygons,
        layer: {
          type: "line",
          paint: {
            "line-color": "#33cd33",
            "line-opacity": 0.5,
          },
        },
      },
      {
        id: "pockets",
        name: "Valid Pockets",
        geojson: queryResponse.pocketPolygons,
        layer: {
          type: "fill",
          paint: {
            "fill-color": "#00FF00",
            "fill-opacity": 0.2,
          },
        },
      },
    ]);
    return;
  };

  const handleToggleLayer = (layerId: string) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  const handlePocketClick = (event: MapLayerMouseEvent) => {
    if (!event.features?.at(0) || !data) return;

    const clickedPocket = event.features[0];
    const clickedSalCode = clickedPocket.properties.salCode;

    const suburbLayer = data?.find((layer) => layer.id === "suburbs");

    if (!suburbLayer) return;

    const suburb = suburbLayer.geojson.features.find(
      (suburb) => suburb.properties?.salCode === clickedSalCode,
    );

    if (!suburb || !suburb.properties || !suburb.geometry) return;

    setHighlightedSuburb(suburb.properties.salCode);
    const bbox = turf.bbox(suburb) as [number, number, number, number];

    mapRef.current?.fitBounds(bbox, {
      padding: 20,
    });
  };

  return (
    <Body>
      <Controls>
        <IsochroneFilterForm onSubmit={fetchDataAndLoadLayers} />
      </Controls>
      {data && (
        <LayerToggles>
          <LayerToggle
            layers={data}
            visibleLayers={visibleLayers}
            onToggle={handleToggleLayer}
          />
        </LayerToggles>
      )}
      <MapContainer>
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: 144.9631,
            latitude: -37.8136,
            zoom: 10,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={`https://api.maptiler.com/maps/positron/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
          interactive={true}
          interactiveLayerIds={["pocketsLayer"]}
          onClick={handlePocketClick}
          attributionControl={false}
        >
          {data &&
            data.map(({ id, geojson, layer }) => (
              <MapLayer
                key={id}
                id={id}
                name={id}
                geojson={geojson}
                layer={layer}
                visible={visibleLayers[id]}
              />
            ))}
        </Map>
      </MapContainer>
    </Body>
  );
};

export default Home;

export interface IsochroneResponse {
  type: "FeatureCollection";
  bbox: [number, number, number, number];
  features: Array<{
    type: "Feature";
    properties: {
      group_index: number;
      value: number;
      center: [number, number];
      area: number;
    };
    geometry: {
      type: "Polygon";
      coordinates: number[][][];
    };
  }>;
  metadata: {
    attribution: string;
    service: string;
    timestamp: number;
    query: {
      profile: string;
      locations: [number, number][];
      range: number[];
      range_type: string;
      units: string;
      area_units: string;
      attributes: string[];
      smoothing: number;
    };
    engine: {
      version: string;
      build_date: string;
      graph_date: string;
    };
  };
}

export interface ReverseGeocodeResponse {

}
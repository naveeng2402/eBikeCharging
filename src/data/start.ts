import { GeoJSONSourceOptions } from "mapbox-gl";

export const start = [80.21497373624375, 13.019830175406248];

export const startGeojsonData: GeoJSONSourceOptions["data"] = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: start },
    },
  ],
};

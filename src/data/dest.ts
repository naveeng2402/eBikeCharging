import { GeoJSONSourceOptions } from "mapbox-gl";

export const dest = [80.21942134964253, 13.026468199670116];

export const destGeojsonData: GeoJSONSourceOptions["data"] = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: dest },
    },
  ],
};

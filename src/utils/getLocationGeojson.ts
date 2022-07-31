import { GeoJSONSourceOptions } from "mapbox-gl";

const getLocationGeojson = (loc: number[]): GeoJSONSourceOptions["data"] => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: { type: "Point", coordinates: loc },
      },
    ],
  };
};

export default getLocationGeojson;

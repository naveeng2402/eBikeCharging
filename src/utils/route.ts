import { GeoJSONSourceOptions } from "mapbox-gl";

const getRouteData = (route: number[][]): GeoJSONSourceOptions["data"] => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route,
    },
  };
};

export default getRouteData;

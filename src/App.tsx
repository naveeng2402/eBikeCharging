import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Map,
  Marker,
  Layer,
  Source,
  GeolocateControl,
  NavigationControl,
  MapRef,
  GeolocateControlRef,
  LngLat,
} from "react-map-gl";

import data from "./assets/data.json";
import Modal from "./components/Modal";
import { dest } from "./data/dest";
import getRouteData from "./utils/route";
import { start } from "./data/start";
import { MarkerShape } from "./types/markers";
import getRoute from "./utils/getRoute";
import getLocationGeojson from "./utils/getLocationGeojson";

const App = () => {
  const mapRef = useRef<MapRef>(null);
  const geoLocateControlRef = useRef<GeolocateControlRef>(null);

  const [markers, setMarkers] = useState<MarkerShape[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<MarkerShape>();
  const [startLocation, setStartLocation] = useState<LngLat>();
  const [destLocation, setDestLocation] = useState<LngLat>();
  const [route, setRoute] = useState<number[][]>([]);

  useEffect(() => {
    setMarkers(data);

    // TODO: Fetch the data from api
  }, []);

  useEffect(() => {
    const getRotutes = async () => {
      const routeRaw = await getRoute(start, dest);
      setRoute(routeRaw);
      console.log(route);
    };
    getRotutes();
  }, [start, dest]);

  const initialViewState = {
    latitude: 13.02073768459028,
    longitude: 80.21538956597244,
    width: "100vw",
    height: "100vh",
    zoom: 18,
  };

  return (
    <div className="h-screen">
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/naveeng2402/cl65xxp8n000915mgico9fy0u"
        mapboxAccessToken={import.meta.env.VITE_API_KEY}
        attributionControl={false}
        onLoad={() => {
          geoLocateControlRef.current?.trigger();
        }}
      >
        <NavigationControl position="bottom-right" visualizePitch={true} />
        <GeolocateControl
          ref={geoLocateControlRef}
          showUserHeading={true}
          showAccuracyCircle={true}
          position="bottom-right"
        />

        {markers.map((marker, i) => {
          return (
            <Marker
              key={i}
              latitude={marker.lat}
              longitude={marker.lon}
              onClick={(e) => {
                console.log(marker);
                setIsSelected(true);
                setSelectedData(marker);
              }}
            ></Marker>
          );
        })}

        <Source id="start" type="geojson" data={getLocationGeojson(start)}>
          <Layer
            id="start"
            type="symbol"
            layout={{
              "icon-image": "in-national-3",
              "icon-size": 1,
            }}
          ></Layer>
        </Source>
        <Source id="dest" type="geojson" data={getLocationGeojson(dest)}>
          <Layer
            id="dest"
            type="symbol"
            layout={{
              "icon-image": "in-national-3",
              "icon-size": 1,
            }}
          ></Layer>
        </Source>

        {route && (
          <Source
            id="route"
            type="geojson"
            data={getRouteData(route as number[][])}
          >
            <Layer
              id="route"
              type="line"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#006b00",
                "line-width": 5,
                "line-opacity": 0.5,
              }}
            ></Layer>
          </Source>
        )}
      </Map>

      <AnimatePresence>
        {isSelected && (
          <Modal
            isOpen={isSelected}
            setIsOpen={setIsSelected}
            data={selectedData as MarkerShape}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

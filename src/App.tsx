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
import getRoute from "./utils/getRoute";
import getLocationGeojson from "./utils/getLocationGeojson";
import getRouteData from "./utils/route";
import { MarkerShape } from "./types/markers";

function App() {
  const mapRef = useRef<MapRef>(null);
  const geoLocateControlRef = useRef<GeolocateControlRef>(null);

  const [markers, setMarkers] = useState<MarkerShape[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<MarkerShape>();
  const [startLocation, setStartLocation] = useState<number[]>([
    80.21514382454028, 13.019859686807509,
  ]);
  const [destLocation, setDestLocation] = useState<number[]>([]);
  const [route, setRoute] = useState<number[][]>([]);

  useEffect(() => {
    setMarkers(data);

    // TODO: Fetch the data from api
  }, []);

  useEffect(() => {
    const getRotutes = async () => {
      const routeRaw = await getRoute(startLocation, destLocation);
      setRoute(routeRaw);
      console.log(route);
    };
    getRotutes();
  }, [startLocation, destLocation]);

  const initialViewState = {
    latitude: 13.02073768459028,
    longitude: 80.21538956597244,
    zoom: 18,
  };

  return (
    <div className="h-screen overflow-hidden">
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

        {markers.map((marker, index) => (
          <Marker
            key={index}
            latitude={marker.lat}
            longitude={marker.lon}
            onClick={(e) => {
              // console.log(marker);
              setIsSelected(true);
              setSelectedData(marker);
            }}
          ></Marker>
        ))}

        <Source
          id="start"
          type="geojson"
          data={getLocationGeojson(startLocation)}
        >
          <Layer
            id="start"
            type="symbol"
            layout={{
              "icon-image": "in-national-3",
              "icon-size": 1,
            }}
          ></Layer>
        </Source>

        <Source
          id="dest"
          type="geojson"
          data={getLocationGeojson(destLocation)}
        >
          <Layer
            id="dest"
            type="symbol"
            layout={{
              "icon-image": "in-national-3",
              "icon-size": 1,
            }}
          ></Layer>
        </Source>

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
      </Map>

      <AnimatePresence>
        {isSelected && (
          <Modal
            isOpen={isSelected}
            setIsOpen={setIsSelected}
            data={selectedData as MarkerShape}
            setDestLocation={setDestLocation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

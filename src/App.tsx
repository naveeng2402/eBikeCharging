import { AnimatePresence, motion } from "framer-motion";
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
} from "react-map-gl";

import data from "./assets/data.json";
import Modal from "./components/Modal";
import getRoute from "./utils/getRoute";
import getLocationGeojson from "./utils/getLocationGeojson";
import getRouteData from "./utils/route";
import { MarkerShape } from "./types/markers";
import { destDescShape } from "./types/destDesc";
import { exitNavigationAnim } from "./animation/exitNavigation";
import { destDescAnim } from "./animation/destDesc";

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
  const [destDesc, setDestDesc] = useState<destDescShape>();
  const [route, setRoute] = useState<number[][]>([]);

  useEffect(() => {
    setMarkers(data);

    // TODO: Fetch the data from api
  }, []);

  useEffect(() => {
    const getRotutes = async () => {
      const routeRaw = await getRoute(startLocation, destLocation);
      setRoute(routeRaw[0]);
      setDestDesc((prev) => {
        return { place: prev?.place as string, distance: routeRaw[1] };
      });
      console.log(route);
    };
    destLocation.length > 0 && getRotutes();
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
        <NavigationControl position="top-right" visualizePitch={true} />
        <GeolocateControl
          ref={geoLocateControlRef}
          showUserHeading={true}
          showAccuracyCircle={true}
          position="top-right"
          onGeolocate={(e) => {
            setStartLocation([e.coords.longitude, e.coords.latitude]);
          }}
        />

        {route.length === 0 &&
          markers.map((marker, index) => (
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

        <AnimatePresence>
          {route.length > 0 && (
            <>
              <Source
                id="start"
                type="geojson"
                data={getLocationGeojson(startLocation)}
              >
                <Layer
                  id="start"
                  type="symbol"
                  layout={{
                    "icon-image": "dot-10",
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
                    "icon-image": "charging-station",
                    "icon-size": 2,
                    "icon-allow-overlap": true,
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

              <motion.div
                variants={exitNavigationAnim}
                initial="hidden"
                exit="hidden"
                animate="visible"
                className="absolute bottom-0 left-0 right-0 mb-4 flex items-center justify-center"
              >
                <button
                  className="rounded-md bg-red-500 px-10 py-2 text-xl text-white transition-all duration-100 hover:bg-red-600 "
                  onClick={() => {
                    setDestLocation([]);
                    setRoute([]);
                    setDestDesc(undefined);
                  }}
                >
                  Exit Navigation
                </button>
              </motion.div>

              <motion.div
                variants={destDescAnim}
                initial="hidden"
                exit="hidden"
                animate="visible"
                className="absolute top-0 left-0 mx-4 my-2 rounded-sm border-2 border-gray-800 bg-gray-600/80 px-4 py-2 text-white"
              >
                <p className="text-base">{destDesc?.place}</p>
                <p className="text-base">{destDesc?.distance}</p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Map>

      <AnimatePresence>
        {isSelected && (
          <Modal
            isOpen={isSelected}
            setIsOpen={setIsSelected}
            data={selectedData as MarkerShape}
            setDestLocation={setDestLocation}
            setDestDesc={setDestDesc}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

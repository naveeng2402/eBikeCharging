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
import { MarkerShape } from "./types/markers";

function App() {
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
}

export default App;

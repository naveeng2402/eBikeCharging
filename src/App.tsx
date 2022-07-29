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
} from "react-map-gl";

import data from "./assets/data.json";
import Modal from "./components/Modal";
import { MarkerShape } from "./types/markers";

const App = () => {
  const mapRef = useRef<MapRef>(null);
  const geoLocateControlRef = useRef<GeolocateControlRef>(null);

  const [markers, setMarkers] = useState<MarkerShape[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<MarkerShape>();

  useEffect(() => {
    setMarkers(data);

    // TODO: Fetch the data from api
  }, []);

  const initialViewState = {
    latitude: 13.084547176887455,
    longitude: 79.95072330224205,
    width: "100vw",
    height: "100vh",
    zoom: 10,
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
          console.log(geoLocateControlRef.current?.trigger());
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

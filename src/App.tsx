import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import WorldMap from "./components/WorldMap";

const App = () => {
  return <WorldMap volcanoList={[]} />;
};

export default App;

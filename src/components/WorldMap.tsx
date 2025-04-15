import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Volcano } from "../types";

interface WorldMapProps {
  volcanoList: Volcano[];
}

const WorldMap: FC<WorldMapProps> = ({ volcanoList }) => {
  const position: [number, number] = [20, 0];

  return (
    <MapContainer
      center={position}
      zoom={3}
      scrollWheelZoom={true}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {volcanoList.map((volcano) => (
        <Marker
          key={volcano.id ?? volcano.name}
          position={[
            parseFloat(volcano.latitude),
            parseFloat(volcano.longitude),
          ]}
        >
          <Popup>
            <strong>{volcano.name}</strong>
            <br />
            Altitude : {volcano.elevation ?? "Inconnue"} m<br />
            Type : {volcano.type ?? "Non précisé"}
            <br />
            Pays : {volcano.country ?? "Non précisé"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default WorldMap;

import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Volcano } from "../types";

interface WorldMapProps {
  volcanoList: Volcano[];
}

const WorldMap: FC<WorldMapProps> = ({ volcanoList }) => {
  const position: [number, number] = [20, 0];

  const getCoord = (val: any) => {
    if (typeof val === "number") return val;
    if (typeof val === "string") return parseFloat(val.replace(",", "."));
    return null;
  };

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
      {volcanoList.map((volcano) => {
        const lat = getCoord(volcano.latitude);
        const lng = getCoord(volcano.longitude);

        if (lat === null || lng === null) {
          console.warn("Coordonnées invalides pour le volcan :", volcano);
          return null;
        }

        return (
          <Marker key={volcano.id ?? volcano.name} position={[lat, lng]}>
            <Popup>
              <strong>{volcano.name}</strong>
              <br />
              Altitude : {volcano.elevation ?? "Inconnue"} m<br />
              Type : {volcano.type ?? "Non précisé"}
              <br />
              Pays : {volcano.country ?? "Non précisé"}
              <br />
              Dernière éruption : {volcano.lastEruption ?? "Non précisé"}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
export default WorldMap;

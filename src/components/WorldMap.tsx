import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const WorldMap = () => {
  const position = [51.505, -0.09];
  return (
    <MapContainer
      center={position}
      zoom={5}
      scrollWheelZoom={true}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default WorldMap;

import { FC, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { TectonicPoint, Volcano } from "../types";
import Papa from "papaparse";

interface WorldMapProps {
  volcanoList: Volcano[];
  showTectonicPoints: boolean;
}

const WorldMap: FC<WorldMapProps> = ({ volcanoList, showTectonicPoints }) => {
  const position: [number, number] = [20, 0];
  const [plateBoundaries, setPlateBoundaries] = useState<
    Record<string, [number, number][]>
  >({});

  const getCoord = (val: any): number | null => {
    if (typeof val === "number") return val;
    if (typeof val === "string") return parseFloat(val.replace(",", "."));
    return null;
  };

  const getColorFromPlate = (plate: string): string => {
    let hash = 0;
    for (let i = 0; i < plate.length; i++) {
      hash = plate.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).padStart(6, "0");
    return `#${c}`;
  };

  useEffect(() => {
    fetch("/data/all.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse<TectonicPoint>(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });

        const grouped: Record<string, [number, number][]> = {};
        parsed.data.forEach((row) => {
          const { plate, lat, lon } = row;

          // Sécurité coordonnées
          if (
            typeof lat !== "number" ||
            typeof lon !== "number" ||
            isNaN(lat) ||
            isNaN(lon) ||
            lat < -90 ||
            lat > 90 ||
            lon < -180 ||
            lon > 180
          ) {
            console.warn(
              `Coordonnées invalides détectées pour la plaque ${plate}: lat=${lat}, lon=${lon}`
            );
            return;
          }

          if (!grouped[plate]) grouped[plate] = [];
          grouped[plate].push([lat, lon]);
        });

        // Fermer les polygones si non fermés
        Object.keys(grouped).forEach((plate) => {
          const coords = grouped[plate];
          const first = coords[0];
          const last = coords[coords.length - 1];
          if (first[0] !== last[0] || first[1] !== last[1]) {
            coords.push(first);
          }
        });

        setPlateBoundaries(grouped);
      });
  }, []);

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

      {/* Volcans */}
      {volcanoList.map((volcano) => {
        const lat = getCoord(volcano.latitude);
        const lng = getCoord(volcano.longitude);
        if (lat === null || lng === null) return null;

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

      {/* Plaques tectoniques */}
      {showTectonicPoints &&
        Object.entries(plateBoundaries).map(([plate, points]) => {
          if (!points || points.length < 3) return null;
          const color = getColorFromPlate(plate);

          return (
            <Polygon
              key={plate}
              positions={points}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.25,
                weight: 1,
              }}
            >
              <Tooltip sticky>{`Plaque ${plate.toUpperCase()}`}</Tooltip>
            </Polygon>
          );
        })}
    </MapContainer>
  );
};

export default WorldMap;

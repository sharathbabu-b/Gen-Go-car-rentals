import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function CarMap({ center = [20.5937, 78.9629], cars = [] }) {
  return (
    <MapContainer center={center} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {Array.isArray(cars) && cars.map((car) => (
        car?.location?.coordinates && (
          <Marker
            key={car._id}
            position={[car.location.coordinates[1], car.location.coordinates[0]]}
          >
            <Popup>
              <b>{car.carName}</b><br />
              ₹{car.price_Per_Day}/day
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}

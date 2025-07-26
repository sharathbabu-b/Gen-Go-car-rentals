import React from "react";
import { useEffect,useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import socket from "../sockets/socket";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});
const LiveCarMap=({initialCars=[]})=>{
   const geoapifyKey = import.meta.env.REACT_APP_GEOAPIFY_API_KEY;
  const [carLocations,setCarLocations]=useState(()=>{
    const initial={}
    initialCars.forEach((car)=>{
      if(car?.location?.coordinates){
        initial[car._id]={
          carId:car._id,
          name: car.carName,
          lat: car.location.coordinates[1],
          lon: car.location.coordinates[0],
          timestamp: Date.now(),
        }
      }
    })
    return initial
  })
  useEffect(()=>{
    socket.on("carLocationUpdated",(data)=>{
      setCarLocations(prev=>({
        ...prev,[data.carId]:data,
      }))
    })
    return ()=>socket.off("carLocationUpdated")
  },[])
  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Live Car Tracker</h2>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${geoapifyKey}`}
          attribution='&copy; OpenStreetMap contributors, © Geoapify'
        />
        {Object.values(carLocations).map((car) => (
          <Marker key={car.carId} position={[car.lat, car.lon]}>
            <Popup>
              <strong>{car.name}</strong><br />
              Last updated: {new Date(car.timestamp).toLocaleTimeString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
export default LiveCarMap;

// export default function CarMap({ center = [20.5937, 78.9629], cars = [] }) {
//   return (
//     <MapContainer center={center} zoom={5} style={{ height: "500px", width: "100%" }}>
//       <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {Array.isArray(cars) && cars.map((car) => (
//         car?.location?.coordinates && (
//           <Marker
//             key={car._id}
//             position={[car.location.coordinates[1], car.location.coordinates[0]]}
//           >
//             <Popup>
//               <b>{car.carName}</b><br />
//               ₹{car.price_Per_Day}/day
//             </Popup>
//           </Marker>
//         )
//       ))}
//     </MapContainer>
//   );
// }

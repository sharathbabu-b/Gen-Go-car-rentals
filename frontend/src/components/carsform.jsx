import { useState } from "react";

export default function Carsform() {
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [seats, setSeats] = useState("");
  const [price_Per_Hour, setPricePerHour] = useState("");
  const [price_Per_Day, setPricePerDay] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");
  const [gpsTrack, setGpsTrack] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      carName,
      brand,
      model,
      year: parseInt(year),
      fuel_type,
      transmission,
      seats: parseInt(seats),
      price_Per_Hour: parseFloat(price_Per_Hour),
      price_Per_Day: parseFloat(price_Per_Day),
      location,
      images,
      gpsTrack: Boolean(gpsTrack),
    };

    console.log("Submitting car data:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add a Car</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          className="border p-2 rounded-md"
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          className="border p-2 rounded-md"
          value={fuel_type}
          onChange={(e) => setFuelType(e.target.value)}
        >
          <option value="">Select Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="EV">EV</option>
        </select>
        <select
          className="border p-2 rounded-md"
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="">Select Transmission</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Price Per Hour"
          value={price_Per_Hour}
          onChange={(e) => setPricePerHour(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Price Per Day"
          value={price_Per_Day}
          onChange={(e) => setPricePerDay(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          placeholder="Location (lat,lng)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          placeholder="Image URL"
          value={images}
          onChange={(e) => setImages(e.target.value)}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={gpsTrack}
            onChange={(e) => setGpsTrack(e.target.checked)}
          />
          Enable GPS Tracking
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

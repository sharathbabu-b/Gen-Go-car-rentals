import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../slices/carslices"; // Adjust path if needed

const CarList = () => {
  const dispatch = useDispatch();
  const { carsData, loading, serverErr } = useSelector((state) => state.cars);

  // Local UI states for filtering/sorting
  const [fuelFilter, setFuelFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading cars...</div>;
  if (serverErr) return <div className="text-red-500 p-4">Error: {serverErr}</div>;

  // Filter cars by fuel type
  const filteredCars = fuelFilter === "all"
    ? carsData
    : carsData.filter(car => car.fuel_type === fuelFilter);

  // Sort cars by price per day
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOrder === "asc") return a.pricePerDay - b.pricePerDay;
    if (sortOrder === "desc") return b.pricePerDay - a.pricePerDay;
    return 0;
  });

  return (
    <div className="p-4">
      {/* FILTER + SORT UI */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Fuel Type:</label>
          <select
            className="border p-1 rounded"
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Sort by Price:</label>
          <select
            className="border p-1 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <button
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          onClick={() => {
            setFuelFilter("all");
            setSortOrder("none");
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* CARS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedCars.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          sortedCars.map((car) => (
            <div
              key={car._id}
              className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={car.images?.[0] || "/placeholder-car.jpg"}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">
                {car.brand} - {car.model}
              </h2>
              <p className="text-sm text-gray-600">
                ₹{car.price_Per_hour} / day
              </p>
              <p className="text-sm text-gray-600">
                ₹{car.price_Per_Day} / hour
              </p>
              <p className="text-sm text-gray-500">{car.carName}</p>
              <p className="text-xs text-gray-400">
                Seats: {car.seats} | {car.transmission}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                Fuel: {car.fuel_type}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarList;

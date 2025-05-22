import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../slices/carslices";

export default function Home() {
  const dispatch = useDispatch();
  const { carsData, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {carsData.map((car) => (
          <div key={car._id} className="bg-white p-4 shadow-md rounded-xl">
            <img
              src={car.imageUrls?.[0]}
              alt={car.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{car.name}</h2>
            <p className="text-gray-600">₹{car.pricePerDay}/day</p>
            {/* <p className="text-sm text-gray-500">{car.location}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
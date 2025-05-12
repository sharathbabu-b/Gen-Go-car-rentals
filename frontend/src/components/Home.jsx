import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cars = [
  {
    id: 1,
    name: "Toyota Corolla",
    price: "$40/day",
    image: "/images/corolla.jpg",
  },
  {
    id: 2,
    name: "Tesla Model 3",
    price: "$100/day",
    image: "/images/tesla.jpg",
  },
  {
    id: 3,
    name: "BMW X5",
    price: "$80/day",
    image: "/images/bmw.jpg",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");

  const handleCarClick = (carId) => {
    navigate(`/cars/${carId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Optionally filter cars or redirect to search result page
    console.log("Searching from:", startPoint, "to:", destination);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Welcome to GEN-GO Car Rentals
      </header>

      {/* Search Fields */}
      <section className="bg-white py-6 px-4 md:px-10 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 items-center justify-center"
        >
          <input
            type="text"
            placeholder="Start Point"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            className="p-2 w-full md:w-64 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-2 w-full md:w-64 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </section>

      {/* Body - Featured Cars */}
      <main className="flex-grow p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Featured Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => handleCarClick(car.id)}
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{car.name}</h3>
                <p className="text-gray-600">{car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4 mt-6">
        © {new Date().getFullYear()} GEN-GO. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

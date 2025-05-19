import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars?limit=4'); // adjust the URL if needed
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to GEN-GO Car Rentals</h1>

      <h2 className="text-2xl font-semibold mb-4">Featured Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-white rounded-xl shadow p-4">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-medium">{car.name}</h3>
            <p className="text-gray-600">₹{car.pricePerDay} / day</p>
            <Link
              to={`/cars/${car._id}`}
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/cars"
          className="bg-green-600 text-white px-6 py-3 rounded text-lg hover:bg-green-700"
        >
          Browse All Cars
        </Link>
      </div>
    </div>
  );
};

export default Home;

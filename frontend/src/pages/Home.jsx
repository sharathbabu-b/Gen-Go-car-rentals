import GenGoBanner from "../pages/homeBanner"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCars } from "../slices/carslices";

export default function Home() {
  const [pickup_location, setPickup_location] = useState("");
  const [dropoff_location, setDropoff_location] = useState("");
  const [start_Date, setStart_date] = useState("");
  const [end_Date, setEnd_Date] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { carsData, loading, error } = useSelector((state) => state.cars);

  const [filteredCars, setFilteredCars] = useState([]);

  // Example city options
  const cities = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad", "Chennai", "Kolkata", "Pune"];

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  useEffect(() => {
    filterCars();
  }, [carsData, pickup_location, dropoff_location, search]);

  const filterCars = () => {
    let filtered = carsData;

    if (pickup_location) {
      filtered = filtered.filter((car) =>
        car.pickup_location?.toLowerCase().includes(pickup_location.toLowerCase())
      );
    }

    if (dropoff_location) {
      filtered = filtered.filter((car) =>
        car.dropoff_location?.toLowerCase().includes(dropoff_location.toLowerCase())
      );
    }

    if (search) {
      filtered = filtered.filter((car) =>
        car.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  };

  if (loading) return <p className="text-center">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <GenGoBanner />

      <h1 className="text-3xl font-bold mb-6 text-center">Explore Cars</h1>

      {/* Filter Section */}
     

      {/* Car Listings */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(filteredCars.length > 0 ? filteredCars : carsData).map((car) => (
          <div key={car._id} className="bg-white p-4 shadow-md rounded-xl">
            <img
              src={car.imageUrls?.[0]}
              alt={car.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{car.name}</h2>
            <p className="text-gray-600">₹{car.pricePerDay}/day</p>
            <p className="text-sm text-gray-500">{car.pickup_location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

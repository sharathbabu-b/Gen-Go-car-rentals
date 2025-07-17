import GenGoBanner from "../pages/homeBanner";
import HomeSummary from "./homesummary";
import CarSummary from "./carsummary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { fetchAllCars } from "../slices/carslices";

export default function Home() {
  const navigate = useNavigate();
  const [pickup_location, setPickup_location] = useState("");
  const [dropoff_location, setDropoff_location] = useState("");
  const [start_Date, setStart_date] = useState("");
  const [end_Date, setEnd_Date] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { carsData, loading, error } = useSelector((state) => state.cars);

  const [filteredCars, setFilteredCars] = useState([]);

  const cities = ["Bengaluru", "Hyderabad", "Mumbai", "Chennai"];

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

      <h1 className="text-3xl font-bold m-6 text-center">Explore Cars</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {carsData?.map((car) => (
          <div
            key={car._id}
            className="bg-white p-4 shadow-md rounded-xl cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <img
              src={car?.images}
              alt={car.carName}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold text-blue-500 mt-2">{car.carName}</h2>
            <p className="text-gray-600">₹{car.price_Per_Day}/day</p>
            <p className="text-gray-600 font-bold">₹{car.price_Per_Hour}/hour</p>

            {/* Car Rating */}
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 mr-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 inline-block ${
                      i < Math.round(car.rating) ? "fill-current" : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.068 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </span>
              <span className="text-gray-700 font-semibold">
                {car.rating !== undefined ? car.rating.toFixed(1) : "No rating"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <CarSummary />
      <HomeSummary />
    </div>
  );
}

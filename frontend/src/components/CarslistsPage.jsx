import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllCars, assignEditId, deleteCars } from "../slices/carslices";
import CarMap from "./CarMapPage";

export default function CarLists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { carsData } = useSelector((state) => state.cars);

  const [filtered, setFiltered] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  useEffect(() => {
    setFiltered(carsData);
  }, [carsData]);

  useEffect(() => {
    let sorted = [...carsData];
    if (sortBy === "price") sorted.sort((a, b) => a.price_Per_Day - b.price_Per_Day);
    if (sortBy === "rating") sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setFiltered(sorted);
  }, [sortBy, carsData]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Cars</h2>

      <div className="flex gap-4 mb-6 justify-center">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="p-2 border rounded">
          <option value="">Sort By</option>
          <option value="price">Price: Low to High</option>
          <option value="rating">Rating: High to Low</option>
        </select>
        <button
          onClick={() => setSortBy("")}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((car) => (
          <div key={car._id} className="bg-white shadow-md rounded-2xl overflow-hidden">
            <img
              src={car.images || "https://tse3.mm.bing.net/th?id=OIP.cjUjzALkEKobv8G4Evr6GQHaEK&pid=Api&P=0&h=180"}
              alt={car.carName}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{car.carName}</h3>
              <p className="text-gray-600">{car.brand} - {car.model} ({car.year})</p>
              <p className="text-sm mt-1">
                {car.fuel_type} • {car.transmission} • {car.seats} seats
              </p>
              <p className="mt-2 text-lg font-medium text-green-700">
                ₹{car.price_Per_Hour}/hr | ₹{car.price_Per_Day}/day
              </p>
              <p className="text-yellow-600">Rating: {car.rating || "N/A"} ⭐</p>

              <div className="mt-3">
                {userData?.role === "user" && (
                  <button
                    onClick={() => navigate(`/carbooking/${car._id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                )}

                {userData?.role === "provider" && (
                  <>
                    <button
                      onClick={() => {
                        dispatch(assignEditId(car._id));
                        navigate("/Carform");
                      }}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm("Are you sure?");
                        if (confirmDelete) {
                          dispatch(deleteCars(car._id));
                        }
                      }}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Geoapify map view */}
      <div className="mt-10">
        <CarMap carLocations={filtered} />
      </div>
    </div>
  );
}

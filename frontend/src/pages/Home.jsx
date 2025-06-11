import GenGoBanner from "../pages/homeBanner"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { fetchAllCars } from "../slices/carslices";

export default function Home() {
  const navigate=useNavigate()
  const [pickup_location, setPickup_location] = useState("");
  const [dropoff_location, setDropoff_location] = useState("");
  const [start_Date, setStart_date] = useState("");
  const [end_Date, setEnd_Date] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { carsData, loading, error } = useSelector((state) => state.cars);

  const [filteredCars, setFilteredCars] = useState([]);


  const cities = ["Bengaluru","Hyderabad", "Mumbai","Chennai"];

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
        { carsData?.map((car) => (
          <div key={car._id} className="bg-white p-4 shadow-md rounded-xl"
           onClick={() => navigate("/login")}>
            <img
              src={car?.images}
              alt={car.carName}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold text-blue-500 mt-2">{car.carName}</h2>
            <p className="text-gray-600">₹{car.price_Per_Day}/day</p>
             <p className="text-gray-600">₹{car.price_Per_hour}/hour</p>
            
            {/* <p className="text-sm text-gray-500">{car.pickup_location}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBooking } from "../../slices/bookingSlices";


export default function BookingForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { carsData } = useSelector((state) => state.cars);
  const { userData } = useSelector((state) => state.user);

  const [pickup_Location, setPickup_location] = useState("");
  const [dropoff_Location, setDropoff_location] = useState("");
  const [start_Date, setStart_date] = useState("");
  const [end_Date, setEnd_Date] = useState("");
  const [rentalType, setRentalType] = useState("daily");
  const [file,setFile]=useState("")

  const [carDetails, setCarDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const foundCar = carsData?.find((ele) => ele._id === id);
    if (foundCar) setCarDetails(foundCar);
  }, [carsData, id]);

  
  useEffect(() => {
    if (carDetails && start_Date && end_Date) {
      const start = new Date(start_Date);
      const end = new Date(end_Date);
      if (end <= start) {
        setTotalPrice(0);
        return;
      }

      const hours = Math.ceil((end - start) / (1000 * 60 * 60));
      const days = Math.ceil(hours / 24);

      const price =
        rentalType === "hourly"
          ? hours * carDetails.price_Per_Hour
          : days * carDetails.price_Per_Day;

      setTotalPrice(price);
    }
  }, [start_Date, end_Date, rentalType, carDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData || !userData._id) {
      alert("User not logged in.");
      return;
    }

    const bookingObj = {
      car: carDetails.carName,
      carId: id,
      pickup_Location,
     dropoff_Location,
      startDate: start_Date,
      endDate: end_Date,
      user: userData._id,
      rentalType,
      totalPrice,
    };

    try {
      const createbooking=await dispatch(createBooking(bookingObj)).unwrap();
      alert("Booking successful!");
      console.log(createbooking)
      navigate(`/payments/${createbooking._id}`);
    }catch(err) {
      console.log(err)
      alert("Booking failed. Please try again.");
    }
  };

  if (!carDetails) return <div className="text-center py-10">Loading car details...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Book Your Car</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car</label>
            <input
              type="text"
              value={carDetails.carName}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <input
              type="text"
              value={pickup_Location}
              onChange={(e) => setPickup_location(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Pickup Location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dropoff Location</label>
            <input
              type="text"
              value={dropoff_Location}
              onChange={(e) => setDropoff_location(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Dropoff Location"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="datetime-local"
                value={start_Date}
                onChange={(e) => setStart_date(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="datetime-local"
                value={end_Date}
                onChange={(e) => setEnd_Date(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rental Type</label>
            <select
              value={rentalType}
              onChange={(e) => setRentalType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="daily">Per Day - ₹{carDetails.pricePerDay}</option>
              <option value="hourly">Per Hour - ₹{carDetails.pricePerHour}</option>
            </select>
          </div>

          <div className="text-lg font-semibold text-gray-800">
            Total Price: ₹{totalPrice}
          </div>
          <div>
            <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document (License/ID)</label>
  <input
    type="file"
    accept=".jpg,.jpeg,.png,.pdf"
    onChange={(e) => setFile(e.target.files[0])}
    className="w-full p-2 border border-gray-300 rounded"
  />
</div>

          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
           
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GenGoBanner() {
  const [pickupCity, setPickupCity] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [pickupAnywhere, setPickupAnywhere] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    "https://media.istockphoto.com/id/467103541/photo/car-rental-sign.webp?a=1&b=1",
    "https://images.unsplash.com/photo-1565043762739-73ca9d0e0c77?w=600",
    "https://plus.unsplash.com/premium_photo-1661288445210-380b59081236?w=600",
  ];

  const cities = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad", "Chennai", "Kolkata", "Pune"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupCity || !startDateTime || !endDateTime) {
      alert("Please select pickup city and date/time.");
      return;
    }

    try {
      await axios.get("/available", {
        params: {
          city: pickupCity,
          start: startDateTime.toISOString(),
          end: endDateTime.toISOString(),
          flexiblePickup: pickupAnywhere,
        },
      });

      navigate(
        `/carlist?city=${encodeURIComponent(pickupCity)}&start=${startDateTime.toISOString()}&end=${endDateTime.toISOString()}&pickupAnywhere=${pickupAnywhere}`
      );
    } catch (error) {
      console.error("Search failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-yellow-400 text-black py-10 px-6 rounded-b-2xl shadow-xl overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-10">
        
        {/* LEFT: Form */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold uppercase">
            <span className="text-white">Drive</span> <span className="text-black">Anytime</span>{" "}
            <span className="underline decoration-dotted text-white">Anywhere</span>
          </h1>
          <p className="text-lg text-white font-medium">
            No commitment, unlimited options and hassle-free booking. Your road to adventure's just a{" "}
            <span className="font-bold text-green-700">GEN-GO</span> away!
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 bg-white text-black p-4 rounded-xl shadow-lg">
            <label className="block text-sm font-medium mb-1">
              Select your pickup city
            </label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
            >
              <option value="">-- Choose City --</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                <DatePicker
                  selected={startDateTime}
                  onChange={(date) => setStartDateTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="Select start datetime"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">End Date & Time</label>
                <DatePicker
                  selected={endDateTime}
                  onChange={(date) => setEndDateTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="Select end datetime"
                  minDate={startDateTime}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={pickupAnywhere}
                onChange={() => setPickupAnywhere(!pickupAnywhere)}
                className="mr-2"
              />
              <label className="text-sm">Delivery & Pickup from anywhere</label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-2 rounded hover:bg-green-800"
            >
              SEARCH
            </button>
          </form>
        </div>

        {/* RIGHT: Carousel */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative">
          <div className="w-full max-w-md overflow-hidden rounded-xl shadow-lg relative">
            <img
              src={images[currentIndex]}
              alt="Car Slide"
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="absolute bottom-4 flex gap-2 justify-center w-full">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-500"}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

export default function GenGoBanner() {
  const [pickupCity, setPickupCity] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const cities = [
    "Bengaluru",
    "Delhi",
    "Mumbai",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
  ];

  const images = [
    "https://media.istockphoto.com/id/467103541/photo/car-rental-sign.webp?a=1&b=1&s=612x612&w=0&k=20&c=eYs8kI__KMhef5Radnnl_TeSPsu2wihQ_c0haSGnBJU=",
    "https://images.unsplash.com/photo-1565043762739-73ca9d0e0c77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhciUyMHJlbnRhbHxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661288445210-380b59081236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhciUyMHJlbnRhbHxlbnwwfHwwfHx8MA%3D%3D"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="bg-yellow-400 text-black py-10 px-6 rounded-b-2xl shadow-xl overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-10">
        
        {/* LEFT SECTION: Text and Form */}
        <div className="w-full lg:w-2/1 space-y-6">
          <h1 className="text-4xl font-bold uppercase">
            <span className="text-white ">Drive</span>{" "}
            <span className="text-black">Anytime</span>{" "}
            <span className="underline decoration-dotted decoration-2 underline-offset-4 text-white">
              Anywhere
            </span>
          </h1>

          <p className="text-lg font-medium text-white">
            No commitment, unlimited options and hassle-free booking. Your road
            to adventure's just a{" "}
            <span className="font-bold text-green-700">GEN-GO</span> away!
          </p>

          <form className="space-y-3 bg-white text-black p-4 rounded-xl shadow-lg">
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
            >
              <option value="">Select your pickup city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <input
                type="datetime-local"
                className="w-1/2 border border-gray-300 p-2 rounded"
              />
              <input
                type="datetime-local"
                className="w-1/2 border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm">Delivery & Pickup from anywhere</label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-2 rounded hover:bg-green-800 transition"
            >
              SEARCH
            </button>
          </form>
        </div>

        {/* RIGHT SECTION: Simple Carousel */}
        <div className="w-full lg:w-2/3 flex justify-center items-center relative">
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
                className={`h-2 w-2 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

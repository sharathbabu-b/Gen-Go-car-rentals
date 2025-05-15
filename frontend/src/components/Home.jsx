import React from 'react';
import { MapPin, Search, CarFront, Calendar, User2 } from 'lucide-react';

const CarRentalHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Banner */}
      <section className="bg-cover bg-center h-[80vh] flex items-center justify-center bg-[url('/banner-gengo.jpg')]">
        <div className="bg-black bg-opacity-60 p-10 rounded-xl text-white text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GEN-GO Car Rentals</h1>
          <p className="text-lg">Your ride, your rules – Drive smart with GEN-GO.</p>
        </div>
      </section>

      {/* Search Form */}
      <section className="px-4 md:px-10 py-8 bg-white shadow-lg -mt-20 relative z-10 rounded-xl max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <MapPin className="mr-2" />
            <input type="text" placeholder="Pickup Location" className="bg-transparent outline-none w-full" />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Calendar className="mr-2" />
            <input type="date" className="bg-transparent outline-none w-full" />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Calendar className="mr-2" />
            <input type="date" className="bg-transparent outline-none w-full" />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <User2 className="mr-2" />
            <input type="number" placeholder="Passengers" className="bg-transparent outline-none w-full" />
          </div>
          <button className="bg-[#1e40af] text-white rounded-lg px-4 py-2 flex items-center justify-center hover:bg-[#1c3fa0]">
            <Search className="mr-2" /> Search
          </button>
        </div>
      </section>

      {/* Available Cars Section */}
      <section className="py-12 px-6 md:px-10 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Popular Cars on GEN-GO</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['Swift', 'Creta', 'Innova'].map((car, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={`/cars/${car.toLowerCase()}.jpg`}
                alt={car}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{car}</h3>
                <p className="text-sm text-gray-600">Manual | Petrol | 5 Seater</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="font-bold text-[#1e40af]">₹450/day</span>
                  <button className="bg-[#1e40af] text-white text-sm px-3 py-1 rounded hover:bg-[#1c3fa0]">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CarRentalHome;

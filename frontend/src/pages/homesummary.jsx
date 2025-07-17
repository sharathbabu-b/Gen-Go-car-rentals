export default function HomeSummary() {
  return (
    <div className="bg-white py-12 px-6 text-gray-800">
      <div className="container mx-auto text-center space-y-10">
        <h2 className="text-3xl font-bold text-yellow-500">Why Choose GEN-GO?</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* 1: Flexible Rentals */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Flexible Rentals</h3>
            <p>Rent for a few hours, days, or weeks. GEN-GO offers complete freedom with no long-term commitments.</p>
          </div>

          {/* 2: Nationwide Availability */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Available Across Cities</h3>
            <p>Our services are live in Bengaluru, Delhi, Mumbai, Hyderabad, and expanding rapidly.</p>
          </div>

          {/* 3: Premium Cars, Affordable Rates */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Affordable Luxury</h3>
            <p>From hatchbacks to premium sedans & SUVs, choose from a wide range of well-maintained vehicles.</p>
          </div>
        </div>

        <div className="mt-8">
          <a href="/login" className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition">
            Book Your Ride Now
          </a>
        </div>
      </div>
    </div>
  );
}

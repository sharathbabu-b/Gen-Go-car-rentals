export default function About(){
    return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        About GEN-GO Car Rentals
      </h1>

      <section className="mb-10">
        <p className="text-lg text-gray-700 leading-relaxed">
          GEN-GO is your modern solution for quick, convenient, and reliable car rentals. Whether you're a traveler, business professional, or a local resident in need of a ride, GEN-GO makes it effortless to search, compare, and book vehicles – all in one place.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Our Mission</h2>
        <p className="text-gray-700 text-base leading-relaxed">
          Our mission is to revolutionize urban mobility by providing a seamless car rental experience through technology and transparency. We aim to empower users and local car owners by offering a platform that facilitates fair, fast, and flexible vehicle access.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">What We Offer</h2>
        <ul className="list-disc pl-6 text-gray-700 text-base space-y-2">
          <li>Wide selection of vehicles – from economy to luxury</li>
          <li>Real-time availability and booking confirmation</li>
          <li>Secure online payments via Razorpay</li>
          <li>Subscription options for frequent renters</li>
          <li>Car owner rental integration – earn by listing your car</li>
          <li>Admin-monitored car approval and location tracking</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Why Choose GEN-GO?</h2>
        <p className="text-gray-700 text-base leading-relaxed">
          With GEN-GO, you're not just renting a car – you're experiencing next-level convenience. From easy onboarding to real-time vehicle tracking and reviews, we ensure a smooth ride at every step. Our team is committed to constant innovation, ensuring the best possible service for both renters and providers.
        </p>
      </section>

      <section className="text-center mt-16">
        <p className="text-lg text-gray-600">Have questions? <a href="/contact" className="text-blue-600 underline">Contact us</a> – we're here to help.</p>
      </section>
    </div>
  );
}
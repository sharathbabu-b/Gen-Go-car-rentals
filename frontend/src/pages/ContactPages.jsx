export default function ContactUs() {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We're here to help! Reach out to us with your questions, feedback, or booking inquiries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">GenGo Car Rentals</h3>
            <p className="text-gray-600 mb-2">
              📍 123  Gandhibazzar, Basvanagudi,Bengaluru,  India
            </p>
            <p className="text-gray-600 mb-2">
              📞 +91 8367002388
            </p>
            <p className="text-gray-600 mb-2">
              ✉️ support@gengo.in
            </p>
            <p className="text-gray-600 mt-4">
              🕒 Open: Mon - Sun | 8:00 AM - 8:00 PM
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

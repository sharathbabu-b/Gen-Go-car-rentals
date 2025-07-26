import { motion } from "framer-motion";

const featuredCars = [
  {
    name: "Hyundai Creta",
    image:
      "https://img-ik.cars.co.za/images/2016/10/HyundaiCretaFD/tr:n-news_1200x/creta04.jpg",
    specs: [
      "Top Speed: 180 km/h",
      "Engine: 1497 cc Turbo",
      "Features: Climate Control, Touchscreen",
      "Available in: Hyderabad, Delhi, Mumbai",
    ],
  },
  {
    name: "Mahindra Scorpio",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.b2N1M8HZLa-JLN484URMDAHaE8&pid=Api&P=0&h=180",
    specs: [
      "Top Speed: 170 km/h",
      "Engine: 2198 cc Diesel",
      "Features: 4x4, Tow Hook",
      "Available in: Bengaluru, Hyderabad",
    ],
  },
  {
    name: "Kia Seltos",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.sc-fMMZg9HlqMKkVXBTXRgHaEK&pid=Api&P=0&h=180",
    specs: [
      "Top Speed: 200 km/h",
      "Engine: 1591 cc Turbo",
      "Features: AR Dashboard, Panoramic Sunroof",
      "Available in: Delhi, Mumbai, Bengaluru",
    ],
  },
];

export default function FeaturedCars() {
  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {featuredCars.map((car, i) => (
          <motion.div
            key={car.name}
            className={`flex flex-col lg:flex-row items-center gap-12 ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            {/* Text */}
            <div className="lg:w-1/2 space-y-5 text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">{car.name}</h2>
              <ul className="list-disc list-inside text-gray-700 font-medium space-y-1">
                {car.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <a
                href="/login"
                className="inline-block mt-4 bg-yellow-500 text-white px-6 py-2 rounded-md shadow hover:bg-yellow-600 transition"
              >
                Book {car.name.split(" ")[0]}
              </a>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 w-full">
              <div className="overflow-hidden rounded-xl shadow-xl">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

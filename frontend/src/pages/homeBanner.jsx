import { motion } from "framer-motion";
import carBanner from "../assets/car image.svg"; // Adjust this path to your uploaded image

 export default function GenGoBanner() {
  return (
    <div className="bg-yellow-400 text-black py-10 px-6 rounded-b-2xl shadow-xl overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-10">
        
        {/* LEFT: Text + Form */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 space-y-6"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold uppercase"
          >
            <span className="text-white">Drive</span>{" "}
            <span className="text-black">Anytime</span>{" "}
            <span className="underline decoration-dotted decoration-2 underline-offset-4 text-white">
              Anywhere
            </span>
          </motion.h1>

          <p className="text-lg font-medium">
            No commitment, unlimited options and hassle-free booking. Your road
            to adventure's just a <span className="font-bold text-green-700">GEN-GO</span> away!
          </p>

          <form className="space-y-3 bg-white text-black p-4 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Enter your pickup location"
              className="w-full border border-gray-300 p-2 rounded"
            />
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
        </motion.div>

        {/* RIGHT: Car Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
         
        </motion.div>
      </div>
    </div>
  );
}



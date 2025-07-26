import CarList from "./CarslistsPage";
import { useNavigate } from "react-router-dom";

export default function Cars() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Header with button */}
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        {/* <h1 className="text-2xl font-semibold text-gray-800">Cars</h1> */}
        <button
          onClick={() => navigate("/carform")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Car
        </button>
      </div>

      {/* Car List Full Width */}
      <div className="w-full">
        <CarList />
      </div>
    </div>
  );
}

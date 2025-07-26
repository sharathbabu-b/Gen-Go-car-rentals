import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ApproveCar,
  rejectCar,
  fetchAllCars,
  deleteCars,
} from "../slices/carslices";

export default function ApproveCars() {
  const [approve, setApprove] = useState(true);
  const dispatch = useDispatch();

  const { carsData, loading, serverErr } = useSelector((state) => state.cars);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  const approvedCars = carsData.filter((car) => car.isApproved === true);
  const requestedCars = carsData.filter((car) => car.isApproved === false);

  const handleApprove = async (id) => {
    await dispatch(ApproveCar(id));
    dispatch(fetchAllCars());
  };

  const handleReject = async (id) => {
    
    await dispatch(rejectCar(id));
    dispatch(fetchAllCars());
  };

  const handleRemove = async (id) => {
    await dispatch(deleteCars(id));
    dispatch(fetchAllCars());
  };

  return (
    <div className="flex justify-center mt-10 min-h-screen">
      <div className="w-[90%] overflow-x-auto">
        <div className="flex gap-4 mb-6">
          <button
            className={`text-sm border rounded-md py-1 px-3 ${
              approve ? "bg-purple-700 text-white" : "bg-purple-400 text-white"
            }`}
            onClick={() => setApprove(true)}
          >
            Approved Cars
          </button>
          <button
            className={`text-sm border rounded-md py-1 px-3 ${
              !approve ? "bg-purple-700 text-white" : "bg-purple-400 text-white"
            }`}
            onClick={() => setApprove(false)}
          >
            Requested Cars
          </button>
        </div>

        {loading ? (
          <p >Loading cars...</p>
        ) : serverErr ? (
          <p className="text-red-500">{serverErr}</p>
        ) : (
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 p-4">
              {approve ? "Approved Cars" : "Pending Approval"}
            </h2>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Image</th>
                  <th className="border px-4 py-2 text-left">Brand</th>
                  <th className="border px-4 py-2 text-left">Year</th>
                  <th className="border px-4 py-2 text-left">Type</th>
                  <th className="border px-4 py-2 text-left">Price/Hour</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  {userData?.role === "admin" && (
                    <>
                      <th className="border px-4 py-2 text-left">
                        {approve ? "Reject" : "Approve"}
                      </th>
                      <th className="border px-4 py-2 text-left">Remove</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {(approve ? approvedCars : requestedCars).map((car) => (
                  <tr key={car._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{car.carName}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={car.images}
                        alt={car.carName}
                        className="w-28 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">{car.brand}</td>
                    <td className="border px-4 py-2">{car.year}</td>
                    <td className="border px-4 py-2">{car.fuel_type}</td>
                    <td className="border px-4 py-2">₹{car.price_Per_Hour}</td>
                    <td className="border px-4 py-2">
                      {car.isApproved ? "Approved" : "Pending"}
                    </td>
                    {userData?.role === "admin" && (
                      <>
                        <td className="border px-4 py-2">
                          {approve ? (
                            <button
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                              onClick={() => handleReject(car._id)}
                            >
                              Reject
                            </button>
                          ) : (
                            <button
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                              onClick={() => handleApprove(car._id)}
                            >
                              Approve
                            </button>
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                            onClick={() => handleRemove(car._id)}
                          >
                            Remove
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

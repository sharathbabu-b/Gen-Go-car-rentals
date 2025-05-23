import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCars } from "../slices/carslices"

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { carsData, loading } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  const total = carsData.length;
  const approved = carsData.filter(c => c.isApproved).length;
  const pending = total - approved;
  const rented = carsData.filter(c => c.isRented).length;
  const available = total - rented;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      {loading ? (
        <p className="text-center">Loading car data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card title="Total Cars" count={total} />
          <Card title="Approved Cars" count={approved} />
          <Card title="Pending Approval" count={pending} />
          <Card title="Currently Rented" count={rented} />
          <Card title="Available Cars" count={available} />
        </div>
      )}
    </div>
  );
}

function Card({ title, count }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 text-center">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-blue-600 mt-2">{count}</p>
    </div>
  );
}
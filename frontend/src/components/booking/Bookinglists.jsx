import { useSelector, useDispatch } from 'react-redux';
import { fetchbookingUser } from "../../slices/bookingSlices";
import { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";

const BookingList = () => {
  const dispatch = useDispatch();
  const { bookingData, loading, serverErr } = useSelector((state) => state.booking);
  const { userData } = useSelector((state) => state.user);

  const [searchCar, setSearchCar] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchbookingUser());
  }, [dispatch]);

  const isAdminOrProvider = userData?.role === "admin" || userData?.role === "provider";

  // Bookings visible to this user
  const visibleBookings = bookingData?.filter((booking) =>
    isAdminOrProvider ? true : booking.userId?._id === userData?._id
  );

  // Apply filters if admin/provider
  const filteredBookings = isAdminOrProvider
    ? visibleBookings?.filter((booking) => {
        const carMatch = booking.carId?.carName?.toLowerCase().includes(searchCar.toLowerCase());
        const statusMatch = statusFilter === "all" || booking.paymentStatus === statusFilter;
        const bookingStart = new Date(booking.startDate);
        const startMatch = !startDate || bookingStart >= new Date(startDate);
        const endMatch = !endDate || bookingStart <= new Date(endDate);
        return carMatch && statusMatch && startMatch && endMatch;
      })
    : visibleBookings;

  // Paginate
  const paginatedBookings = filteredBookings?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const csvHeaders = [
    { label: "Car", key: "carId.carName" },
    { label: "Start Date", key: "startDate" },
    { label: "End Date", key: "endDate" },
    { label: "Status", key: "paymentStatus" },
    { label: "User Name", key: "userId.name" },
    { label: "User Email", key: "userId.email" }
  ];

  if (loading) return <p className="text-center text-gray-600">Loading bookings...</p>;
  if (serverErr) return <p className="text-center text-red-500">Error: {serverErr}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>

      {/* Filters for admin/provider */}
      {isAdminOrProvider && (
        <>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by Car Name"
              value={searchCar}
              onChange={(e) => setSearchCar(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <CSVLink
              data={filteredBookings}
              headers={csvHeaders}
              filename="booking-report.csv"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Download CSV
            </CSVLink>
          </div>
        </>
      )}

      {/* Booking Table */}
      {filteredBookings?.length === 0 ? (
        <p className="text-center text-gray-500 border p-4 rounded bg-gray-50">
          No bookings found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Car</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Start Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">End Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{booking.carId?.carName || "N/A"}</td>
                  <td className="px-4 py-2">{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        booking.paymentStatus === "completed"
                          ? "bg-green-100 text-green-700"
                          : booking.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev * itemsPerPage < filteredBookings.length ? prev + 1 : prev
                )
              }
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage * itemsPerPage >= filteredBookings.length}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;

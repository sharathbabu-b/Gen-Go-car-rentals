import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../../slices/bookingSlices';

export default function BookingList() {
  const dispatch = useDispatch();

  const { bookings, loading, error } = useSelector((state) => state.booking);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const isAdmin = userData?.role === 'admin';

  const filteredBookings = isAdmin
    ? bookings
    : bookings.filter((booking) => booking.userId._id === userData._id);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-500">{error.message}</p>}

      {filteredBookings?.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredBookings.map((b) => (
            <li key={b._id} className="border p-4 rounded shadow-sm">
              <p><strong>Car:</strong> {b.carId?.brand} {b.carId?.model}</p>
              <p><strong>Pickup:</strong> {b.pickup_Location}</p>
              <p><strong>Dropoff:</strong> {b.dropoff_Location}</p>
              <p><strong>From:</strong> {new Date(b.startDate).toLocaleDateString()}</p>
              <p><strong>To:</strong> {new Date(b.endDate).toLocaleDateString()}</p>
              <p><strong>Total Price:</strong> ₹{b.totalPrice}</p>
              <p><strong>Status:</strong> {b.bookingStatus}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

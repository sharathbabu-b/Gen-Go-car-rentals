import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PaymentSuccess (){
  const { bookingId } = useParams();
  const { bookingData } = useSelector((state) => state.booking);
  const booking = bookingData?.find((b) => b._id === bookingId);

  if (!booking) {
    return (
      <div className="text-center mt-10 text-red-500">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-12 bg-white shadow rounded text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h1>
      <p className="text-gray-700 mb-2">Booking ID: <strong>{bookingId}</strong></p>
      <p className="text-gray-700 mb-2">Car ID: <strong>{booking.carId}</strong></p>
      <p className="text-gray-700 mb-6">
        Total Paid: ₹{booking.totalPrice.toLocaleString()}
      </p>

      <Link
        to={`/receipt/${bookingId}`}
        className="inline-block px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        📄 View Receipt
      </Link>
    </div>
  );
};

export default PaymentSuccess;

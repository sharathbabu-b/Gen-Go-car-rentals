import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios/axios";

const RazorpayCheckout = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { userData } = useSelector((state) => state.user);
  const { bookingData } = useSelector((state) => state.booking);
  const bookingObj = bookingData?.find((ele) => ele._id === id);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    script.onerror = () => alert("Failed to load Razorpay SDK");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!bookingObj) return alert("Booking not found");

    try {
      const res = await axios.post(
        "/payment/razor/create",
        {
          bookingId: id,
          amount: bookingObj.totalPrice,
          userId: userData._id,
          carId: bookingObj.carId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const { orderId, razorpayKey, payment } = res.data;

      const options = {
        key: razorpayKey,
        amount: bookingObj.totalPrice * 100, // convert to paise
        currency: "INR",
        name: "GEN-GO Rentals",
        description: "Car Booking Payment",
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "/payments/verify-razorpay", 
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: payment._id,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );

            if (verifyRes.status === 200) {
              alert("Payment successful!");
              navigate(`/booking/success/${id}`);
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error", err);
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: userData.name || "GEN-GO User",
          email: userData.email || "user@gengo.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0f766e",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay not loaded. Try again.");
      }
    } catch (err) {
      console.error("Payment error", err);
      alert("Something went wrong while initiating payment.");
    }
  };

  if (!bookingObj)
    return <p className="text-center text-red-500">Booking not found.</p>;

  return (
    <div className="p-4 max-w-lg mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Pay ₹{bookingObj.totalPrice.toLocaleString()} for your booking
      </h2>
      <button
        onClick={handlePayment}
        className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition mb-3"
      >
        Pay Now
      </button>
      <button
        onClick={() => navigate("/carlist")}
        className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
      >
        Cancel
      </button>
      <div className="flex justify-center mt-6">
        <img
          src="/src/assets/logo.png"
          alt="logo"
          className="h-48 w-48 object-contain"
        />
      </div>
    </div>
  );
};

export default RazorpayCheckout;

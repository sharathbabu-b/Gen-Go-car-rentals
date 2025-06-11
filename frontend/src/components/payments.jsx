
// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "../axios/axios"; // ← import your axios instance

// const RazorpayPayment = () => {
//   const { id } = useParams();
//   const { bookingData } = useSelector((state) => state.booking);
//   const booking = bookingData?.find((ele) => ele._id === id);

//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       script.onload = () => console.log("Razorpay script loaded");
//       script.onerror = () => {
//         console.error("Failed to load Razorpay script");
//         alert("Failed to load Razorpay payment system.");
//       };
//       document.body.appendChild(script);
//     };

//     loadRazorpayScript();
//   }, []);

//   if (!booking) {
//     return <p className="text-center text-red-600">Booking not found.</p>;
//   }

//   const { carId, userId, totalPrice } = booking;

//   const handlePayment = async () => {
//     if (!window.Razorpay) {
//       alert("Razorpay SDK not loaded. Try again later.");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/payment/razor/create", {
//         bookingId: id,
//         amount: totalPrice,
//         userId,
//         carId,
//       });

//       const options = {
//         key: process.env || "YOUR_RAZORPAY_KEY_ID",
//         amount: data.amount,
//         currency: data.currency,
//         name: "GEN-GO Rentals",
//         description: "Car Booking Payment",
//         order_id: data.id,
//         handler: async (response) => {
//           try {
//             await axios.post("/payment/razor/verify", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               bookingId: id,
//               userId,
//             });
//             alert("Payment successful!");
//           } catch (err) {
//             console.error("Verification failed", err);
//             alert("Payment verification failed.");
//           }
//         },
//         prefill: {
//           name: "Sharathbabu",
//           email: "customer@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#0d9488",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       alert("Error initiating Razorpay payment.");
//     }
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//     >
//       Pay ₹{totalPrice} with Razorpay
//     </button>
//   );
// };

// export default RazorpayPayment;
import  { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import axios from '../axios/axios'

const RazorpayCheckout = () => {
    //  const [mobileNumber, setMobileNumber] = useState("");
     const navigate=useNavigate()
    const {id}=useParams()
    const {userData}=useSelector((state)=>{
        return state.user
    })
    const {bookingData}=useSelector((state)=>{
        return state.booking
    })
    const bookingObj=bookingData?.find((ele)=>ele._id==id)
  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("Error loading Razorpay script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup when component unmounts
    };
  }, []);

  const handlePayment = async () => {
    //  if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
    //   return alert("Please enter a valid 10-digit mobile number");
    // }
    try {
      const orderResponse = await axios.post(
        "/payment/razor/create",
        {
          amount: bookingObj.totalPrice,
          userId: userData._id,
          carId: bookingObj.carId,
          bookingId: id,
        },{headers:{Authorization:localStorage.getItem('token')}}  //{headers:{Authorization:localStorage.getItem('token')}}
      );

      const { orderId, razorpayKey, payment } = orderResponse.data;

      if (!orderId || !razorpayKey || !payment) {
        alert("Failed to create order");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: bookingObj.totalPrice * 100,
        currency: "INR",
        name: "MillMart",
        description: "Equipment rental payment",
        order_id: orderId,
        handler: async function (response) {
          const verifyResponse = await axios.post(
            "/payments/verify-razorpay",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: payment._id,
            },{headers:{Authorization:localStorage.getItem('token')}}
          );

          const verifyResult = verifyResponse.data;
          if (verifyResponse.status === 200) {
            alert("Payment successful and verified!");
            navigate('/carlist')
            console.log(verifyResult);
          } else {
            alert("Payment verification failed");
            console.error(verifyResult);
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: '9999999999',
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay script not loaded correctly.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    }
  };
if(!bookingData && !bookingObj) return false
  return (
    // 
    <div className="p-4 max-w-lg mx-auto h-[500px] bg-white shadow rounded mt-9">
    
        <div>
     {bookingObj&& <h2 className="text-xl font-semibold mb-4">
        Pay ₹{bookingObj.totalPrice.toLocaleString()} with Razorpay
      </h2>}
      </div>
      {/* <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Mobile Number</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
        />
      </div> */}
      <div>
      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Pay Now
      </button>
      
      </div>
      <div className="mt-3">
      <button
        // onClick={()=>navigate('/dashboard')}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Cancel Pay
      </button>
      
      </div>
      <div className='h-60 w-60 mb-10'>
        <img className='h-60 w-60' src='/src/assets/download (4).png' alt='millPayment' />
      </div>
    </div>
    
  

  );
};

export default RazorpayCheckout;

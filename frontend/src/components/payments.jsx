import React from "react";
import axios from "../axios/axios";
export default function Payment(){
    const paymentButton=({amount,bookingId,userId})=>{
        const handlePayment=async()=>{
            const {data:order}=await axios.post("/payment/razor/create",{
                amount,
                currency:"INR",
                receipt: bookingId
            })
            const options={
                key:process.env.RAZORPAY_KEY_ID,
                amount:order.amount,
                currency:order.currency,
                name:"GEN-GO Car Rentals",
                description:"Car Booking Payment",
                order_id:order.id,
                handler:async function(response){
                    await axios.post('/payments/verify-razorpay',{
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                      bookingId,
                   userId    
                    });
                    alert("Payment Successful!")
                },
                theme:{
                    color:"#EF4444"
                }
            };
            const razorpay=new window.Razorpay(options)
            razorpay.open()

        }
    }
    return(
         <div>
      <button onClick={handlePayment} className="bg-red-500 text-white px-4 py-2 rounded">
        Pay Now
      </button>
    </div>
    )
}
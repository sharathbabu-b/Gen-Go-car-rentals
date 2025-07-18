import { validationResult } from "express-validator";
import Payment from "../models/paymentModels.js";
import crypto from "crypto"
import razorpay from "../../utils/razorpay.js";
import Booking from "../models/bookingModels.js";
const paymentCtrl={}
paymentCtrl.getallPayments=async(req,res)=>{
    try{
        const payments=await Payment.find()
        .populate('bookingId')
      .populate('userId');
      res.status(200).json(payments);
    }catch(error){
        console.log(error)
        res.status(500).json({errors:"Something went wrong"})
    }
}
paymentCtrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{bookingId,userId,carId,amount,paymentMethod,paymentStatus}=req.body
    try{
        const paymentcreate=new Payment(bookingId,userId,carId,amount,paymentMethod,paymentStatus)
        await paymentcreate.save()
        res.status(201).json(paymentcreate)
}catch(error){
    console.log(error)
    res.status(500).json({errors:"Something went wrong"})
}
} 
// marks payment as completed
paymentCtrl.completePayment=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const payment=await Payment.findById(id)
        if(!payment){
            return res.status(404).json({errors:"payment not found"})
        }
    }catch(error){
        console.log(error)
    }
}
// refund payment 
paymentCtrl.refund=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {bookingId,paymentStatus}=req.params.id
    const payment=await Payment.findOne({bookingId:id,paymentStatus:"success"})
        if(!payment && payment.razorpay_payment_id){
            try{
                const refund=await razorpay.payments.refund(payment.razorpay_payment_id)
                payment.paymentStatus = "refund";
        await payment.save();
        return res.status(200).json({ message: "Booking cancelled and payment refunded", refund });
            }catch(error){
                console.log(error)
                return res.status(500).json({ errors: "Booking cancelled but refund failed" })
 
        }
        }
    }
paymentCtrl.getPaymentById=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const paymentgetId=await Payment.findById(id)
        .populate('bookingId')
        .populate('userId');
        if (!paymentgetId) {
            return res.status(404).json({ message: 'Payment not found' });
          }
          res.status(200).json(paymentgetId);
    }catch(error){
        console.log(error)
        res.status(500).json({errors:"Something went wrong"})
    }   
}
paymentCtrl.updatePayment=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const id=req.params.id
    try{
        const paymentupdate=await Payment.findByIdAndUpdate(id,body,{new:true})
        if (!paymentupdate) {
            return res.status(404).json({ message: 'Payment not found' });
          }
          res.status(200).json(paymentupdate);
    }catch(error){
        console.log(error)
        res.status(500).json({errors:"Something went wrong"})
    }   
}
paymentCtrl.deletePayment=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const paymentdelete=await Payment.findByIdAndDelete(id)
        if (!paymentdelete) {
            return res.status(404).json({ message: 'Payment not found' });
          }
          res.status(200).json(paymentdelete);
    }catch(error){
        console.log(error)
        res.status(500).json({errors:"Something went wrong"})
    }   
}
// razorpay 

paymentCtrl.createRazorpayOrder = async (req, res) => {
  const { amount, currency = "INR", bookingId, carId, userId } = req.body;

  // ✅ Log incoming request data
  console.log("📦 Received Payment Request:", req.body);
  console.log("🔐 Razorpay Keys:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

  if (!amount || !userId || !bookingId || !carId) {
    return res.status(400).json({ errors: "Missing required fields" });
  }

  try {
    const existing = await Payment.findOne({ bookingId, userId, carId });
    if (existing) {
      return res.status(400).json({ error: "Transaction already exists" });
    }

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      bookingId,
      carId,
      amount,
      userId,
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      razorpay_order_id: order.id,
    });

    res.status(201).json({
      orderId: order.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      payment,
    });
  } catch (error) {
    console.error("❌ Create order error:", error);
    res.status(500).json({
      errors: "Failed to create Razorpay order",
      details: error?.message || "Unknown error",
    });
  }
};

// paymentCtrl.verifyRazorpayPayment = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//     return res.status(400).json({ errors: "Missing required fields for verification" });
//   }

//   try {
//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ error: "Invalid signature" });
//     }

//     const payment = await Payment.findOne({ razorpay_order_id });
//     if (!payment) {
//       return res.status(404).json({ error: "Payment record not found" });
//     }

//     payment.paymentStatus = "success";
//     payment.razorpay_payment_id = razorpay_payment_id;
//     payment.razorpay_signature = razorpay_signature;
//     await payment.save();

//     res.status(200).json({
//       message: "Payment verified successfully",
//       payment,
//     });
//   } catch (error) {
//     console.error("Verification error:", error);
//     res.status(500).json({ error: "Payment verification failed" });
//   }
// };
paymentCtrl.verifyRazorpayPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ errors: "Missing required fields for verification" });
  }

  try {
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const payment = await Payment.findOne({ razorpay_order_id });
    if (!payment) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    // ✅ Update payment details
    payment.paymentStatus = "success";
    payment.razorpay_payment_id = razorpay_payment_id;
    payment.razorpay_signature = razorpay_signature;
    await payment.save();

    // ✅ Also update booking's payment status
    const booking = await Booking.findById(payment.bookingId);
    if (booking) {
      booking.paymentStatus = "paid"; // or "success" or any term you prefer
      await booking.save();
    }

    res.status(200).json({
      message: "Payment verified and booking updated successfully",
      payment,
      booking,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};

export default paymentCtrl
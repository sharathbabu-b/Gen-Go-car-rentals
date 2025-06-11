import { validationResult } from "express-validator";
import Booking from "../models/bookingModels.js"
import Cars from "../models/carModels.js";
const bookingCtrl={}
bookingCtrl.createBooking = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {userId,carId,pickup_Location,dropoff_Location,endDate,startDate,totalPrice}=req.body
    
    try {
      const booking = new Booking({userId:req.userId,carId,pickup_Location,dropoff_Location,endDate,startDate,totalPrice});
      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: 'Booking creation failed', error });
    }
  };
  
bookingCtrl.getAllBookings = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("carId", "carName model brand");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Something went wrong" });
  }
};
// bookingCtrl.getAllBookings = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const booking = await Booking.find()
//       .populate("userId", "name email")
//       .populate("carId", "carName,model,brand");

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json(booking);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ errors: "something went wrong" });
//   }
// };
bookingCtrl.getbookingById=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const bookingId=await Booking.findById(id)
        if(!bookingId){
            return res.status(404).json({message:"Booking not found"})
        }
        res.status(200).json(bookingId)
    }catch(error){
        console.log(error)
        res.status(500).json({errors:"Something went wrong"})
    }
}
bookingCtrl.updateBooking=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    try{
        const updated=await Booking.findByIdAndUpdate(body,id,{new:true,})
        if(!updated){
            return res.status(404).json({message:"Booking updated not found"})
        }
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(500).json("something went wrong")
    }

}
bookingCtrl.deleteBooking=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const deleted=await Booking.findByIdAndDelete(id)
        if (!deleted){
             return res.status(404).json({ message: 'Booking not found' })
        }
        res.status(200).json(deleted);
    }catch(err){
        console.log(err)
        res.status(500).json({errors:"something went wrong"})
    }

}
bookingCtrl.cancelBooking=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const cancel=await Booking.findById(id)
        if (!cancel) {
            return res.status(404).json({ message: 'Booking not found' });
          }
          if(cancel.bookingStatus==="cancelled"){
            return res.status(400).json({message:"Booking is already cancelled"})
          }
          const now=new Date()
          if(cancel.startDate<=now){
            return res.status(400).json({message: 'Cannot cancel a booking that has already started'})
          }
          cancel.bookingStatus="cancelled"
          await cancel.save()
          res.status(200).json(cancel)
    }catch(error){
    console.log(error)
    res.status(500).json({errors:"Something went wrong"})
}

}
export default bookingCtrl
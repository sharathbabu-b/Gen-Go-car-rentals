import { validationResult } from "express-validator";
import Booking from "../models/bookingModels.js"
const bookingCtrl={}
bookingCtrl.createBooking = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try {
      const booking = new Booking(body);
      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: 'Booking creation failed', error });
    }
  };

bookingCtrl.getAllBookings=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const booking=await Booking.find()
        .populate("userId","name email")
        .populate("carId","model brand")
        if(!booking){
            return res.status(404).json({message:"Booking not found"})
        }
        res.status(200).json(booking)
    }catch(err){
        console.log(err)
        res.status(500).json({errors:"something went wrong"})
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
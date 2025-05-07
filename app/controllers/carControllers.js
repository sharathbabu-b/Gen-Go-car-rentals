import Cars from "../models/carModels.js"
import {validationResult} from "express-validator"
const CarCltr={}
CarCltr.create=async(req,res)=>{
    const errors=validationResult()
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const car=await Cars.create(body)
        res.status(201).json(car)
    }catch(err){
        console.log(err)
        res.status(500).json({errors:"something went wrong"})

    }
}
CarCltr.listAllCars=async(req,res)=>{
  try{
    const cars=await Cars.find()
    res.json(cars)
  }catch(err){
    console.log(err)
    res.status(500).json({errors:'something went wrong'})
  }
}
CarCltr.getCarByid=async(res,req)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id 
    try{
        const cars=await Cars.findById(id)
        if(!cars){
            return res.status(404).json({errors:"Car not found"})
        }
        res.status(200).json(cars)
    }catch(err){
        res.status(500).json({errors:"something went wrong"})
    }
}
CarCltr.updateCar=async(res,req)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const id=req.params.id
    try{
        const updateCar=await Cars.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        if(!updateCar){
            return res.status(404).json({errors:"Car not found"})
        }
        res.status(200).json(updateCar)
    }catch(err){
        console.log(err)
        res.status(500).json({errors:"Something went wrong"})
    }

}

CarCltr.deleteCar=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors,isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const deleteCar=await Cars.findByIdAndDelete(id)
        if(!deleteCar){
            return res.status(404).json({errors:"Car not found"})
        }
        res.status(200).json({message:"car deleted successfully",deleteCar})
    }catch(err){
        console.log(err)
        res.status(500).json({errors:"something went wrong"})
    }
}
//gpstrack  car

export default CarCltr
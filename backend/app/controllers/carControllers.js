import Cars from "../models/carModels.js"
import {validationResult} from "express-validator"
import { forwardGeocode } from "../../utils/geoapify.js"
const CarCltr={}
// CarCltr.create=async(req,res)=>{
//     const errors=validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     const body=req.body
//     console.log(body)
//     try{
//           const geoData = await forwardGeocode(body.address);
//           const feature = geoData.features[0];
//       console.log(feature)
//     if (!feature) {
//       return res.status(400).json({ errors: 'Invalid address provided' });
//     }

//     const { lat, lon } = feature.properties;
//         const car=await Cars.create(body)
//         res.status(201).json(car)
//     }catch(err){
//         console.log(err)
//         res.status(500).json({errors:"something went wrong"})

//     }
// }
CarCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;

  try {
    const geoData = await forwardGeocode(body.location); // ← Use the address string
    const feature = geoData.features[0];

    if (!feature) {
      return res.status(400).json({ errors: 'Invalid address provided' });
    }

    const [lon, lat] = feature.geometry.coordinates; // longitude, latitude

    const car = await Cars.create({
      ...body,
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
    });

    res.status(201).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Something went wrong" });
  }
};

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
    if(!errors.isEmpty()){
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
CarCltr.findNearbyCars = async (req, res) => {
  const { lat, lon, radius } = req.query;

  // Validate input
  if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ errors: 'Latitude and longitude are required and must be valid numbers.' });
  }

  const searchRadius = radius ? parseInt(radius) : 10000; // default 10km

  try {
    const cars = await Cars.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lon), parseFloat(lat)]
          },
          $maxDistance: searchRadius
        }
      },
      availability: true
    });

    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: 'Failed to find nearby cars' });
  }
};
CarCltr.isApproved=async(req,res)=>{
    const id =req.params.id
    const {isApproved}=req.body
    console.log(isApproved)
    try{
        const ApproveCar=await Cars.findByIdAndUpdate(id,{isApproved},{new:true})
        if(!ApproveCar){
            res.status(404).json({error:"product is not approved"})
        }
        res.json(ApproveCar)
    }catch(err){
        console.log(err)
        res.status(500).json({errors:"something went wrong"})
    }
 }



export default CarCltr
import { useEffect } from "react";
import { useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { createCars,updateCars } from "../slices/carslices";


export default function Carsform() {
  const {carsData,carEditId,serverErr}=useSelector((state)=>{
    return state.cars
  })
  const dispatch =useDispatch()
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [seats, setSeats] = useState("");
  const [price_Per_Hour, setPricePerHour] = useState("");
  const [price_Per_Day, setPricePerDay] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");
  const [gpsTrack, setGpsTrack] = useState(false);
  const [clientErrors,setClientErrors]=useState({})
  useEffect(()=>{
    if(carEditId){
      const cars=carsData.find(ele=>ele._id===carEditId)
      setCarName(cars.carName)
      setBrand(cars.brand),
      setModel(cars.model),
      setYear(cars.year),
      setFuelType(cars.fuel_type)
      setTransmission(cars.transmission),
      setSeats(cars.seats),
      setPricePerDay(cars.price_Per_Day)
      setPricePerHour(cars.price_Per_Hour)
      setLocation(cars.location)
      setImages(cars.images)
      setGpsTrack(cars.gpsTrack)
      
    }
  },[carEditId,carsData])
  const handleSubmit = (e) => {
    e.preventDefault();
    const resetForm=()=>{
      setCarName(""),
      setBrand(""),
      setModel(""),
      setYear(""),
      setTransmission(""),
      setSeats(""),
      setPricePerDay("")
      setPricePerHour("")
      setLocation("")
      setImages("")
      setGpsTrack("")
      setFuelType("")
    }
    const errors={}
    const currentYear = new Date().getFullYear();

    if(carName.trim().length===0){
      errors.carName="Car Name field is required"
    }
    if (brand.trim().length === 0) {
    errors.brand = "Brand is required";
  }

  if (model.trim().length === 0) {
    errors.model = "Model is required";
  }

  if (year.trim().length === 0) {
    errors.year = "Year is required";
  } else if (!/^\d{4}$/.test(year)) {
    errors.year = "Year must be a 4-digit number";
  } else if (parseInt(year, 10) < 1900 || parseInt(year, 10) > currentYear) {
    errors.year = `Year must be between 1900 and ${currentYear}`;
  }

  if (fuel_type.trim().length === 0) {
    errors.fuel_type = "Fuel type is required";
  }

  if (transmission.trim().length === 0) {
    errors.transmission = "Transmission is required";
  }

  if (seats.trim().length === 0) {
    errors.seats = "Number of seats is required";
  } else if (isNaN(seats) || parseInt(seats, 10) <= 0) {
    errors.seats = "Seats must be a positive number";
  }

  if (price_Per_Hour.trim().length === 0) {
    errors.price_Per_Hour = "Price per hour is required";
  } else if (isNaN(price_Per_Hour) || parseFloat(price_Per_Hour) <= 0) {
    errors.price_Per_Hour = "Price per hour must be a positive number";
  }

  if (price_Per_Day.trim().length === 0) {
    errors.price_Per_Day = "Price per day is required";
  } else if (isNaN(price_Per_Day) || parseFloat(price_Per_Day) <= 0) {
    errors.price_Per_Day = "Price per day must be a positive number";
  }

  if (location.trim().length === 0) {
    errors.location = "Location is required";
  }

  if (images.trim().length === 0) {
    errors.images = "Image URL is required";
  } else {
    try {
      new URL(images);
    } catch (_) {
      errors.images = "Image URL must be a valid URL";
    }
  }
  if(Object.keys(errors).length>0){
    setClientErrors(errors)
  }else{
    if(carEditId){
      const cars=carsData.find(ele=>ele._id===carEditId)
      const carsObj={...cars,carName: carName,
    brand: brand,
    model: model,
    year: year,
    fuel_type:fuel_type,
    transmission: transmission,
    seats: seats,
    price_Per_Hour: price_Per_Hour,
    price_Per_Day: price_Per_Day,
    location: location,
    images: images,
    gpsTrack:gpsTrack}
    dispatch(updateCars({carsObj,resetForm}))
    }else{
       const formData = {
      carName,
      brand,
      model,
      year,
      fuel_type,
      transmission,
      seats ,
      price_Per_Hour,
      price_Per_Day,
      location,
      images,
      gpsTrack,
    }
    dispatch(createCars({formData,resetForm}))
    setClientErrors({})

    }
  }
    
  }


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 >{carEditId? "EDIT":"ADD"} CAR </h1>
      {serverErr && <>
      <ul>
        {serverErr.errors.map((ele,i)=>{
          return <li key={i}>{error.msg}</li>
        })}
      </ul>
      </>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          className="border p-2 rounded-md"
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        /> {clientErrors&&<p style={{color:'red'}}>{clientErrors.carName}</p>}
                    
        <input
          className="border p-2 rounded-md"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />{clientErrors&&<p style={{color:'red'}}>{clientErrors.brand}</p>}
        <input
          className="border p-2 rounded-md"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />{clientErrors&&<p style={{color:'red'}}>{clientErrors.model}</p>}
        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />{clientErrors&&<p style={{color:'red'}}>{clientErrors.year}</p>}
        <select
          className="border p-2 rounded-md"
          value={fuel_type}
          onChange={(e) => setFuelType(e.target.value)}
        >
          <option value="">Select Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="EV">EV</option>
        </select>{clientErrors&&<p style={{color:'red'}}>{clientErrors.fuel_type}</p>}
        <select
          className="border p-2 rounded-md"
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="">Select Transmission</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>{clientErrors&&<p style={{color:'red'}}>{clientErrors.transmission}</p>}
        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />{clientErrors&&<p style={{color:'red'}}>{clientErrors.seats}</p>}
        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Price Per Hour"
          value={price_Per_Hour}
          onChange={(e) => setPricePerHour(e.target.value)}
        />{clientErrors&&<p style={{color:'red'}}>{clientErrors.price_Per_Hour}</p>}
        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Price Per Day"
          value={price_Per_Day}
          onChange={(e) => setPricePerDay(e.target.value)}
        />{clientErrors&&<p style={{color:'red'}}>{clientErrors.price_Per_Day}</p>}
        <input
          className="border p-2 rounded-md"
          placeholder="Location (lat,lng)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />{clientErrors&&<p style={{color:'red'}}>{clientErrors.location}</p>}
        <input
          className="border p-2 rounded-md"
          placeholder="Image URL"
          value={images}
          onChange={(e) => setImages(e.target.value)}
        />{clientErrors&&<p style={{color:'red'}}>{clientErrors.images}</p>}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={gpsTrack}
            onChange={(e) => setGpsTrack(e.target.checked)}
          />
          Enable GPS Tracking
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          AddCar
        </button>
      </form>
    </div>
  );
}

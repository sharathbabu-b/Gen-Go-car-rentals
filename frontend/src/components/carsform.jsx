import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCars, updateCars } from "../slices/carslices";

export default function Carsform() {
  const { carsData, carsEditId, serverErr } = useSelector((state) => state.cars);
  const dispatch = useDispatch();

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
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => {
    if (carsEditId) {
      const car = carsData.find((ele) => ele._id === carsEditId);
      if (car) {
        setCarName(car.carName);
        setBrand(car.brand);
        setModel(car.model);
        setYear(car.year);
        setFuelType(car.fuel_type);
        setTransmission(car.transmission);
        setSeats(car.seats);
        setPricePerHour(car.price_Per_Hour);
        setPricePerDay(car.price_Per_Day);
        setLocation(car.location);
        setImages(car.images);
        setGpsTrack(car.gpsTrack);
      }
    }
  }, [carsEditId, carsData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const errors = {};
    const resetForm = () => {
      setCarName("");
      setBrand("");
      setModel("");
      setYear("");
      setTransmission("");
      setSeats("");
      setPricePerDay("");
      setPricePerHour("");
      setLocation("");
      setImages("");
      setGpsTrack(false);
      setFuelType("");
    };

    // Validation
    if (!carName.trim()) errors.carName = "Car Name is required";
    if (!brand.trim()) errors.brand = "Brand is required";
    if (!model.trim()) errors.model = "Model is required";
    if (!/^\d{4}$/.test(year)) errors.year = "Year must be a valid 4-digit year";
    else if (parseInt(year) < 1900 || parseInt(year) > currentYear)
      errors.year = `Year must be between 1900 and ${currentYear}`;
    if (!fuel_type) errors.fuel_type = "Fuel type is required";
    if (!transmission) errors.transmission = "Transmission is required";
    if (!seats || seats <= 0) errors.seats = "Seats must be a positive number";
    if (!price_Per_Hour || price_Per_Hour <= 0)
      errors.price_Per_Hour = "Price per hour must be positive";
    if (!price_Per_Day || price_Per_Day <= 0)
      errors.price_Per_Day = "Price per day must be positive";
    if (!location.trim()) errors.location = "Location is required";
    try {
      new URL(images);
    } catch {
      errors.images = "Image must be a valid URL";
    }

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    const carData = {
      carName,
      brand,
      model,
      year,
      fuel_type,
      transmission,
      seats,
      price_Per_Hour,
      price_Per_Day,
      location,
      images,
      gpsTrack,
    };

    if (carsEditId) {
      const existingCar = carsData.find((c) => c._id === carsEditId);
      const carsObj = { ...existingCar, ...carData };
      dispatch(updateCars({ carsObj, resetForm }));
    } else {
      dispatch(createCars({ formData: carData, resetForm }));
    }

    setClientErrors({});
  };

  const inputClass = "w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400";
  const errorClass = "text-sm text-red-500 mt-1";

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
        {carsEditId ? "Edit Car Details" : "Add New Car"}
      </h1>

      {serverErr && (
        <ul className="bg-red-100 p-4 mb-4 rounded-md text-red-700">
          {serverErr.errors?.map((err, i) => (
            <li key={i}>{err.msg}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Car Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input className={inputClass} placeholder="Car Name" value={carName} onChange={(e) => setCarName(e.target.value)} />
            {clientErrors.carName && <p className={errorClass}>{clientErrors.carName}</p>}
          </div>
          <div>
            <input className={inputClass} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
            {clientErrors.brand && <p className={errorClass}>{clientErrors.brand}</p>}
          </div>
          <div>
            <input className={inputClass} placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
            {clientErrors.model && <p className={errorClass}>{clientErrors.model}</p>}
          </div>
          <div>
            <input className={inputClass} type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
            {clientErrors.year && <p className={errorClass}>{clientErrors.year}</p>}
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <select className={inputClass} value={fuel_type} onChange={(e) => setFuelType(e.target.value)}>
              <option value="">Select Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="ev">EV</option>
            </select>
            {clientErrors.fuel_type && <p className={errorClass}>{clientErrors.fuel_type}</p>}
          </div>
          <div>
            <select className={inputClass} value={transmission} onChange={(e) => setTransmission(e.target.value)}>
              <option value="">Select Transmission</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
            {clientErrors.transmission && <p className={errorClass}>{clientErrors.transmission}</p>}
          </div>
          <div>
            <input className={inputClass} type="number" placeholder="Seats" value={seats} onChange={(e) => setSeats(e.target.value)} />
            {clientErrors.seats && <p className={errorClass}>{clientErrors.seats}</p>}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input className={inputClass} type="number" placeholder="Price Per Hour" value={price_Per_Hour} onChange={(e) => setPricePerHour(e.target.value)} />
            {clientErrors.price_Per_Hour && <p className={errorClass}>{clientErrors.price_Per_Hour}</p>}
          </div>
          <div>
            <input className={inputClass} type="number" placeholder="Price Per Day" value={price_Per_Day} onChange={(e) => setPricePerDay(e.target.value)} />
            {clientErrors.price_Per_Day && <p className={errorClass}>{clientErrors.price_Per_Day}</p>}
          </div>
        </div>

        {/* Location & Image */}
        <input className={inputClass} placeholder="Location (lat,lng)" value={location} onChange={(e) => setLocation(e.target.value)} />
        {clientErrors.location && <p className={errorClass}>{clientErrors.location}</p>}

        <input className={inputClass} placeholder="Image URL" value={images} onChange={(e) => setImages(e.target.value)} />
        {clientErrors.images && <p className={errorClass}>{clientErrors.images}</p>}

        {/* GPS */}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={gpsTrack} onChange={(e) => setGpsTrack(e.target.checked)} />
          Enable GPS Tracking
        </label>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-medium transition"
        >
          {carsEditId ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  );
}

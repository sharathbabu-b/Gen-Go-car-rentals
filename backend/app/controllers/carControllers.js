import Cars from "../models/carModels.js";
import Booking from "../models/bookingModels.js";
import { validationResult } from "express-validator";
import { forwardGeocode } from "../../utils/geoapify.js";

const CarCltr = {};

//  Create Car with Geoapify geocoding
CarCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;

  try {
    const geoData = await forwardGeocode(body.address); // Use address instead of location
    const feature = geoData.features[0];

    if (!feature) {
      return res.status(400).json({ error: "Invalid address" });
    }

    const [lon, lat] = feature.geometry.coordinates;

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

//  List All Cars (no filters)
CarCltr.listAllCars = async (req, res) => {
  try {
    const cars = await Cars.find();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Something went wrong" });
  }
};

// Get Car by ID
CarCltr.getCarByid = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;

  try {
    const car = await Cars.findById(id);
    if (!car) {
      return res.status(404).json({ errors: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ errors: "Something went wrong" });
  }
};

//  Update Car
CarCltr.updateCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  const id = req.params.id;

  try {
    const updatedCar = await Cars.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ errors: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Something went wrong" });
  }
};

//  Delete Car
CarCltr.deleteCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;

  try {
    const deletedCar = await Cars.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ errors: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully", deletedCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Something went wrong" });
  }
};

// Approve Car (admin)
CarCltr.isApproved = async (req, res) => {
  const id = req.params.id;
  const { isApproved } = req.body;

  try {
    const car = await Cars.findByIdAndUpdate(id, { isApproved }, { new: true });

    if (!car) {
      return res.status(404).json({ error: "Car not found for approval" });
    }

    res.status(200).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Something went wrong" });
  }
};

// Get Available Cars (location, type, price, date, pagination)
CarCltr.getAvailableCars = async (req, res) => {
  try {
    const {
      location,
      type,
      startDate,
      endDate,
      priceSort = "asc",
      page = 1,
      limit = 6,
    } = req.query;

    const skip = (page - 1) * limit;

    const query = {
      isApproved: true,
      ...(location && { address: { $regex: new RegExp(location, "i") } }),
      ...(type && { type }),
    };

    const cars = await Cars.find(query)
      .sort({ pricePerDay: priceSort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    const availableCars = [];

    for (const car of cars) {
      if (!startDate || !endDate) {
        availableCars.push(car);
      } else {
        const bookings = await Booking.find({
          car: car._id,
          status: "confirmed",
          $or: [
            {
              startDate: { $lte: new Date(endDate) },
              endDate: { $gte: new Date(startDate) },
            },
          ],
        });

        if (bookings.length === 0) {
          availableCars.push(car);
        }
      }
    }

    const total = await Cars.countDocuments(query);
    res.status(200).json({
      cars: availableCars,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Error fetching available cars" });
  }
};
// near by cars
// controllers/carController.js

CarCltr.getNearbyCars = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const cars = await Cars.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)],
          },
          distanceField: "distance",
          maxDistance: 10000, // 10 km in meters
          spherical: true,
          query: { isApproved: true },
        },
      },
    ]);

    res.json(cars);
  } catch (err) {
    console.error("Geo search error:", err);
    res.status(500).json({ error: "Failed to fetch nearby cars" });
  }
};


export default CarCltr;

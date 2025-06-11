export const CarSchemaValidation = {
  carName: {
    in: ["body"],
    exists: { errorMessage: "Car name is required" },
    notEmpty: { errorMessage: "Car name cannot be empty" },
    isString: { errorMessage: "Car name must be a string" },
    trim: true,
  },
  brand: {
    in: ["body"],
    exists: { errorMessage: "Brand is required" },
    notEmpty: { errorMessage: "Brand cannot be empty" },
    isString: { errorMessage: "Brand must be a string" },
    trim: true,
  },
  model: {
    in: ["body"],
    exists: { errorMessage: "Model is required" },
    notEmpty: { errorMessage: "Model should not be empty" },
    isString: { errorMessage: "Model must be a string" },
    trim: true,
  },
  year: {
    in: ["body"],
    isInt: {
      options: {
        min: 1886,
        max: new Date().getFullYear()
      },
      errorMessage: `Year must be between 1886 and ${new Date().getFullYear()}`
    },
    toInt: true,
  },
  fuel_type: {
    in: ["body"],
    isIn: {
      options: [["petrol", "diesel", "ev"]],
      errorMessage: "Fuel type must be one of petrol, diesel, or EV",
    },
  },
  transmission: {
    in: ["body"],
    isIn: {
      options: [["manual", "automatic"]],
      errorMessage: "Transmission must be either manual or automatic",
    },
  },
  seats: {
    in: ["body"],
    isInt: {
      options: { min: 1 },
      errorMessage: "Seats must be at least 1",
    },
    toInt: true,
  },
  price_Per_Hour: {
    in: ["body"],
    isFloat: {
      options: { min: 0 },
      errorMessage: "Price per hour must be a positive number",
    },
    toFloat: true,
  },
  price_Per_Day: {
    in: ["body"],
    isFloat: {
      options: { min: 0 },
      errorMessage: "Price per day must be a positive number",
    },
    toFloat: true,
  },
  // location: {
  //   in: ["body"],
  //   custom: {
  //     options: (value) => {
  //       if (
  //         typeof value !== "object" ||
  //         value.type !== "Point" ||
  //         !Array.isArray(value.coordinates) ||
  //         value.coordinates.length !== 2
  //       ) {
  //         throw new Error("Location must be a GeoJSON Point with [longitude, latitude]");
  //       }

  //       const [lng, lat] = value.coordinates;
  //       if (
  //         typeof lng !== "number" ||
  //         typeof lat !== "number" ||
  //         lng < -180 || lng > 180 ||
  //         lat < -90 || lat > 90
  //       ) {
  //         throw new Error("Coordinates must be valid longitude and latitude numbers");
  //       }

  //       return true;
  //     },
  //   },
  // },
  images: {
    in: ["body"],
    optional: true,
    isString: { errorMessage: "Images must be a string (URL or filename)" },
    trim: true,
  },
  gpsTrack: {
    in: ["body"],
    optional: true,
    isBoolean: { errorMessage: "gpsTrack must be a boolean" },
    toBoolean: true,
  },
  availability: {
    in: ["body"],
    optional: true,
    isBoolean: { errorMessage: "Availability must be a boolean" },
    toBoolean: true,
  },
};

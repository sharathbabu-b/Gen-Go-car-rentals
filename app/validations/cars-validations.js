import Cars from "../models/carModels.js";
export const CarSchemaValidation={
    carName:{
        in:["body"],
        exists:{
            errorMessage:"Car name is required"
        },
        notEmpty:{
            errorMessage:"Car name cannot be empty"
        },
        isString:{
            errorMessage:"Car name must be a string"
        },
        trim:true,
        
    },
    brand:{
        in:["body"],
        exists:{errorMessage:"brand is required"},
        isString:{
            errorMessage:"brand name must be string"
        },
        notEmpty:{
            errorMessage:"Brand cannot be empty"
        },
        trim:true
    },
    model:{
        in:["body"],
        exists:{
            errorMessage:"Model is required"
        },
        isString:{
            errorMessage:"Model must be in string"
        },
        notEmpty:{
            errorMessage:"Model should not be empty"
        },
        trim:true,
    },
    year:{
        in:["body"],
        isInt:{
            options:{
                min:1886,max:new Date().getFullYear()
            },
            errorMessage:1`Year must be between 1886 and ${new Date().getFullYear()}`
        },
        toInt:true
    },
    fuel_type:{
        in:["body"],
        isIn:{
            options:[["petrol","diesel","ev"]],
            errorMessage:"Fuel type must be one of petrol, diesel, or EV"
        },
    },
    transmission: {
        in: ['body'],
        isIn: {
          options: [['manual', 'automatic']],
          errorMessage: 'Transmission must be either manual or automatic',
        },
      },
      seats: {
        in: ['body'],
        isInt: {
          options: { min: 1 },
          errorMessage: 'Seats must be at least 1',
        },
        toInt: true,
      },
      price_Per_Hour: {
        in: ['body'],
        isFloat: {
          options: { min: 0 },
          errorMessage: 'Price per hour must be a positive number',
        },
        toFloat: true,
      },
      price_Per_Day: {
        in: ['body'],
        isFloat: {
          options: { min: 0 },
          errorMessage: 'Price per day must be a positive number',
        },
        toFloat: true,
      },

}
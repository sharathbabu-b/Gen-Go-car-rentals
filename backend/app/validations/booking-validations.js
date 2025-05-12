import Booking from "../models/bookingModels.js"
export const bookingValidationSchema={
    userId: {
        in: ['body'],
        exists: {
          errorMessage: 'User ID is required'
        },
        notEmpty: {
          errorMessage: 'User ID cannot be empty'
        },
        isMongoId: {
          errorMessage: 'Invalid User ID'
        },
      },
      carId: {
        in: ['body'],
        exists: {
          errorMessage: 'Car ID is required'
        },
        notEmpty: {
          errorMessage: 'Car ID cannot be empty'
        },
        isMongoId: {
          errorMessage: 'Invalid Car ID'
        },
      },
      pickup_Location: {
        in: ['body'],
        exists: {
          errorMessage: 'Pickup location is required'
        },
        notEmpty: {
          errorMessage: 'Pickup location cannot be empty'
        }
      },
      dropoff_Location: {
        in: ['body'],
        exists: {
          errorMessage: 'Dropoff location is required'
        },
        notEmpty: {
          errorMessage: 'Dropoff location cannot be empty'
        }
      },
      startDate: {
        in: ['body'],
        exists: {
          errorMessage: 'Start date is required'
        },
        notEmpty: {
          errorMessage: 'Start date cannot be empty'
        },
        isISO8601: {
          errorMessage: 'Start date must be a valid ISO 8601 date'
        },
        toDate: true
      },
      endDate: {
        in: ['body'],
        exists: {
          errorMessage: 'End date is required'
        },
        notEmpty: {
          errorMessage: 'End date cannot be empty'
        },
        isISO8601: {
          errorMessage: 'End date must be a valid ISO 8601 date'
        },
        toDate: true,
        custom: {
          options: (value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
              throw new Error('End date must be after start date');
            }
            return true;
          }
        }
      },
      totalPrice: {
        in: ['body'],
        exists: {
          errorMessage: 'Total price is required'
        },
        isFloat: {
          options: { gt: 0 },
          errorMessage: 'Total price must be greater than 0'
        }
      },
      paymentStatus: {
        in: ['body'],
        optional: true,
        isIn: {
          options: [['pending', 'paid', 'failed']],
          errorMessage: 'Invalid payment status'
        }
      },
      bookingStatus: {
        in: ['body'],
        optional: true,
        isIn: {
          options: [['booked', 'cancelled', 'completed']],
          errorMessage: 'Invalid booking status'
        }
      },
}
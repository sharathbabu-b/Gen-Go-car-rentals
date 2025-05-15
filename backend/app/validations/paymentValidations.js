import Payment from "../models/paymentModels.js"
export const createPaymentValidation = {
    bookingId: {
      in: ['body'],
      exists: { errorMessage: 'bookingId is required' },
      notEmpty: { errorMessage: 'bookingId cannot be empty' },
      isMongoId: { errorMessage: 'bookingId must be a valid MongoDB ObjectId' }
    },
    userId: {
      in: ['body'],
      exists: { errorMessage: 'userId is required' },
      notEmpty: { errorMessage: 'userId cannot be empty' },
      isMongoId: { errorMessage: 'userId must be a valid MongoDB ObjectId' }
    },
    carId: {
      in: ['body'],
      exists: { errorMessage: 'CarID is required' },
      notEmpty: { errorMessage: 'Car ID cannot be empty' },
      isMongoId: { errorMessage: 'Car ID must be a valid MongoDB ObjectId' }
    },
    amount: {
      in: ['body'],
      exists: { errorMessage: 'Amount is required' },
      notEmpty: { errorMessage: 'Amount cannot be empty' },
      isFloat: {
        options: { min: 1 },
        errorMessage: 'Amount must be a number greater than 0'
      }
    },
    paymentMethod: {
      in: ['body'],
      exists: { errorMessage: 'Payment method is required' },
      notEmpty: { errorMessage: 'Payment method cannot be empty' },
      isIn: {
        options: [['razorpay', 'stripe', 'bank_transfer']],
        errorMessage: 'Invalid payment method'
      }
    }
  };
import Review from "../models/reviewModels";
export const createReviewValidation = {
    carId: {
      in: ['body'],
      exists: { errorMessage: 'carId is required' },
      notEmpty: { errorMessage: 'carId cannot be empty' },
      isMongoId: { errorMessage: 'carId must be a valid MongoDB ObjectId' }
    },
    user: {
      in: ['body'],
      exists: { errorMessage: 'User is required' },
      notEmpty: { errorMessage: 'User cannot be empty' },
      isMongoId: { errorMessage: 'User must be a valid MongoDB ObjectId' }
    },
    rating: {
      in: ['body'],
      exists: { errorMessage: 'Rating is required' },
      isInt: {
        options: { min: 1, max: 5 },
        errorMessage: 'Rating must be an integer between 1 and 5'
      }
    },
    comment: {
      in: ['body'],
      optional: true,
      isString: { errorMessage: 'Comment must be a string' },
      isLength: {
        options: { max: 1000 },
        errorMessage: 'Comment can be at most 1000 characters'
      },
      trim: true
    }
  };
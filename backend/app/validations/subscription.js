import Subscription from "../models/subscriptionModels.js";
export const SubscriptionSchemaValidation = {
  userId: {
    in: ["body"],
    exists: { errorMessage: "User ID is required" },
    isMongoId: { errorMessage: "Invalid user ID format" },
  },

  UpgradePlan: {
    in: ["body"],
    exists: { errorMessage: "Upgrade plan is required" },
    isIn: {
      options: [["Basic", "Premium", "Platinum"]],
      errorMessage: "Upgrade plan must be Basic, Premium, or Platinum",
    },
  },

  price: {
    in: ["body"],
    exists: { errorMessage: "Price is required" },
    isFloat: {
      options: { min: 0 },
      errorMessage: "Price must be a non-negative number",
    },
    toFloat: true,
  },

  start_date: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "Start date must be a valid ISO 8601 date",
    },
    toDate: true,
  },

  end_date: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "End date must be a valid ISO 8601 date",
    },
    toDate: true,
  },

  isActive: {
    in: ["body"],
    optional: true,
    isBoolean: { errorMessage: "isActive must be a boolean value" },
    toBoolean: true,
  },
};

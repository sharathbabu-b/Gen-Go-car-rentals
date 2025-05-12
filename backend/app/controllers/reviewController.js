import Review from "../models/reviewModels.js";
import { validationResult } from "express-validator";

const reviewCtrl = {};

// 1. Create Review
reviewCtrl.createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { car, user, rating, comment } = req.body;
  try {
    const existingReview = await Review.findOne({ car, user });
    if (existingReview) return res.status(400).json({ error: "You have already reviewed this car" });

    const newReview = await Review.create({ car, user, rating, comment });
    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// 2. Get All Reviews for a Car
reviewCtrl.getCarReviews = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const carId = req.params.id;
  try {
    const reviews = await Review.find({ car: carId })
      .populate("user", "name email")
      .populate("car", "carName");
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch car reviews" });
  }
};

// 3. Get All Reviews by a User
reviewCtrl.getUserReviews = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const userId = req.params.id;
  try {
    const reviews = await Review.find({ user: userId })
      .populate("car", "carName");
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch user reviews" });
  }
};

// 4. Delete Review
reviewCtrl.deleteReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const reviewId = req.params.id;
  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.user.toString() === req.userId || req.role === "admin") {
      await review.deleteOne();
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(403).json({ error: "Unauthorized to delete this review" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

// 5. Update Review
reviewCtrl.updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const reviewId = req.params.id;
  const { rating, comment } = req.body;
  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.user.toString() !== req.userId && req.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized to update this review" });
    }

    review.rating = rating;
    review.comment = comment;
    const updated = await review.save();

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update review" });
  }
};

export default reviewCtrl;

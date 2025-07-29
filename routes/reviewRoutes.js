// routes/reviews.route.js
import express from "express";
import Review from "../models/review.model.js";

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// Add a review
router.post("/", async (req, res) => {
  try {
    const { text, rating } = req.body;
    const newReview = new Review({ text, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit review" });
  }
});

export default router;

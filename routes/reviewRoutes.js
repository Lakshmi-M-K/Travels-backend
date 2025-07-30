// routes/reviews.route.js
import express from "express";
import Review from "../models/review.model.js";

const router = express.Router();

// ✅ GET all reviews (latest first)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// ✅ POST a new review
router.post("/", async (req, res) => {
  try {
    const { text, rating } = req.body;

    // ⚠️ Basic validation
    if (!text || !rating) {
      return res.status(400).json({ message: "Text and rating are required" });
    }

    const newReview = new Review({
      text,
      rating,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ message: "Failed to submit review" });
  }
});

export default router;

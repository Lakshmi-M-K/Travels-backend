// models/review.model.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);

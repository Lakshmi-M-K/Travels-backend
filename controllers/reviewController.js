import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

const createReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const tourId = req.params.tourId;

    // Validate required fields
    if (!tourId || !rating) {
      return res
        .status(400)
        .json({ message: "Tour ID and rating are required" });
    }

    // Find the corresponding tour
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // ✅ Get username from logged-in user
    const username = req.user?.username || "Anonymous";

    // Create a new review
    const newReview = new Review({
      tourId,
      reviewText,
      rating,
      username,
    });

    await newReview.save();

    // Update the tour with the new review
    tour.reviews.push(newReview._id);
    await tour.save();

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    if (!reviewId) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Also remove the review from the tour's reviews array
    await Tour.updateOne(
      { reviews: reviewId },
      { $pull: { reviews: reviewId } }
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createReview, deleteReview };

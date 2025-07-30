import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const API_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/reviews";
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        "https://travels-backend-production-479b.up.railway.app/api/reviews"
      );
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async () => {
    if (!newReview.trim()) return toast.error("Enter a review!");
    if (rating === 0) return toast.error("Select a star rating!");

    try {
      const res = await axios.post(
        "https://travels-backend-production-479b.up.railway.app/api/reviews",
        {
          text: newReview,
          rating,
        }
      );

      setReviews([res.data, ...reviews]);
      setNewReview("");
      setRating(0);
      setHover(0);
      toast.success("Review submitted!");
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <section className="py-8 px-6 md:px-12 bg-[#f9f9f9]">
      <div className="text-center mb-8">
        <h1 className="text-[33px] md:text-[40px] font-open sans font-bold mb-2">
          Our <span className="text-BaseColor">Reviews</span>
        </h1>
        <p className="text-lg font-paraFont font-bold text-gray-800">
          Read what our travelers have to say in their own words.
        </p>
      </div>

      <div className="max-w-3xl mx-auto p-4 rounded-lg shadow-lg bg-white mb-8">
        <h2 className="text-xl font-semibold mb-3">Write a Review</h2>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here..."
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#fa7436]"
        />

        {/* Star Selection */}
        <div className="flex items-center gap-2 mt-3">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={starValue}
                  onClick={() => setRating(starValue)}
                />
                <FaStar
                  size={24}
                  className={`cursor-pointer transition-colors ${
                    starValue <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>

        <button
          onClick={handleReviewSubmit}
          className="mt-4 bg-[#8B0000] text-white py-2 px-6 rounded hover:bg-[#e0672f] transition"
        >
          Submit Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="w-[280px] p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <p className="text-gray-800 mb-1">{review.text}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={18}
                    className={`${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>
    </section>
  );
};

export default Reviews;

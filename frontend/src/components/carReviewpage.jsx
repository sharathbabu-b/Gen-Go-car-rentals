import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddReviewForm = () => {
  const { carId } = useParams();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Fetch existing reviews for this car
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/reviewcars/${id}'`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  useEffect(() => {
    if (carId) fetchReviews();
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post("/reviews", {
        car: carId,
        user: "userId-from-context-or-auth",  // Replace with your logged-in user ID
        rating: Number(rating),
        comment,
      });
      setRating("");
      setComment("");
      fetchReviews();
      alert("Review submitted!");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Review for Car ID: {carId}</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <label>
          Rating (1-5):{" "}
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Comment:
          <br />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            cols={40}
            placeholder="Write your review here..."
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      <h3>Existing Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((r) => (
        <div key={r._id} style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
          <p><b>User:</b> {r.user?.name || r.user}</p>
          <p><b>Rating:</b> {r.rating}</p>
          <p><b>Comment:</b> {r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default AddReviewForm;

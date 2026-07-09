import { useState } from "react";
import RatingSelector from "../Rating/RatingSelector";

import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

type AddReviewProps = {
  isOpen: boolean;
};

function AddReview({ isOpen }: AddReviewProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-tertiary text-primary border-x-3 border-primary p-4">
      <RatingSelector rating={rating} setRating={setRating} />

      <label htmlFor="review" className="block mb-2 font-semibold">
        Review
      </label>

      <div className="relative">
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={6}
          placeholder="Write your review..."
          className="w-full rounded border-4 border-secondary p-2 pr-10 resize-none focus:outline-none focus:ring-0"
        />
        <div className="mt-2 flex justify-end">
          <span className="text-sm text-primary">{review.length}/1000</span>
        </div>

        <button
          type="button"
          className="absolute top-0 right-0 p-2 bg-secondary rounded text-tertiary hover:text-primary"
        >
          <ImCross size={10} />
        </button>
      </div>

      <button
        type="button"
        disabled={rating === 0 || review.trim() === ""}
        className="
          bg-primary
          text-tertiary
          px-4
          py-2
          rounded
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Submit
      </button>
    </div>
  );
}

export default AddReview;

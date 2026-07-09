import { useState } from "react";
import RatingSelector from "../Rating/RatingSelector";

import { ImCross } from "react-icons/im";

type AddReviewProps = {
  isOpen: boolean;
  onSubmit: (rating: number, review: string) => void;
};

function AddReview({ isOpen, onSubmit }: AddReviewProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const MAX_REVIEW_LENGTH = 1000;

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
          maxLength={MAX_REVIEW_LENGTH}
          onChange={(e) => setReview(e.target.value)}
          rows={6}
          placeholder="Write your review..."
          className="text-primary w-full rounded border-4 border-secondary p-2 pr-10 resize-none focus:outline-none focus:ring-0"
        />
        <div className="absolute bottom-0 right-0 px-7 py-4 flex justify-end">
          <span className="text-sm text-secondary">
            {review.length}/{MAX_REVIEW_LENGTH}
          </span>
        </div>

        <button
          type="button"
          className="absolute top-0 right-0 p-2 bg-secondary rounded text-tertiary hover:text-primary"
          onClick={() => setReview("")}
        >
          <ImCross size={10} />
        </button>
      </div>

      <button
        type="button"
        disabled={rating === 0 || review.trim() === ""}
        onClick={() => onSubmit(rating, review)}
        className="
          bg-primary
          text-tertiary
          px-4
          py-2
          rounded
          disabled:bg-secondary
          disabled:cursor-not-allowed
        "
      >
        Submit
      </button>
    </div>
  );
}

export default AddReview;

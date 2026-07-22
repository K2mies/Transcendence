import { useEffect, useState } from "react";
import RatingSelector from "../Rating/RatingSelector";
import PlatformSelector from "./PlatformSelector";
import { ImCross } from "react-icons/im";
import type { Review as ReviewType } from "../Types/ReviewType";

type AddReviewProps = {
  isOpen: boolean;
  gameName: string;
  gamePlatforms: string[];
  reviewToEdit: ReviewType | null;
  onCancel: () => void;
  onSubmit: (
    rating: number,
    review: string,
    platform: string | null,
  ) => Promise<boolean>;
};

function AddReview({
  isOpen,
  gameName,
  gamePlatforms,
  reviewToEdit,
  onSubmit,
  onCancel,
}: AddReviewProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating);
      setReview(reviewToEdit.review);
      setPlatform(reviewToEdit.platform ?? null);
    } else {
      setRating(0);
      setReview("");
      setPlatform(null);
    }
  }, [reviewToEdit]);

  async function handleSubmit() {
    const success = await onSubmit(rating, review, platform);

    if (success) {
      setRating(0);
      setReview("");
      setPlatform(null);
    }
  }

  const MAX_REVIEW_LENGTH = 1000;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-tertiary text-primary border-x-3 border-primary p-4">
      <RatingSelector rating={rating} setRating={setRating} size={28} />

      <div className="flex justify-between items-center mb-2">
        <div>
          <label htmlFor="review" className="font-semibold">
            Review : {gameName}
          </label>
        </div>

        <div className="flex items-center gap-2">
          <PlatformSelector
            platform={platform}
            setPlatform={setPlatform}
            platforms={gamePlatforms}
          />
        </div>
      </div>
      <div className="relative">
        <textarea
          id="review"
          value={review}
          maxLength={MAX_REVIEW_LENGTH}
          onChange={(e) => setReview(e.target.value)}
          rows={6}
          placeholder="Write your review (optional)..."
          className="text-primary w-full rounded border-4 border-secondary p-2 pr-10 resize-none focus:outline-none focus:ring-0"
        />
        <div className="absolute bottom-0 right-0 px-7 py-4 flex justify-end">
          <span className="text-sm text-primary">
            {review.length}/{MAX_REVIEW_LENGTH}
          </span>
        </div>

        <div className="absolute top-2 right-2 flex gap-2">
          <button
            type="button"
            aria-label="Clear review text"
            className="text-secondary hover:text-primary"
            onClick={() => setReview("")}>
            <ImCross size={14} />
          </button>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          disabled={rating === 0}
          onClick={handleSubmit}
          className="
             bg-secondary
             text-primary
             px-4
             py-2
             rounded
             disabled:bg-secondary
             disabled:cursor-not-allowed
           "
        >
          {reviewToEdit ? "Update" : "Submit"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-secondary text-primary px-4 py-2 rounded hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddReview;

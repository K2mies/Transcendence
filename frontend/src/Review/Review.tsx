import { Link } from "react-router-dom";
import Stars from "../Rating/Stars";
import type { Review as ReviewType } from "../Types/ReviewType";
import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import PlatformIcon from "./PlatformIcon";

type ReviewProps = {
  review: ReviewType;
  page: "game" | "profile";
  isMyReview: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
};

function Review({ review, page, isMyReview, onDelete, onEdit }: ReviewProps) {
  return (
    <li className="relative list-none m-8 border-3 border-secondary p-2 rounded-lg">
      <div className="flex items-center">
        {page === "profile" && (
          <Link to={`/game/${review.game}`}>{review.game}</Link>
        )}

        {page === "game" && (
          <Link to={`/user/${review.user.name}`}>{review.user.name}</Link>
        )}

        <div className="flex px-5 mt-1">
          <Stars rating={review.rating} size={16} />
        </div>

        {isMyReview && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              aria-label="Edit review"
              onClick={onEdit}
              className="text-secondary hover:text-primary">
              <FaEdit size={18} />
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="text-secondary hover:text-primary"
            >
              <ImCross size={14} />
            </button>
          </div>
        )}
      </div>
      {review.platform && (
        <div className="mt-2 flex items-center gap-2 text-secondary font-bold">
          <span>{review.platform}</span>
          <PlatformIcon platform={review.platform} size={18} />
        </div>
      )}
      <p className="text-left mt-3 whitespace-pre-wrap break-words">
        {review.review}
      </p>
    </li>
  );
}

export default Review;

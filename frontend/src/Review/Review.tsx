import { Link } from "react-router-dom";
import Stars from "../Rating/Stars";
import type { Review as ReviewType } from "../Types/ReviewType";
import { ImCross } from "react-icons/im";

type ReviewProps = {
  review: ReviewType;
  page: "game" | "profile";
  isMyReview: boolean;
  onDelete?: () => void;
};

function Review({ review, page, isMyReview, onDelete }: ReviewProps) {
  return (
    <li className="relative list-none m-8 border-3 border-secondary p-2 rounded-lg">
      <div className="flex flex-row">
        {page === "profile" && (
          <Link to={`/game/${review.game}`}>{review.game}</Link>
        )}

        {page === "game" && (
          <Link to={`/user/${review.user.name}`}>{review.user.name}</Link>
        )}

        <div className="flex px-5 mt-1">
          <Stars rating={review.rating} size={16} />
        </div>
        {isMyReview && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="absolute top-0 right-0  p-1 bg-secondary ml-auto text-tertiary rounded-tr-sm rounded-bl-sm hover:text-primary transition-colors"
          >
            <ImCross size={10} />
          </button>
        )}
      </div>

      <p className="text-left mt-3">{review.review}</p>
    </li>
  );
}

export default Review;

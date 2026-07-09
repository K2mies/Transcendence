import { Link } from "react-router-dom";
import Stars from "../Rating/Stars";
import type { Review as ReviewType } from "../Types/ReviewType";

type ReviewProps = {
  review: ReviewType;
  page: "game" | "profile";
};

function Review({ review, page }: ReviewProps) {
  return (
    <li className="list-none m-8">
      <div className="flex flex-row">
        {page === "profile" && (
          <Link to={`/game/${review.game}`}>{review.game}</Link>
        )}

        {page === "game" && (
          <Link to={`/user/${review.user.name}`}>{review.user.name}</Link>
        )}

        <div className="flex px-5">
          <Stars rating={review.rating} size={16} />
        </div>
      </div>

      <p className="text-left mt-3">{review.review}</p>
    </li>
  );
}

export default Review;

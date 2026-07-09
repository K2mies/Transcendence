import { useState } from "react";
import type { Review as ReviewType } from "../Types/ReviewType";
import Review from "./Review";
import AddReview from "./AddReview";

type ReviewsProps = {
  page: "game" | "profile";
  myCurrUser: string | null | undefined;
  reviews: ReviewType[];
  reviewAverage?: number;
  rating?: number;
};

function Reviews({
  page,
  myCurrUser,
  reviews,
  reviewAverage,
  rating,
}: ReviewsProps) {
  let addMyReview: boolean;

  if (page === "game" && myCurrUser) {
    const findMyReview = reviews.find((r) => r.user.name === myCurrUser);
    addMyReview = !findMyReview;
  } else {
    addMyReview = false;
  }

  const [showAddReview, setShowAddReview] = useState(false);

  return (
    <div>
      <div className="flex bg-primary text-tertiary mt-6 p-4 rounded-t-lg justify-between">
        <div className="flex align-text-bottom">
          <h3 className="mr-20">Reviews</h3>
          {page === "game" && (
            <div className="text-md flex gap-x-8">
              {reviews.length > 0 && reviewAverage !== undefined && (
                <p className="text-md">
                  GoodPlays community rating: {reviewAverage}/5
                </p>
              )}

              {rating !== undefined && (
                <p className="text-md">IGDB community rating: {rating}/5</p>
              )}
            </div>
          )}
        </div>

        {addMyReview && (
          <button onClick={() => setShowAddReview((show) => !show)}>
            {showAddReview ? "Cancel" : "Add review"}
          </button>
        )}
      </div>
      <AddReview
        isOpen={showAddReview}
        onSubmit={(rating, review) => {
          console.log(rating);
          console.log(review);
        }}
      />

      <ul className="bg-tertiary text-primary border-primary border-3 rounded-b-lg">
        {reviews.map((review) => (
          <Review key={review.id} review={review} page={page} />
        ))}
      </ul>
    </div>
  );
}

export default Reviews;

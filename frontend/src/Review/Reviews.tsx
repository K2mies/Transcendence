import { useState } from "react";
import type { Review as ReviewType } from "../Types/ReviewType";
import Review from "./Review";
import AddReview from "./AddReview";

type ReviewsProps = {
  page: "game" | "profile";
  gameName?: string;
  gamePlatforms?: string[];
  myCurrUser: string | null | undefined;
  reviews: ReviewType[];
  setReviews?: React.Dispatch<React.SetStateAction<ReviewType[]>>;
  onDeleteReview?: (review: ReviewType) => void;

  reviewAverage?: number;
  rating?: number;
};

function Reviews({
  page,
  gameName,
  gamePlatforms,
  myCurrUser,
  reviews,
  setReviews,
  onDeleteReview,
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
  const [editingReview, setEditingReview] = useState<ReviewType | null>(null);
  const [editingPlatforms, setEditingPlatforms] = useState<string[]>([]);

  async function submitReview(
    rating: number,
    review: string,
    platform: string | null,
  ) {
    const targetGame = editingReview?.game ?? gameName;

    if (!targetGame) return false;

    const response = await fetch(
      `http://localhost:4243/game/${encodeURIComponent(targetGame)}/add-review`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          review,
          platform,
        }),
      },
    );
    const newReview = await response.json();

    if (response.ok && setReviews) {
      if (editingReview) {
        setReviews((reviews) =>
          reviews.map((review) =>
            review.id === newReview.id ? newReview : review,
          ),
        );

        setEditingReview(null);
      } else {
        setReviews((reviews) => [newReview, ...reviews]);
      }

      setShowAddReview(false);

      return true;
    }

    return false;
  }
  function editReview(review: ReviewType) {
    setEditingReview(review);

    if (page === "profile") {
      setEditingPlatforms(review.platforms ?? []);
    } else {
      setEditingPlatforms(gamePlatforms ?? []);
    }

    setShowAddReview(true);
  }

  function closeReviewForm() {
    setEditingReview(null);
    setShowAddReview(false);
  }

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
          <button
            onClick={() => {
              setEditingReview(null);
              setShowAddReview(true);
            }}
          >
            Add review
          </button>
        )}
      </div>
      <AddReview
        isOpen={showAddReview}
        gameName={editingReview?.game ?? gameName ?? ""}
        reviewToEdit={editingReview}
        gamePlatforms={editingReview ? editingPlatforms : (gamePlatforms ?? [])}
        onSubmit={submitReview}
        onCancel={closeReviewForm}
      />

      <ul className="bg-tertiary text-primary border-primary border-3 rounded-b-lg max-h-[400px] overflow-y-auto">
        {reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
            page={page}
            isMyReview={review.user.name === myCurrUser}
            onEdit={() => editReview(review)}
            onDelete={onDeleteReview ? () => onDeleteReview(review) : undefined}
          />
        ))}
      </ul>
    </div>
  );
}

export default Reviews;

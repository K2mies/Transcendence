import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginationControls from "../Games/PaginationControls";
import type { Review } from "../../Types/ReviewType";

const PAGE_SIZE = 10;

function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewerSearch, setReviewerSearch] = useState("");
  const [gameSearch, setGameSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadReviews() {
      const response = await fetch("/api/admin/reviews", {
        credentials: "include",
      });

      if (response.status === 200) {
        const result = await response.json();
        setReviews(result.data);
      } else {
        toast.custom(() => (
          <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
            <div className="flex items-center gap-2">
              Failed to display reviews. Please try again.
            </div>
          </div>
        ));
      }
    }

    loadReviews();
  }, []);

  async function deleteReview(id: number) {
    if (!window.confirm("Delete this review? This cannot be undone.")) {
      return;
    }

    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } else {
      toast.custom(() => (
        <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
          <div className="flex items-center gap-2">
            Failed to delete review. Please try again.
          </div>
        </div>
      ));
    }
  }

  const filteredReviews = reviews.filter(
    (review) =>
      review.user.name.toLowerCase().includes(reviewerSearch.toLowerCase()) &&
      (review.game ?? "").toLowerCase().includes(gameSearch.toLowerCase()),
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const diff =
      new Date(a.createdAt ?? "").getTime() -
      new Date(b.createdAt ?? "").getTime();
    return sortAsc ? diff : -diff;
  });

  const totalPages = Math.max(1, Math.ceil(sortedReviews.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedReviews = sortedReviews.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const columns =
    "grid-cols-[minmax(100px,1fr)_minmax(100px,1fr)_70px_minmax(200px,2fr)_110px_90px]";

  return (
    <div className="mb-6">
      <div className="bg-primary text-tertiary flex items-center justify-between rounded-t-lg py-2 px-5">
        <span className="font-bold">Reviews</span>
        <div className="flex gap-2">
          <input
            type="text"
            value={reviewerSearch}
            onChange={(e) => {
              setReviewerSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by reviewer..."
            className="rounded px-2 py-1 text-sm text-primary bg-tertiary"
          />
          <input
            type="text"
            value={gameSearch}
            onChange={(e) => {
              setGameSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by game..."
            className="rounded px-2 py-1 text-sm text-primary bg-tertiary"
          />
        </div>
      </div>

      <div className="bg-tertiary text-primary border-primary border-3 overflow-hidden">
        <div
          className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-2 px-5 font-bold text-sm`}
        >
          <span>Reviewer</span>
          <span>Game</span>
          <span>Rating</span>
          <span>Review</span>
          <button
            type="button"
            onClick={() => setSortAsc((prev) => !prev)}
            className="font-bold"
          >
            Posted {sortAsc ? "▲" : "▼"}
          </button>
          <span />
        </div>

        {pagedReviews.map((review) => (
          <div
            key={review.id}
            className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-3 px-5 last:border-b-0`}
          >
            <Link
              to={`/user/${review.user.name}#reviews`}
              className="text-sm no-underline text-primary truncate"
            >
              {review.user.name}
            </Link>

            {review.game ? (
              <Link
                to={`/game/${encodeURIComponent(review.game)}`}
                className="text-sm no-underline text-primary truncate"
              >
                {review.game}
              </Link>
            ) : (
              <span className="text-sm">—</span>
            )}

            <span className="text-sm">{review.rating}</span>

            <Link
              to={`/user/${review.user.name}#reviews`}
              className="text-sm no-underline text-primary truncate min-w-0 w-full"
            >
              {review.review}
            </Link>

            <span className="text-sm">
              {new Date(review.createdAt ?? "").toLocaleDateString("fi-FI")}
            </span>

            <button type="button" onClick={() => deleteReview(review.id)}>
              Delete
            </button>
          </div>
        ))}

        {Array.from({ length: PAGE_SIZE - pagedReviews.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-3 px-5 last:border-b-0`}
            aria-hidden="true"
          >
            <span>&nbsp;</span>
          </div>
        ))}
      </div>

      <PaginationControls
        page={currentPage}
        totalPages={totalPages}
        onPrevious={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        onPageChange={setPage}
        className="rounded-b-lg"
      />
    </div>
  );
}

export default AdminReviews;

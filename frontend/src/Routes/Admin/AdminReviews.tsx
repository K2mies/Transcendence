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
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    async function loadReviews() {
      const response = await fetch("http://localhost:4243/admin/reviews", {
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

    const response = await fetch(`http://localhost:4243/admin/reviews/${id}`, {
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

  useEffect(() => {
    const count = filteredReviews.length;
  
    setAnnouncement(
      count === 0
        ? "No reviews found"
        : count === 1
          ? "1 review found"
          : `${count} reviews found`,
    );
  }, [filteredReviews.length]);

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
        <h2 className="text-[1.4rem] font-bold">Reviews</h2>
        <div className="flex gap-2">
          <label htmlFor="admin-reviewer-search" className="sr-only">
            Search for a review by reviewer
          </label>
          <input
            id="admin-reviewer-search"
            type="text"
            value={reviewerSearch}
            onChange={(e) => {
              setReviewerSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by reviewer..."
            className="rounded px-2 py-1 text-sm text-primary bg-tertiary"
          />
          <label htmlFor="admin-game-search" className="sr-only">
            Search for a review by game
          </label>
          <input
            id="admin-game-search"
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

      <p aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</p>

      <table className="bg-tertiary text-primary border-primary border-3 overflow-hidden w-full">
        <caption className="sr-only">Reviews</caption>
        <tr
          className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-2 px-5 font-bold text-sm`}
        >
          <th>Reviewer</th>
          <th>Game</th>
          <th>Rating</th>
          <th>Review</th>
          <th>
            <span className="sr-only">Date of post</span>
            <button
              type="button"
              onClick={() => setSortAsc((prev) => !prev)}
              className="font-bold"
              aria-label={sortAsc ? "Change to descending sorting" : "Change to ascending sorting"}
            >
              <span aria-hidden="true">Posted {sortAsc ? "▲" : "▼"}</span>
            </button>
          </th>
          <th>Delete?</th>
        </tr>

        {pagedReviews.map((review) => (
          <tr>
            <div
              key={review.id}
              className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-3 px-5 last:border-b-0`}
            >
              <td>
                <Link
                  to={`/user/${review.user.name}#reviews`}
                  className="text-sm no-underline text-primary truncate"
                >
                  {review.user.name}
                </Link>
              </td>

              {review.game && (
                <>
                  <td>
                    <Link
                      to={`/game/${encodeURIComponent(review.game)}`}
                      className="text-sm no-underline text-primary truncate"
                    >
                      {review.game}
                    </Link>
                  </td>

                  <td>
                    <span className="text-sm">{review.rating}</span>
                  </td>

                  <td className="truncate min-w-0 w-full">
                    <Link
                      to={`/game/${encodeURIComponent(review.game)}#reviews`}
                      className="text-sm no-underline text-primary"
                    >
                      {review.review}
                    </Link>
                  </td>
                </>
              )}

              <td>
                <span className="text-sm">
                  {new Date(review.createdAt ?? "").toLocaleDateString("fi-FI")}
                </span>
              </td>

              <td>  
                <button type="button" onClick={() => deleteReview(review.id)}>
                  Delete
                </button>
              </td>
            </div>
          </tr>
        ))}

        {Array.from({ length: PAGE_SIZE - pagedReviews.length }).map((_, i) => (
          <tr>
            <div
              key={`empty-${i}`}
              className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-3 px-5 last:border-b-0`}
              aria-hidden="true"
            >
              <span>&nbsp;</span>
            </div>
          </tr>
        ))}
      </table>

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

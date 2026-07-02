import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const ICON_SIZE = 20;

function RatingSystem() {
  return (
    <div className="bg-primary text-tertiary min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          1. IGDB Rating
          <FaStar size={ICON_SIZE} className="ml-3 text-tertiary" />
        </h2>
        <p>
          The IGDB rating is sourced from the IGDB api and set as the default
          rating for each game that has no local user ratings/reviews. You can
          find out more about the IGDB api here{" "}
          <Link
            to="https://www.igdb.com/api"
            className="text-secondary no-underline hover:underline hover:text-tertiary"
          >
            https://www.igdb.com/api{" "}
          </Link>
          by defauly the IGDB rating counts as 1 review.
        </p>
        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          2. Local/User Rating
          <FaHome size={ICON_SIZE} className="ml-3 text-tertiary" />
        </h2>
        <p>
          when the user gives a game a rating this counts as 1 review. This is
          then calculated as an average from all the reviews together. By
          default the IGDB rating counts as 1 rating and each user review counts
          as 1 rating also. These are added together and averaged to give a new
          review score.
        </p>
      </div>
    </div>
  );
}

export default RatingSystem;

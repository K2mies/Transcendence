import { Link } from "react-router-dom";

function Reviews(props) {
  return (
    <div>
      <h3 className="bg-primary text-tertiary mt-[2.5em] p-4 rounded-t-lg">
        Reviews
      </h3>
      <ul className="bg-tertiary text-primary border-primary border-3 rounded-b-lg p-6">
        {props.reviews.map((review) => (
          <li key={review.id} className="list-none">
            <div className="flex flex-row">
              {props.page === "profile" && (
                <Link to={"/game/" + review.game}>{review.game}</Link>
              )}
              {props.page === "game" && (
                <Link to={"/user/" + review.user.name}>{review.user.name}</Link>
              )}
              <p>{review.rating}</p>

              <div className="flex px-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < review.rating
                        ? "/star_full.png"
                        : "/star_empty.png"
                    }
                    alt="star rating"
                    className="w-8 h-auto"
                  />
                ))}
              </div>
            </div>
            <p className="text-left mt-3">{review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;

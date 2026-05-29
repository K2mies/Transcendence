import { Link } from "react-router-dom";

function Reviews(props) {
	return (
        <div>
		  <h3>Reviews</h3>
          <ul>
            {props.reviews.map((review) => (
              <li key={review.id} className="list-none">
				<div className="flex flex-row gap-[3em]">
				  {props.page === "profile" &&
                    <Link to={"/game/" + review.game}>{review.game}</Link>
				  }
				  {props.page === "game" &&
				    <Link to={"/user/" + review.user.name}>{review.user.name}</Link>
                  }
				  <p>{review.rating}</p>
				</div>
				<p className="text-left">{review.review}</p>
              </li>
            ))}
          </ul>
        </div>
	)
}

export default Reviews;

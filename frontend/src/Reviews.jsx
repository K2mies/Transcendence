import { Link } from "react-router-dom";

function Reviews(props) {
	return (
        <div>
		  <h3>Reviews</h3>
          <ul>
            {props.reviews.map((review) => (
              <li key={review.id} className="review-item">
				<div className="review-header">
				  {props.page === "profile" &&
                    <Link to={"/game/" + review.game}>{review.game}</Link>
				  }
				  {props.page === "game" &&
				    <Link to={"/user/" + review.user.name}>{review.user.name}</Link>
                  }
				  <p>{review.rating}</p>
				</div>
				<p className="review-text">{review.review}</p>
              </li>
            ))}
          </ul>
        </div>
	)
}

export default Reviews;

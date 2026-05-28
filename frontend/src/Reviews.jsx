function Reviews(props) {
	return (
        <div>
		  <h3>Reviews</h3>
          <ul>
            {props.reviews.map((review) => (
              <li key={review.id} className="review-item">
				<div className="review-header">
                  <h4>{review.game ? review.game : review.name}</h4>
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

function Reviews(props) {
	return (
        <div>
		  <h3>Reviews</h3>
          <ul>
            {props.reviews.map((review) => (
              <li key={review.id} className="review-item">
				<div className="review-header">
                  <h4>{review.game || review.user.name}</h4>
				  <div>{<Star rating={review.rating} />}</div>
				</div>
				<p className="review-text">{review.review}</p>
              </li>
            ))}
          </ul>
        </div>
	)
}

export default Reviews;

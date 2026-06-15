import { Link } from "react-router-dom";

function Reviews(props) {
  const myUser = localStorage.getItem("user");
  const myUsername = myUser ? JSON.parse(myUser).name : null;
  let addMyReview;
  if (props.page === "game" && myUsername) {
    const findMyReview = props.reviews.find((r) => r.user.name === myUsername);
    addMyReview = findMyReview ? false : true;
  } else {
    addMyReview = true;
  }
  return (
    <div>
      <div className="flex bg-primary text-tertiary mt-6 p-4 rounded-t-lg justify-between">
        <div className="flex align-text-bottom">
          <h3 className="mr-20">Reviews</h3>
          {props.page === "game" && (
            <div className="text-md flex flex-column gap-x-8">
              {props.reviews.length > 0 && (
               <p className=" text-md">GoodPlays community rating: {props.reviewAverage}/5</p>
              )}
              <p className="text-md">IGDB community rating: {props.rating}/5</p>
          </div>
          )}
        </div>
        {addMyReview && <button>Add review</button>}
      </div>
      <ul className="bg-tertiary text-primary border-primary border-3 rounded-b-lg">
        {props.reviews.map((review) => (
          <li key={review.id} className="list-none m-8">
            <div className="flex flex-row">
              {props.page === "profile" && (
                <Link to={"/game/" + review.game}>{review.game}</Link>
              )}
              {props.page === "game" && (
                <Link to={"/user/" + review.user.name}>{review.user.name}</Link>
              )}

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

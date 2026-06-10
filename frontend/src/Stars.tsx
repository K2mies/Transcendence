type StarsProps = {
  rating: number;
};

function Stars({ rating }: StarsProps) {
  return (
    <div className="flex justify-center mb-2">
      {Array.from({ length: 5 }).map((_, index) => {
        let star = "/star_empty.png";

        if (rating >= index + 1) {
          star = "/star_full.png";
        } else if (rating >= index + 0.5) {
          star = "/star_half.png";
        }

        return (
          <img
            key={index}
            src={star}
            alt="star rating"
            className="w-8 h-auto"
          />
        );
      })}
    </div>
  );
}

export default Stars;

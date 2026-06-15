import { PiStar, PiStarFill, PiStarHalfFill } from "react-icons/pi";

type StarsProps = {
  rating: number;
};

function Stars({ rating }: StarsProps) {
  const roundedRating = Math.round(rating * 2) / 2;
  return (
    <div className="flex justify-center gap-1 mb-2">
      {Array.from({ length: 5 }).map((_, index) => {
        if (roundedRating >= index + 1) {
          return <PiStarFill key={index} className="text-secondary text-xl" />;
        }

        if (roundedRating >= index + 0.5) {
          return (
            <PiStarHalfFill key={index} className="text-secondary text-xl" />
          );
        }

        return <PiStar key={index} className="text-secondary text-xl" />;
      })}
    </div>
  );
}

export default Stars;

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { PiStar, PiStarFill, PiStarHalfFill } from "react-icons/pi";

type StarsProps = {
  rating: number;
};

function Stars({ rating }: StarsProps) {
  return (
    <div className="flex justify-center gap-1 mb-2">
      {Array.from({ length: 5 }).map((_, index) => {
        if (rating >= index + 1) {
          return <PiStarFill key={index} className="text-secondary text-xl" />;
        }

        if (rating >= index + 0.5) {
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

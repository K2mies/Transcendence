import { FaStar } from "react-icons/fa";

const ICON_SIZE = 20;

function RatingSystem() {
  return (
    <div className="bg-primary text-tertiary min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          1. Rating System Place Holder
          <FaStar size={ICON_SIZE} className="ml-3 text-tertiary" />
        </h2>
        <p>
          This is placeholder text for the rating systme and how it works place
          information about the rating system clculations here
        </p>
      </div>
    </div>
  );
}

export default RatingSystem;

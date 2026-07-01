import { MdAccessibilityNew } from "react-icons/md";

const ICON_SIZE = 20;

function Accessibility() {
  return (
    <div className="bg-primary text-tertiary min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          1. Accessibility Place Holder
          <MdAccessibilityNew size={ICON_SIZE} className="ml-3 text-tertiary" />
        </h2>
        <p>
          This is placeholder text for accessibility and how it works place
          information about the rating system clculations here
        </p>
      </div>
    </div>
  );
}

export default Accessibility;

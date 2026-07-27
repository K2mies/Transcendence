import { useEffect } from "react";
import { MdAccessibilityNew } from "react-icons/md";

const ICON_SIZE = 20;

function Accessibility() {

  useEffect(() => {
    document.title = "Accessibility | GoodPlays";
  }, []);

  return (
    <div className="bg-primary text-tertiary min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          1. Accessibility
          <MdAccessibilityNew
            size={ICON_SIZE}
            className="ml-3 text-tertiary"
            aria-hidden="true"
            focusable="false"
          />
        </h2>
        <p>
          We want everyone to be able to fully use GoodPlays. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA.
          This site has been tested using using the WAVE extension for Google Chrome, and VoiceOver screen reader on macOS.
          Latest accessibility review: 24th July 2026.

          If you find any accessibility issue, inconvenience, or difficulty using the site, please contact us, and we will try to
          resolve it.
        </p>
      </div>
    </div>
  );
}

export default Accessibility;

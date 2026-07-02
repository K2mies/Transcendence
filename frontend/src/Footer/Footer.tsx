import { Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-primary text-tertiary p-4 text-center">
      <div>
        <Link to="/privacy" className="no-underline text-tertiary">
          Privacy Policy
        </Link>
        <span> - </span>
        <Link to="/terms" className="no-underline text-tertiary">
          Terms of Service
        </Link>
        <span> - </span>
        <Link to="/rating" className="no-underline text-tertiary">
          Rating system
        </Link>
        <span> - </span>
        <Link to="/accessibility" className="no-underline text-tertiary">
          Accessibility
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <FaGamepad size={46} className="text-tertiary" />
      </div>
      <p>© 2026 GoodPlays</p>
    </footer>
  );
}

export default Footer;

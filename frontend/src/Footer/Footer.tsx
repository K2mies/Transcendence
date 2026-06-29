import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-tertiary p-4 text-center">
      <div>
        <Link to="/" className="no-underline text-tertiary">
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
      </div>
      <p>© 2026 GoodPlays</p>
    </footer>
  );
}

export default Footer;

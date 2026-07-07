import {
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaTrashAlt,
} from "react-icons/fa";

const ICON_SIZE = 20;

function PrivacyPolicy() {
  return (
    <div className="bg-primary text-tertiary min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          1. Information We Collect
          <FaDatabase size={ICON_SIZE} className="ml-3 text-tertiary" />
        </h2>
        <p>
          GoodPlays may collect account information such as your username, email
          address, profile information, reviews, ratings, game lists,
          favourites, and friend connections.
        </p>

        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          2. How We Use Your Information
          <FaShieldAlt size={ICON_SIZE} className="ml-3 text-tertiary" />
        </h2>
        <p>
          We use this information to provide core features of the application,
          including user accounts, profiles, reviews, ratings, game tracking,
          search, and social features.
        </p>

        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          3. Account Security
          <FaUserLock size={ICON_SIZE} className="ml-3 text-tertiary" />
        </h2>
        <p>
          Passwords are handled securely and should never be shared with other
          users. Users are responsible for keeping their account credentials
          safe.
        </p>

        <h2 className="mt-6 mb-2 flex items-center text-2xl">
          4. Data Removal
          <FaTrashAlt size={ICON_SIZE} className="ml-3 text-tertiary" />
        </h2>
        <p>
          Users may request that their account data be updated or removed. Some
          content may remain if required for application integrity, moderation,
          or technical reasons.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

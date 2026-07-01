import { TbContract } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoMdUnlock } from "react-icons/io";
import { FaSkull } from "react-icons/fa";

function TermsOfService() {
  const iconSize = 17;
  return (
    <div className="bg-primary text-tertiary min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mt-6 mb-2 text-2xl flex items-center">
          1. Acceptance of Terms
          <TbContract size={iconSize} className="text-tertiary ml-3" />
        </h2>
        <p>By using GoodPlays, you agree to these Terms of Service.</p>

        <h2 className="mt-6 mb-2 text-2xl flex items-center">
          2. User Content
          <FaUser size={iconSize} className="text-tertiary ml-3" />
        </h2>
        <p>
          Users are responsible for the reviews, comments, and other content
          they publish on the platform.
        </p>

        <h2 className="mt-6 mb-2 text-2xl flex items-center">
          3. Account Responsibility
          <IoMdUnlock size={iconSize} className="text-tertiary ml-3" />
        </h2>
        <p>
          Users are responsible for maintaining the security of their accounts.
        </p>

        <h2 className="mt-6 mb-2 text-2xl flex items-center">
          4. Termination
          <FaSkull size={iconSize} className="text-tertiary ml-3" />
        </h2>
        <p>
          We reserve the right to suspend or remove accounts that violate these
          terms.
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;

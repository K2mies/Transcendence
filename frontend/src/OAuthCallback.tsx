import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam);
      return;
    }

    fetch("http://localhost:4243/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(result.data.user));
          navigate("/dashboard");
        } else {
          setError(result.error || "Authentication failed");
        }
      })
      .catch(() => setError("Authentication failed"));
  }, [navigate, searchParams]);

  if (error)
    return (
      <div>
        <p>{error}</p>
        <a href="/login">Back to login</a>
      </div>
    );

  return <p>Signing in...</p>;
}

export default OAuthCallback;

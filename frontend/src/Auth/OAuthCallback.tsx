import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { RegistrationProps } from "../types";

function OAuthCallback({ setMyCurrUser }: RegistrationProps) {
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
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            id: result.data.user.id,
                            name: result.data.user.name,
                        })
                    );
                    setMyCurrUser(result.data.user.name);

                    window.dispatchEvent(new Event("auth-changed"));
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
                <p role="alert">{error}</p>
                <a href="/login">Back to login</a>
            </div>
        );

    return <p>Signing in...</p>;
}

export default OAuthCallback;

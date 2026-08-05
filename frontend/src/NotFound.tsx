import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404: Not Found | GoodPlays";
  }, []);

  return (
    <div className="bg-secondary p-6 min-h-screen">
      <div className="bg-primary text-tertiary flex flex-col rounded-t-lg">
        <div className="flex gap-2 items-center text-tertiary">
          <h2 className=" bg-primary text-tertiary text-[1.3rem] flex justify-start rounded-t-lg p-5 font-bold">
            404: Not Found
          </h2>
        </div>
      </div>
      <div className="bg-tertiary text-primary border-primary border-3 flex flex-row items-start gap-8 rounded-b-lg">
        <div className="relative m-4 h-auto rounded-lg m-4">
          <Link to="/">Go back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

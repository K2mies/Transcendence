import { useEffect, useState } from "react";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
};

function PaginationControls({
  page,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
}: PaginationControlsProps) {
  const [inputPage, setInputPage] = useState(page.toString());

  useEffect(() => {
    setInputPage(page.toString());
  }, [page]);

  function submitPage() {
    const value = Number(inputPage);

    if (value >= 1 && value <= totalPages) {
      onPageChange(value);
    } else {
      setInputPage(page.toString());
    }
  }

  return (
    <div className="bg-primary text-tertiary flex justify-center items-center gap-4 sticky bottom-0 z-40  ">
      <button disabled={page === 1} onClick={onPrevious} className="px-4 py-2">
        Previous
      </button>

      <div className="flex items-center gap-2">
        <span>Page</span>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onBlur={submitPage}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitPage();
            }
          }}
          className="
            w-12
            h-5
            rounded
            px-2
            py-1
            text-center
            bg-tertiary
            text-primary
            border-none
            outline-none
          "
        />
        <span>of {totalPages}</span>
      </div>

      <button
        disabled={page === totalPages}
        onClick={onNext}
        className="px-4 py-2"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;

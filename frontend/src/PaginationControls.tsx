type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

function PaginationControls({
  page,
  totalPages,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  return (
    <div className="bg-primary text-tertiary flex justify-center items-center gap-4 mt-6 rounded-b-lg sticky bottom-0 z-40  ">
      <button disabled={page === 1} onClick={onPrevious} className="px-4 py-2">
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

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

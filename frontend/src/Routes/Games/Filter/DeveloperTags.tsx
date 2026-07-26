type DeveloperTagsProps = {
  developer: string;
  setDeveloper: (developer: string) => void;
};

function DeveloperTags({ developer, setDeveloper }: DeveloperTagsProps) {
  if (!developer) {
    return null;
  }

  return (
    <div className="w-full">
      <p className="mb-2 text-sm text-tertiary font-semibold">Developer</p>

      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex items-center gap-1 rounded-full bg-tertiary text-primary px-3 py-1">
          <span>{developer}</span>

          <button
            type="button"
            aria-label="Remove filter"
            onClick={() => setDeveloper("")}
            className="font-bold"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeveloperTags;

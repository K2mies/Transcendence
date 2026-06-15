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
      <h3 className="mb-2 text-sm font-semibold">Developer</h3>

      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1">
          <span>{developer}</span>

          <button
            type="button"
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

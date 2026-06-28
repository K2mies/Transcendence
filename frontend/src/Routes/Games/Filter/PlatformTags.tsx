type PlatformTagsProps = {
  platforms: string[];
  setPlatforms: (platforms: string[]) => void;
};

function PlatformTags({ platforms, setPlatforms }: PlatformTagsProps) {
  if (platforms.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h3 className="mb-2 text-sm text-tertiary font-semibold">Platforms</h3>

      <div className="flex flex-row flex-wrap gap-2">
        {platforms.map((platform) => (
          <div
            key={platform}
            className="flex items-center gap-1 rounded-full bg-tertiary text-primary px-3 py-1"
          >
            <span>{platform}</span>

            <button
              type="button"
              onClick={() =>
                setPlatforms(platforms.filter((p) => p !== platform))
              }
              className="font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatformTags;

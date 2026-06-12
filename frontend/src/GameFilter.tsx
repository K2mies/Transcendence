import GenreTags from "./GenreTags";
import GenreSelector from "./GenreSelector";
import PlatformTags from "./PlatformTags";
import PlatformSelector from "./PlatformSelector";

type GameFilterProps = {
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
  platforms: string[];
  setPlatforms: (platforms: string[]) => void;
};

function GameFilter({
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
  genres,
  setGenres,
  platforms,
  setPlatforms,
}: GameFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <input
        type="text"
        placeholder="Filter games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded border px-3 py-2"
      />

      <GenreSelector genres={genres} setGenres={setGenres} />

      <PlatformSelector platforms={platforms} setPlatforms={setPlatforms} />

      <select
        value={minRating}
        onChange={(e) => setMinRating(Number(e.target.value))}
        className="rounded border px-3 py-2"
      >
        <option value={0}>All ratings</option>
        <option value={1}>1+ stars</option>
        <option value={2}>2+ stars</option>
        <option value={3}>3+ stars</option>
        <option value={4}>4+ stars</option>
        <option value={5}>5 stars</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="rating-desc">Highest rated</option>
        <option value="rating-asc">Lowest rated</option>
      </select>

      <GenreTags genres={genres} setGenres={setGenres} />

      <PlatformTags platforms={platforms} setPlatforms={setPlatforms} />
    </div>
  );
}

export default GameFilter;

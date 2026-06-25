import TitleSelector from "./TitleSelector";

import GenreTags from "./GenreTags";
import GenreSelector from "./GenreSelector";

import PlatformTags from "./PlatformTags";
import PlatformSelector from "./PlatformSelector";

import DeveloperSelector from "./DeveloperSelector";
import DeveloperTags from "./DeveloperTags";

import RatingSelector from "./RatingSelector";
import SortSelector from "./SortSelector";

import { FaGear } from "react-icons/fa6";

type GameFilterProps = {
  setShowFilters: (show: boolean) => void;

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

  developer: string;
  setDeveloper: (developer: string) => void;
};

function GameFilter({
  setShowFilters,

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

  developer,
  setDeveloper,
}: GameFilterProps) {
  return (
    <div className=" bg-primary mb-6 flex flex-wrap items-center gap-4 p-6">
      <GenreTags genres={genres} setGenres={setGenres} />

      <PlatformTags platforms={platforms} setPlatforms={setPlatforms} />

      <DeveloperTags developer={developer} setDeveloper={setDeveloper} />

      <TitleSelector titleTerm={searchTerm} setTitleTerm={setSearchTerm} />

      <GenreSelector genres={genres} setGenres={setGenres} />

      <PlatformSelector platforms={platforms} setPlatforms={setPlatforms} />

      <DeveloperSelector developer={developer} setDeveloper={setDeveloper} />

      <RatingSelector minRating={minRating} setMinRating={setMinRating} />

      <SortSelector sortBy={sortBy} setSortBy={setSortBy} />

      <div className="flex justify-end ml-auto mr-3">
        <FaGear
          size={30}
          className="text-tertiary cursor-pointer"
          onClick={() => setShowFilters(false)}
        />
      </div>
    </div>
  );
}

export default GameFilter;

type GenreTagsProps = {
  genres: string[];
  setGenres: (genres: string[]) => void;
};

function GenreTags({ genres, setGenres }: GenreTagsProps) {
  if (genres.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h3 className="mb-2 text-sm font-semibold">Genres</h3>

      <div className="flex flex-row flex-wrap gap-2">
        {genres.map((genre) => (
          <div
            key={genre}
            className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1"
          >
            <span>{genre}</span>

            <button
              type="button"
              onClick={() => setGenres(genres.filter((g) => g !== genre))}
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

export default GenreTags;

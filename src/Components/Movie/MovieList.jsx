import MovieCard from "./MovieCard";

export default function MovieList({ movies = [], onAddToFavorites, className = "" }) {
  if (!movies.length) {
    return (
      <div className={`text-center text-gray-500 py-12 ${className}`}>
        Nenhum filme encontrado.
      </div>
    );
  }

  const handleAddToFavorites = (movie) => {
    if (onAddToFavorites) {
        onAddToFavorites(movie);
    }
}

  return (
    <div
      className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id ?? movie.title} movie={movie} onAddToFavorites={handleAddToFavorites} />
      ))}
    </div>
  );
}


export default function MovieCard({ movie, onAddToFavorites, className = "" }) {
  const { title, overview, releaseDate, posterPath } = movie || {};
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

  return (
    <article
      className={
        "flex flex-col rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100 max-w-87" +
        className
      }
    >
      <div className="">
        <ImageUrl path={posterPath} alt={title} />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <header className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {year && (
            <span className="text-sm text-gray-500">{year}</span>
          )}
        </header>

        <p className="text-sm text-gray-600 line-clamp-4">{overview}</p>

        <button
          type="button"
            onClick={() => onAddToFavorites(movie)}
          className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          Adicionar aos meus filmes
        </button>
      </div>
    </article>
  );
}

function ImageUrl({ path, alt }) {

    const src = path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

    return (
        <>
            {path ? (
                <img
                    src={src}
                    alt={alt ?? "Movie poster"}
                    className="max-w-87"
                />
                ) : (
                <div className="flex items-center justify-center text-sm text-gray-500">
                    Sem imagem
                </div>
            )}
        </>
    );
}
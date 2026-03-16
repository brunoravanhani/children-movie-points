import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../Context/AuthContext.jsx";
import MovieList from '../../Components/Movie/MovieList.jsx';
import { getAll, deleteMovie } from "../../services/api.js";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            getAll(token).then((data) => {
                setMovies(data || []);
            });
        }

        fetchMovies().catch((fetchError) => {
            setError(fetchError.message || 'Failed to fetch movies');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleRemove = async (movie) => {
        try {
            await deleteMovie(movie.id, token);
            setMovies((prev) => prev.filter((m) => m.id !== movie.id));
        } catch (err) {
            setError(err.message || 'Failed to remove movie');
        }
    };

    const renderGaleryButtonSection = ({movie}) => (
        <div className="mt-4 grid grid-cols-3 gap-2">
            <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
                Assistir
            </button>
            <button
                type="button"
                className="rounded-md border border-indigo-300 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
                Alterar
            </button>
            <button
                type="button"
                onClick={() => handleRemove(movie)}
                className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
                Excluir
            </button>
        </div>
    );

    const renderExtraSection = ({ movie }) => (
        <div className="mt-2">
            <span className="text-sm text-gray-500">Pontos: {movie.points}</span>
        </div>
    );

    return (
        <div className="base">
            <div className="max-w-150 mx-auto p-4 mb-10">
                <h1 className="m-10 text-center">
                    Meu filmes
                </h1>
                
            </div>
            <MovieList 
                movies={movies} 
                renderButtonSection={renderGaleryButtonSection}
                renderExtraSection={renderExtraSection} />
        </div>
    );
}
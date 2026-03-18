import { useState } from 'react';
import { Search as IconSearch } from "lucide-react";
import MovieList from '../../Components/Movie/MovieList.jsx';
import { searchMovies, AddMovie } from "../../services/api.js";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await searchMovies(searchQuery);
            setMovies(data || []);
        } catch (fetchError) {
            setMovies([]);
            setError(fetchError.message || 'Failed to fetch results');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToFavorites = async (movie) => {
        try {
            await AddMovie(movie);
        } catch (error) {
            console.error('Failed to add movie:', error);
            alert('Failed to add movie. Please try again.');
        }
    };

    const renderSearchButtonSection = ({ movie }) => (
        <button
            type="button"
            onClick={() => handleAddToFavorites(movie)}
            className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
            Adicionar aos meus filmes
        </button>
    );

    return (
        <div className="base">
            <div className="max-w-150 mx-auto p-4 mb-10">
                <h1 className="m-10 text-center">
                    Buscar Filmes
                </h1>
                
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Digite o nome..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer"
                        >
                            <IconSearch className="inline-block" />
                        </button>
                    </div>
                    
                    
                </form>
            </div>
            <MovieList
                movies={movies}
                renderButtonSection={renderSearchButtonSection}
            />
        </div>
    );
}
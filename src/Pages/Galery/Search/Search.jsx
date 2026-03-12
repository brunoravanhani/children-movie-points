import { useState, useContext } from 'react';
import { Search as IconSearch } from "lucide-react";
import { AuthContext } from "../../../Context/AuthContext.jsx";
import MovieList from '../../../Components/Movie/MovieList.jsx';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const url = `https://localhost:8080/movies/search?query=${encodeURIComponent(searchQuery)}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setMovies(data || []);
            } else {
                setMovies([]);
                setError(data.Error || 'No results found');
            }
        } catch (fetchError) {
            setMovies([]);
            setError(fetchError.message || 'Failed to fetch results');
        } finally {
            setLoading(false);
        }
    };

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
            <MovieList movies={movies} />
        </div>
    );
}
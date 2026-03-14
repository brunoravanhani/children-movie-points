import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../Context/AuthContext.jsx";
import MovieList from '../../Components/Movie/MovieList.jsx';
import { getAll } from "../../services/api.js";

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

    return (
        <div className="base">
            <div className="max-w-150 mx-auto p-4 mb-10">
                <h1 className="m-10 text-center">
                    Meu filmes
                </h1>
                
            </div>
            <MovieList movies={movies} />
        </div>
    );
}
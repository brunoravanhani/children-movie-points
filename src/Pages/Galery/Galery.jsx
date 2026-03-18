import { useState, useEffect } from 'react';
import MovieList from '../../Components/Movie/MovieList.jsx';
import Modal from '../../Components/Modal/Modal.jsx';
import { getAll, deleteMovie, updateMoviePoints } from "../../services/api.js";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [moviePointsInput, setMoviePointsInput] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            getAll().then((data) => {
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
            await deleteMovie(movie.id);
            setMovies((prev) => prev.filter((m) => m.id !== movie.id));
        } catch (err) {
            setError(err.message || 'Failed to remove movie');
        }
    };

    const handleOpenEditModal = (movie) => {
        setSelectedMovie(movie);
        setMoviePointsInput(movie?.points || 1);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedMovie(null);
        setMoviePointsInput(1);
    };

    const handleUpdateMoviePoints = async () => {
        if (!selectedMovie?.id) {
            setError('Filme inválido para atualização');
            return;
        }

        const parsedPoints = Number(moviePointsInput);

        if (Number.isNaN(parsedPoints)) {
            setError('Valor de pontos inválido');
            return;
        }

        try {
            setError(null);
            await updateMoviePoints(selectedMovie.id, parsedPoints);
            setMovies((prev) =>
                prev.map((movie) =>
                    movie.id === selectedMovie.id ? { ...movie, points: parsedPoints } : movie
                )
            );
            handleCloseEditModal();
        } catch (err) {
            setError(err.message || 'Failed to update movie points');
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
                onClick={() => handleOpenEditModal(movie)}
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

            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                title={selectedMovie?.title}
                footer={(
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleCloseEditModal}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleUpdateMoviePoints}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            Salvar
                        </button>
                    </div>
                )}
            >
                <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="movie-title-input">
                    Pontos do Filme
                </label>
                <input
                    id="movie-points-input"
                    type="number"
                    value={moviePointsInput}
                    onChange={(event) => setMoviePointsInput(event.target.value)}
                    placeholder="Digite os pontos do filme"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </Modal>
        </div>
    );
}
import '@/css/Home.css'
import MovieCard from "@/components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from '@/services/api';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch (e) {
                setError("Failed to load.")
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault(); // prevent page refresh so the search field doesn't clear on submit
        alert(searchQuery);
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
                </div>
            )
            };

        </div>
    )
}

export default Home;
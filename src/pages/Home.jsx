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
    }, []); //runs once because no specified array

    const handleSearch = async (e) => {
        e.preventDefault(); // prevent page refresh so the search field doesn't clear on submit
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null); // reset error flag
        }
        catch (err) {
            console.log(err);
            setError("Search failed...");
        }
        finally {
            setLoading(false);
        }
        //debug
        console.log(`${searchQuery}`);
    };

    const handleInputChange = (value) => {
        // prevent user from beginning their search with whitespace
        if (value.startsWith(' ')) {
            return;
        }
        setSearchQuery(value);
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies?.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
                </div>
            )
            };

        </div>
    )
}

export default Home;
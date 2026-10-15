import MovieCard from "@/components/MovieCard"
import { useState } from "react"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        { id: 1, title: "Endgame", release_date: "2020" },
        { id: 2, title: "Spiderman", release_date: "2026" },
        { id: 3, title: "Superman", release_date: "2025" }
    ];

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
            <div className="movies-grid">
                {movies.map((movie) => 
                    movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} />)}
            </div>
        </div>
    )
}

export default Home;
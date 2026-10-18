const ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    });
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    // ? is start of params, & to add more params
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        header: {
            'accept': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    });
    const data = await response.json();
    return data.results;
};
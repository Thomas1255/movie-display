import { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

// children is reserved prop for any children tags wrapped by <MovieProvider/>
const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // localStorage is basically the browser's memory, can only store strings and it survives page refreshes (persistent data)
        // essentially a persistent hashmap (uses key-value pairs)
        const storedFavs = localStorage.getItem("favorites");

        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs)); // revert from string to json obj
        }
    }, []); //runs once

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites]); //runs evertime favorites array is updated

    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
        /* if it's a normal variable passed, it will just assign it to state variable 
        but if it's a callback function, like in this case, 
        then it will pass current state variable (favorites) as param (prev) and run the function, 
        then assign the return value to the current state variable */
    };

    // kinda ugly but 3-level arrow function
    const removeFromFavorites = (movieIdToRemove) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieIdToRemove)) // if filter() is true, keep that element
    };

    // used to determine what MovieCards in homepage will have favorite icon active
    const isFavorite = (movieIdToFavorite) => {
        return favorites.some(movie => movie.id === movieIdToFavorite); // some() checks if any element in the array meets the condition
    }

    // bundle of variables and functions that can be used by the children of the provider
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
    <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
    );

}

export default MovieProvider;
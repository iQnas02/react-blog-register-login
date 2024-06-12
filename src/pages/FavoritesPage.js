import React, { useEffect, useState } from 'react';
import SinglePost from "../components/SinglePost";

const FavoritesPage = ({ loggedIn }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const updateFavorites = () => {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavorites(storedFavorites);
        };

        // Initial load
        updateFavorites();

        // Event listener for storage changes
        window.addEventListener('storage', updateFavorites);

        return () => {
            window.removeEventListener('storage', updateFavorites);
        };
    }, []);

    function getPosts() {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }

    return (
        <div className="d-flex flex-wrap">
            {favorites.map(x => <SinglePost getPosts={getPosts} loggedIn={loggedIn} key={x.id} post={x} />)}
        </div>
    );
};

export default FavoritesPage;

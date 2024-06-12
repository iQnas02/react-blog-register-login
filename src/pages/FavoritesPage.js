import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SinglePost from "../components/SinglePost";

const FavoritesPage = ({ loggedIn }) => {
    const [favorites, setFavorites] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            const updateFavorites = () => {
                const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${loggedIn}`)) || [];
                setFavorites(storedFavorites);
            };

            // Initial load
            updateFavorites();

            // Event listener for storage changes
            window.addEventListener('storage', updateFavorites);

            return () => {
                window.removeEventListener('storage', updateFavorites);
            };
        } else {
            nav('/login');
        }
    }, [loggedIn, nav]);

    function getPosts() {
        const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${loggedIn}`)) || [];
        setFavorites(storedFavorites);
    }

    if (!loggedIn) {
        return <div>Please log in to see your favorites.</div>;
    }

    return (
        <div className="d-flex flex-wrap">
            {favorites.map(x => <SinglePost getPosts={getPosts} loggedIn={loggedIn} key={x.id} post={x} />)}
        </div>
    );
};

export default FavoritesPage;

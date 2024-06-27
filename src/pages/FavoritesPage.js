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
            nav('/favorites');
        }
    }, [loggedIn, nav]);

    function getPosts() {
        const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${loggedIn}`)) || [];
        setFavorites(storedFavorites);
    }

    // Update favorites list if a post is updated or deleted
    const handlePostUpdate = (updatedPost) => {
        const favoritesKey = `favorites_${loggedIn}`;
        const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        const updatedFavorites = storedFavorites.map(fav => fav.id === updatedPost.id ? { ...fav, ...updatedPost } : fav);
        localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    const handlePostDelete = (postId) => {
        const favoritesKey = `favorites_${loggedIn}`;
        const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        const updatedFavorites = storedFavorites.filter(fav => fav.id !== postId);
        localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    if (!loggedIn) {
        return <div>Please log in to see your favorites.</div>;
    }

    return (
        <div className="d-flex flex-wrap">
            {favorites.map(post => (
                <SinglePost
                    key={post.id}
                    post={post}
                    loggedIn={loggedIn}
                    getPosts={getPosts}
                    onPostUpdate={handlePostUpdate}
                    onPostDelete={handlePostDelete}
                />
            ))}
        </div>
    );
};

export default FavoritesPage;

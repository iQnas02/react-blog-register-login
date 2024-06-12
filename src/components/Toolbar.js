import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Toolbar = ({ logged }) => {
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        const updateFavoritesCount = () => {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavoritesCount(favorites.length);
        };

        // Initial count
        updateFavoritesCount();

        // Event listener for storage changes
        window.addEventListener('storage', updateFavoritesCount);

        return () => {
            window.removeEventListener('storage', updateFavoritesCount);
        };
    }, []);

    return (
        <div className="mb-5">
            <div className="p-2 border me-3 d-flex justify-content-between">
                <div className="d-flex gap-3">
                    <Link to="/">Blog</Link>

                    {!logged && <Link to="/login">Login</Link>}
                    {!logged && <Link to="/register">Registration</Link>}

                    {logged && <Link to="/create">Create Post</Link>}
                    <Link to="/favorites">Favorites ({favoritesCount})</Link>
                </div>

                {logged && `logged in as ${logged}`}
            </div>
        </div>
    );
};

export default Toolbar;

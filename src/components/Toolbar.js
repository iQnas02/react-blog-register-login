import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Toolbar = ({ logged, logout }) => {
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        const updateFavoritesCount = () => {
            if (logged) {
                const favorites = JSON.parse(localStorage.getItem(`favorites_${logged}`)) || [];
                setFavoritesCount(favorites.length);
            }
        };

        // Initial count
        updateFavoritesCount();

        // Event listener for storage changes
        window.addEventListener('storage', updateFavoritesCount);

        return () => {
            window.removeEventListener('storage', updateFavoritesCount);
        };
    }, [logged]);

    return (
        <div className="mb-5">
            <div className="p-2 border me-3 d-flex justify-content-between">
                <div className="d-flex gap-3">
                    <Link to="/">Home</Link>

                    {!logged && <Link to="/login">Login</Link>}
                    {!logged && <Link to="/register">Registration</Link>}

                    {logged && <Link to="/create">Create Post</Link>}
                    {logged && <Link to="/favorites">Favorites ({favoritesCount})</Link>}
                </div>

                {logged && (
                    <div className="d-flex gap-3">
                        <span>logged in as {logged}</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Toolbar;

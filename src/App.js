import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Toolbar from "./components/Toolbar";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SinglePostPage from "./pages/SinglePostPage";
import UserPostsPage from "./pages/UserPostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {

    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("loggedInUser");
        if (savedUser) {
            setLoggedIn(savedUser);
        }
    }, []);

    const login = (username) => {
        localStorage.setItem("loggedInUser", username);
        setLoggedIn(username);
    };

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("secret");
        setLoggedIn(null);
    };

    return (
        <div className="p-5">
            <BrowserRouter>
                <Toolbar logged={loggedIn} logout={logout} />

                <Routes>
                    <Route element={<LoginPage setLog={login} />} path="/login" />
                    <Route element={<RegisterPage />} path="/register" />
                    <Route element={<BlogPage loggedIn={loggedIn} />} path="/" />
                    <Route element={<SinglePostPage loggedIn={loggedIn} />} path="/post/:username/:id" />
                    <Route element={<UserPostsPage loggedIn={loggedIn} />} path="/userposts/:username" />
                    <Route element={<CreatePostPage loggedIn={loggedIn} />} path="/create" />
                    <Route element={<FavoritesPage loggedIn={loggedIn} />} path="/favorites" />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

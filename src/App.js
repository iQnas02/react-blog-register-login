import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Toolbar from "./components/Toolbar";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SinglePostPage from "./pages/SinglePostPage";
import UserPostsPage from "./pages/UserPostsPage";
import CreatePostPage from "./pages/CreatePostPage";


function App() {
    const [loggedIn, setLoggedIn] = useState(null)

    return (
        <div className="p-5">
            <BrowserRouter>
                <Toolbar logged={loggedIn}/>

                <Routes>
                    <Route element={<LoginPage setLog={setLoggedIn}/>} path="/login"/>
                    <Route element={<RegisterPage/>} path="/register"/>

                    <Route element={<BlogPage loggedIn={loggedIn}/>} path="/"/>

                    <Route element={<SinglePostPage/>} path="/post/:username/:id"/>
                    <Route element={<UserPostsPage/>} path="/userposts/:username"/>

                    <Route element={<CreatePostPage/>} path="/create"/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

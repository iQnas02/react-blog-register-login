import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import http from "../plugins/http";

const SinglePost = ({ post, loggedIn, getPosts }) => {
    const nav = useNavigate();

    const imageRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

    const [updateOn, setUpdateOn] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            const favorites = JSON.parse(localStorage.getItem(`favorites_${loggedIn}`)) || [];
            setIsFavorite(favorites.some(fav => fav.id === post.id));
        }
    }, [post.id, loggedIn]);

    function openSinglePost() {
        nav(`/post/${post.username}/${post.id}`);
    }

    function openUserPosts() {
        nav(`/userposts/${post.username}`);
    }

    async function remove() {
        const user = {
            id: post.id,
            secretKey: localStorage.getItem("secret")
        };

        const res = await http.post("/deletepost", user);

        if (res.success) {
            getPosts();
        }
    }

    async function update() {
        const updatedFields = {};

        if (imageRef.current.value !== post.image) {
            updatedFields.image = imageRef.current.value;
        }
        if (titleRef.current.value !== post.title) {
            updatedFields.title = titleRef.current.value;
        }
        if (descriptionRef.current.value !== post.description) {
            updatedFields.description = descriptionRef.current.value;
        }

        const user = {
            ...updatedFields,
            secretKey: localStorage.getItem("secret"),
            id: post.id
        };

        const res = await http.post("/updatepost", user);

        if (res.success) {
            setUpdateOn(false);
            getPosts();
        }
    }

    function toggleFavorite() {
        if (!loggedIn) {
            alert("You need to be logged in to favorite posts.");
            return;
        }

        const favoritesKey = `favorites_${loggedIn}`;
        const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        if (isFavorite) {
            const newFavorites = favorites.filter(fav => fav.id !== post.id);
            localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
        } else {
            favorites.push(post);
            localStorage.setItem(favoritesKey, JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);

        // Dispatch a custom event to update the toolbar
        window.dispatchEvent(new Event('storage'));
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('lt-LT', { timeZone: 'Europe/Vilnius' });
    };

    return (
        <div className="p-2 border m-2 postCard">
            <img src={post.image} alt=""/>
            <h3 style={{cursor: 'pointer'}} onClick={openSinglePost}>{post.title}</h3>
            <h5 style={{cursor: 'pointer'}} onClick={openUserPosts}>{post.username}</h5>
            <p>{formatDate(post.timestamp)}</p>
            <p>{post.description}</p>
            {loggedIn === post.username && <button onClick={remove}>DELETE POST</button>}
            {loggedIn === post.username && <button onClick={() => setUpdateOn(!updateOn)}>UPDATE POST</button>}

            {loggedIn && (
                <button onClick={toggleFavorite}>
                    {isFavorite ? '★' : '☆'} Favorite
                </button>
            )}

            {updateOn &&
                <div className="d-flex flex-column p-5">
                    <input type="text" ref={imageRef} placeholder="image"/>
                    <input type="text" ref={titleRef} placeholder="title"/>
                    <textarea ref={descriptionRef} defaultValue={post.description} placeholder="description" />
                    <button onClick={update}>Update Post</button>
                </div>
            }
        </div>
    );
};

export default SinglePost;
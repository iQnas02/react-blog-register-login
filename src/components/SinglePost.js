import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import http from "../plugins/http";

const SinglePost = ({ post, loggedIn, getPosts, hideDeleteButton, className, hideDetails }) => {
    const nav = useNavigate();
    const imageRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const [updateOn, setUpdateOn] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [errors, setErrors] = useState({ image: '', title: '', description: '', general: '' });

    useEffect(() => {
        if (loggedIn) {
            const favorites = JSON.parse(localStorage.getItem(`favorites_${loggedIn}`)) || [];
            setIsFavorite(favorites.some(fav => fav.id === post.id));
        }
    }, [post.id, loggedIn]);

    const validateFields = (image, title, description) => {
        let hasError = false;
        const newErrors = { image: '', title: '', description: '', general: '' };

        const urlPattern = /^(https?:\/\/)/i;

        if (image === '') {
            newErrors.image = 'Image URL is required.';
            hasError = true;
        }else if (!urlPattern.test(image)) {
            newErrors.image = 'Image URL must start with http:// or https://.';
            hasError = true;
        }

        if (title === '') {
            newErrors.title = 'Title is required.';
            hasError = true;
        }

        if (description === '') {
            newErrors.description = 'Description is required.';
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    async function remove() {
        const user = {
            id: post.id,
            secretKey: localStorage.getItem("secret")
        };

        try {
            const res = await http.post("/deletepost", user);
            if (res && res.success) {
                const favoritesKey = `favorites_${loggedIn}`;
                const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
                const newFavorites = favorites.filter(fav => fav.id !== post.id);
                localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));

                // Dispatch a custom event to update the favorites page
                window.dispatchEvent(new Event('storage'));
                getPosts();
            } else {
                console.error("Error deleting post:", res ? res.error : "No response from server");
            }
        } catch (error) {
            console.error("Network error:", error.message);
        }
    }

    async function update() {
        setErrors({ image: '', title: '', description: '', general: '' });

        const image = imageRef.current.value.trim();
        const title = titleRef.current.value.trim();
        const description = descriptionRef.current.value.trim();

        if (!validateFields(image, title, description)) return;

        const user = {
            image,
            title,
            description,
            secretKey: localStorage.getItem("secret"),
            id: post.id
        };

        try {
            const res = await http.post("/updatepost", user);
            if (res && res.success) {
                const favoritesKey = `favorites_${loggedIn}`;
                const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
                const updatedFavorites = favorites.map(fav => fav.id === post.id ? { ...fav } : fav);
                localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));

                // Dispatch a custom event to update the favorites page
                window.dispatchEvent(new Event('storage'));
                setUpdateOn(false);
                getPosts();
            } else {
                setErrors(prev => ({ ...prev, general: res ? res.error : "No response from server" }));
                console.error("Error updating post:", res ? res.error : "No response from server");
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, general: 'An unexpected error occurred. Please try again later.' }));
            console.error("Network error:", error.message);
        }
    }

    const toggleFavorite = () => {
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
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('lt-LT', { timeZone: 'Europe/Vilnius' });
    };

    return (
        <div className={`p-2 border m-2 postCard ${className}`}>
            <img src={post.image} alt="" className="postImage"/>
            <h3 style={{cursor: 'pointer'}} onClick={() => nav(`/post/${post.username}/${post.id}`)}>{post.title}</h3>
            <h5 style={{cursor: 'pointer'}} onClick={() => nav(`/userposts/${post.username}`)}>{post.username}</h5>
            {hideDetails && (
                <>
                    <p>{formatDate(post.timestamp)}</p>
                    <p>{post.description}</p>
                </>
            )}
            {loggedIn === post.username && !hideDeleteButton && <button onClick={remove}>DELETE POST</button>}
            {loggedIn === post.username && <button onClick={() => setUpdateOn(!updateOn)}>UPDATE POST</button>}

            {loggedIn && (
                <button onClick={toggleFavorite}>
                    {isFavorite ? '★' : '☆'} Favorite
                </button>
            )}

            {updateOn && (
                <div className="d-flex flex-column p-5">
                    <input type="text" ref={imageRef} defaultValue={post.image} placeholder="image"/>
                    {errors.image && <p style={{color: 'red'}}>{errors.image}</p>}

                    <input type="text" ref={titleRef} defaultValue={post.title} placeholder="title"/>
                    {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}

                    <textarea ref={descriptionRef} defaultValue={post.description} placeholder="description"/>
                    {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}
                    <p>{errors.general}</p>

                    <button onClick={update}>Update Post</button>
                </div>
            )}
        </div>
    );
};

export default SinglePost;

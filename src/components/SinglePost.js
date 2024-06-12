import React from 'react';
import {useNavigate} from "react-router-dom";

const SinglePost = ({post}) => {
    const nav = useNavigate()

    function openSinglePost() {
        nav(`/post/${post.username}/${post.id}`)
    }
    function openUserPosts() {
        nav(`/userposts/${post.username}`)
    }

    return (
        <div className="p-2 border m-2 postCard">
            <img src={post.image} alt=""/>
            <h3 onClick={openSinglePost}>{post.title}</h3>
            <h5 onClick={openUserPosts}>{post.username}</h5>
        </div>
    );
};

export default SinglePost;
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";

const SinglePost = ({post, loggedIn, getPosts}) => {
    const nav = useNavigate()

    const imageRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()

    const [updateOn, setUpdateOn] = useState(false)

    function openSinglePost() {
        nav(`/post/${post.username}/${post.id}`)
    }
    function openUserPosts() {
        nav(`/userposts/${post.username}`)
    }

    async function remove() {
        const user = {
            id: post.id,
            secretKey: localStorage.getItem("secret")
        }

        const res = await http.post("/deletepost", user)

        if(res.success) {
            getPosts()
        }
    }

    useEffect(() => {
        if(updateOn) {
            imageRef.current.value = post.image
            titleRef.current.value = post.title
            descriptionRef.current.value = post.description
        }
    }, [updateOn])

    async function update() {
        const user = {
            image: imageRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            secretKey: localStorage.getItem("secret"),
            id: post.id
        }

        const res = await http.post("/updatepost", user)

        if(res.success) {
            setUpdateOn(false)
            getPosts()
        }
    }

    return (
        <div className="p-2 border m-2 postCard">
            <img src={post.image} alt=""/>
            <h3 onClick={openSinglePost}>{post.title}</h3>
            <h5 onClick={openUserPosts}>{post.username}</h5>

            {loggedIn === post.username &&  <button onClick={remove}>DELETE POST</button>}
            {loggedIn === post.username &&  <button onClick={() => setUpdateOn(!updateOn)}>UPDATE POST</button>}


            {updateOn &&
                <div className="d-flex flex-column p-5">
                    <input type="text" ref={imageRef} placeholder="image"/>
                    <input type="text" ref={titleRef} placeholder="title"/>
                    <input type="text" ref={descriptionRef} placeholder="description"/>

                    <button onClick={update}>Update Post</button>
                </div>
            }
        </div>
    );
};

export default SinglePost;
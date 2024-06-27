import React, {useRef} from 'react';
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";


const CreatePostPage = () => {
    const imageRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()

    const nav = useNavigate()

    async function create() {
        const user = {
            image: imageRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            secretKey: localStorage.getItem("secret")
        }

        const res = await http.post("/createpost", user)


        if(res.success) {
            nav("/")
        }
    }


    return (
        <div className="d-flex flex-column p-5">
            <input type="text" ref={imageRef} placeholder="image"/>
            <input type="text" ref={titleRef} placeholder="title"/>
            <input type="text" ref={descriptionRef} placeholder="description"/>

            <button onClick={create}>Create Post</button>
        </div>
    );
};

export default CreatePostPage;
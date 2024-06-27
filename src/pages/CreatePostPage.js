import React, { useRef, useState } from 'react';
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
    const imageRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const nav = useNavigate();
    const [errors, setErrors] = useState({ image: '', title: '', description: '', general: '' });

    async function create() {
        setErrors({ image: '', title: '', description: '', general: '' });

        const image = imageRef.current.value.trim();
        const title = titleRef.current.value.trim();
        const description = descriptionRef.current.value.trim();

        let hasError = false;

        if (image === '') {
            setErrors(prev => ({ ...prev, image: 'Image URL is required.' }));
            hasError = true;
        }

        if (title === '') {
            setErrors(prev => ({ ...prev, title: 'Title is required.' }));
            hasError = true;
        }

        if (description === '') {
            setErrors(prev => ({ ...prev, description: 'Description is required.' }));
            hasError = true;
        }

        if (hasError) return;

        const user = {
            image,
            title,
            description,
            secretKey: localStorage.getItem("secret")
        };

        try {
            const res = await http.post("/createpost", user);

            if (res.success) {
                nav("/");
            } else {
                setErrors(prev => ({ ...prev, general: res.message }));
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, general: 'An unexpected error occurred. Please try again later.' }));
        }
    }

    return (
        <div className="d-flex flex-column p-5">
            <div>
                <input className="creatInput" type="text" ref={imageRef} placeholder="Image URL" />
                {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
            </div>
            <div>
                <input className="creatInput" type="text" ref={titleRef} placeholder="Title" />
                {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
            </div>
            <div>
                <textarea className="creatInput"  ref={descriptionRef} placeholder="Description" />
                {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
            </div>
            <p>{errors.general}</p>
            <button onClick={create}>Create Post</button>
        </div>
    );
};

export default CreatePostPage;

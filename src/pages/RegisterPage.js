import React, { useRef, useState, useEffect } from 'react';
import http from "../plugins/http";

const RegisterPage = () => {
    const nameRef = useRef();
    const passRef = useRef();
    const passTwoRef = useRef();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const register = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setError(null);
        setSuccess(null);

        const name = nameRef.current.value;
        const passwordOne = passRef.current.value;
        const passwordTwo = passTwoRef.current.value;

        if (!name || !passwordOne || !passwordTwo) {
            setError("All fields are required.");
            return;
        }

        if (passwordOne !== passwordTwo) {
            setError("Passwords do not match.");
            return;
        }

        const user = {
            name,
            passwordOne,
            passwordTwo
        };

        const res = await http.post("/createaccount", user);

        if (res.success) {
            setSuccess("Registration successful! You can now log in.");
        } else {
            setError(res.message);
        }
    };

    useEffect(() => {
        let errorTimeout;
        let successTimeout;

        if (error) {
            errorTimeout = setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
        }

        if (success) {
            successTimeout = setTimeout(() => setSuccess(null), 5000); // Clear success after 5 seconds
        }

        return () => {
            clearTimeout(errorTimeout);
            clearTimeout(successTimeout);
        };
    }, [error, success]);

    return (
        <div>
            <form onSubmit={register}>
                <input ref={nameRef} type="text" placeholder="Username" autoComplete="username" />
                <input ref={passRef} type="password" placeholder="Password" autoComplete="new-password" />
                <input ref={passTwoRef} type="password" placeholder="Confirm Password" autoComplete="new-password" />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterPage;

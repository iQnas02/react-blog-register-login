import React, { useRef, useState } from 'react';
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setLog }) => {
    const nameRef = useRef();
    const passRef = useRef();
    const nav = useNavigate();
    const [error, setError] = useState({ username: '', password: '', general: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);

    async function login(event) {
        event.preventDefault();
        setError({ username: '', password: '', general: '' });

        const username = nameRef.current.value.trim();
        const password = passRef.current.value.trim();

        let hasError = false;

        if (username === '') {
            setError(prev => ({ ...prev, username: 'Username is required.' }));
            hasError = true;
        }

        if (password === '') {
            setError(prev => ({ ...prev, password: 'Password is required.' }));
            hasError = true;
        }

        if (hasError) return;

        const user = { name: username, password };

        try {
            const res = await http.post("/login", user);

            if (res.success) {
                localStorage.setItem("secret", res.secretKey);
                setLog(username);
                nav('/');
            } else {
                setError(prev => ({ ...prev, general: res.message }));
            }
        } catch (error) {
            setError(prev => ({ ...prev, general: 'An unexpected error occurred. Please try again later.' }));
        }
    }

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form onSubmit={login}>
            <div>
                <div>
                    <input
                        className="mb-3"
                        ref={nameRef}
                        type="text"
                        placeholder="username"
                        autoComplete="username"
                    />
                    {error.username && <p style={{ color: 'red' }}>{error.username}</p>}
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        ref={passRef}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="password"
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        onClick={handlePasswordVisibility}
                        style={{
                            position: 'absolute',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {passwordVisible ? 'Hide' : 'Show'}
                    </button>
                </div>
                {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
                <p>{error.general}</p>
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default LoginPage;

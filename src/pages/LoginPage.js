import React, { useRef, useState } from 'react';
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setLog }) => {
    const nameRef = useRef();
    const passRef = useRef();
    const nav = useNavigate();
    const [error, setError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    async function login() {
        setError(null);
        const user = {
            name: nameRef.current.value,
            password: passRef.current.value
        };

        const res = await http.post("/login", user);

        if (res.success) {
            localStorage.setItem("secret", res.secretKey);
            setLog(user.name);
            nav('/');
        } else {
            setError(res.message);
        }
    }

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <input className="mb-3"
                ref={nameRef}
                type="text"
                placeholder="username"
                autoComplete="username"
            />
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

                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {passwordVisible ? 'Hide' : 'Show'}
                </button>
            </div>
            <p>{error}</p>
            <button onClick={login}>Login</button>
        </div>
    );
};

export default LoginPage;

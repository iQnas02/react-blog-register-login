import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const LoginPage = ({setLog}) => {
    const nameRef = useRef()
    const passRef = useRef()

    const nav = useNavigate()

    const [error, setError] = useState(null)

    async function login() {
        setError(null)
        const user = {
            name: nameRef.current.value,
            password: passRef.current.value
        }

        const res = await http.post("/login", user)

        if(res.success) {
            localStorage.setItem("secret", res.secretKey)
            setLog(user.name)
            nav('/')
        } else {
            setError(res.message)
        }
    }

    return (
        <div>
            <input ref={nameRef} type="text" placeholder="username"/>
            <input ref={passRef} type="text" placeholder="password"/>
            <p>{error}</p>

            <button onClick={login}>Login</button>
        </div>
    );
};

export default LoginPage;
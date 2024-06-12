import React, {useRef} from 'react';
import http from "../plugins/http";

const RegisterPage = () => {
    const nameRef = useRef()
    const passRef = useRef()
    const passTwoRef = useRef()

    async function login() {
        const user = {
            name: nameRef.current.value,
            passwordOne: passRef.current.value,
            passwordTwo: passTwoRef.current.value
        }

        const res = await http.post("/createaccount", user)

        console.log(res)
    }

    return (
        <div>
            <input ref={nameRef} type="text" placeholder="username"/>
            <input ref={passRef} type="text" placeholder="password one"/>
            <input ref={passTwoRef} type="text" placeholder="password two"/>

            <button onClick={login}>Login</button>
        </div>
    );
};

export default RegisterPage;
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/login.css";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
    const { login, isLoggingIn } = useAuthStore();
    const msgRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const showMsg = (type, msg) => {
        if (type) {
            msgRef.current.classList.add("success");
            msgRef.current.textContent = msg;
        } else {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = msg;
        }
        setTimeout(() => {
            msgRef.current.removeAttribute("class");
            msgRef.current.textContent = "";
        }, 3000);
    };

    const validateForm = () => {
        if (!email) {
            showMsg(false, "Enter Email Address");
            return false;
        } else if (!password) {
            showMsg(false, "Enter Password");
            return false;
        } else {
            return true;
        }
    };

    const handleLogin = async e => {
        e.preventDefault();
        if (validateForm()) {
            await login({ email, password }, showMsg,navigate);
        }
    };

    return (
        <div className="login-page">
            <div className="login">
                <h3>Please Login</h3>
                <span ref={msgRef}></span>
                <input
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    placeholder="Enter Email Address"
                />
                <input
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                    type="password"
                    placeholder="Enter Password"
                />
                <button onClick={handleLogin} className="login-btn">
                    {isLoggingIn ? (
                        <>
                            <div className="loading"></div>
                            <span>Please Wait...</span>
                        </>
                    ) : (
                        <span>Login Now</span>
                    )}
                </button>
                <p>
                    Don't have an account?
                    <NavLink to="/signup">Signup</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;

import React, { useState, useEffect, useRef } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import "../styles/login.css";
import useAuthStore from "../store/useAuthStore"


const Signup = () => {
    const navigate = useNavigate()
    const {signup,isSigningUp} = useAuthStore()
    const msgRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        if (!name) {
            showMsg(false, "Enter Full Name");
            return false;
        }else 
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

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await signup({name,email, password},showMsg,navigate)
        }
    };

    return (
        <div className="login-page">
            <div className="login">
                <h3>Create New Account</h3>
                <span ref={msgRef}></span>
                <input
                    onChange={e => {
                        setName(e.target.value);
                    }}
                    value={name}
                    type="text"
                    placeholder="Enter Full Name"
                />
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
                    {isSigningUp ? (
                        <>
                            <div className="loading"></div>
                            <span>Please Wait...</span>
                        </>
                    ) : (
                        <span>Create Now</span>
                    )}
                </button>
                <p>
                    Already have an account?
                    <NavLink to="/login">Login</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;

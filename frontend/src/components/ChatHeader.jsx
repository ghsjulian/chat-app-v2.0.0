import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import "../styles/chat.css";
import useMessageStore from "../store/useMessageStore";
import useAuthStore from "../store/useAuthStore";
import useSocketStore from "../store/useSocketStore";



const ChatHeader = () => {
    const { isHeaderOff, setIsHeaderOff, setConversation } = useMessageStore();
    const { onlineUsers, socket, disconnectSocket } = useSocketStore();
    const navigate = useNavigate();

    const {
        checkAuth,
        isCheckingAuth,
        authUser,
        logout,
        isDarkMood,
        setDarkmood,
        setLightmood,
        getOneUser,
        getViewUser
    } = useAuthStore();
    const [isContact, setIsContact] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const param = useParams();
    const backfromContact = async () => {
        setIsContact(true);
        await checkAuth();
    };
    const openSearch = () => {
        setIsSearch(!isSearch);
    };

    const themeToggle = async () => {
        !isDarkMood ? setDarkmood() : setLightmood();
        await checkAuth();
    };

    const closeChat = () => {
        setIsHeaderOff(false);
        navigate("/");
        //setConversation();
    };

    useEffect(() => {
        getOneUser(param.id);
    }, [getOneUser]);

    return (
        <>
            <div className="chat-user">
                <h3
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <img src="/icons/chat-1.png" />
                    ChatApp
                </h3>
                <div className="mid">
                    <NavLink
                        onClick={closeChat}
                        to={`/profile/${getViewUser?._id}`}
                        className="user"
                    >
                        <div
                        style={{
                                   backgroundColor:`${onlineUsers?.includes(param?.id)? "#27be04" : "#353b3a"}`
                                }}
                        className="user-circle">
                            <div className={onlineUsers?.includes(param?.id)? "online":"offline"}></div>
                            <img
                                src={
                                    getViewUser?.avatar
                                        ? getViewUser?.avatar
                                        : "/icons/user-1.png"
                                }
                            />
                        </div>
                        <div className="u-text">
                            <strong>{getViewUser?.name}</strong>
                            <span>{onlineUsers?.includes(param?.id)? "Online":"Offline"} </span>
                        </div>
                    </NavLink>
                    <img
                        onClick={closeChat}
                        id="close"
                        src="/icons/close.png"
                    />
                </div>
                <div className="right-nav">
                    <img
                        onClick={() => {
                            setIsContact(true);
                        }}
                        src="/icons/chat-3.png"
                    />
                    <img
                        onClick={() => {
                            setIsProfile(true);
                        }}
                        src="/icons/user-1.png"
                    />
                    <img
                        onClick={async e => {
                            e.preventDefault();
                            await logout();
                        }}
                        src="/icons/logout.png"
                    />
                    <img
                        onClick={themeToggle}
                        src={
                            isDarkMood
                                ? "/icons/light-mood.png"
                                : "/icons/dark-mood.png"
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default ChatHeader;

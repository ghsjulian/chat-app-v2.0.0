import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import ContactUsers from "./ContactUsers";
import UserProfile from "./UserProfile";
import useAuthStore from "../store/useAuthStore";
import LoadingSpinner from "../components/LoadingSpinner";
import useMessageStore from "../store/useMessageStore";

const Header = () => {
    const { isHeaderOff } = useMessageStore();
    const navigate = useNavigate();
    const param = useParams();
    const location = useLocation();
    const [viewUser, setViewUser] = useState(false);

    const searchRef = useRef(null);
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

    useEffect(() => {
        let path = location.pathname.split("/");
        if (path.length > 1) {
            if (path[1] === "profile") {
                setViewUser(true);
                getOneUser(param.id);
            }
        }
    }, [location]);

    return (
        <>
            {!isHeaderOff && (
                <header>
                    <h3
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <img src="/icons/chat-1.png" />
                        ChatApp
                    </h3>
                    <div className="option">
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
                </header>
            )}
            <div
                className={`${isContact && "mobile-left-section"} left-section`}
            >
                <div className="head">
                    <img
                        onClick={() => {
                            setIsContact(false);
                            setIsSearch(false);
                        }}
                        id="back"
                        src="/icons/back-1.png"
                    />
                    {isSearch ? (
                        <div className="search-area">
                            <input type="text" placeholder="Search A User..." />
                        </div>
                    ) : (
                        <h3>Your Contacts (5)</h3>
                    )}
                    <img
                        ref={searchRef}
                        onClick={openSearch}
                        id="search"
                        src={
                            isSearch ? "/icons/close.png" : "/icons/search.png"
                        }
                    />
                </div>
                <ContactUsers close={setIsContact} />
            </div>
            <div
                className={`${
                    isProfile && "mobile-right-section"
                } right-section`}
            >
                <div className="head">
                    <img
                        onClick={() => {
                            setIsProfile(false);
                        }}
                        id="back"
                        src="/icons/back-1.png"
                    />
                    <h3>Profile Information</h3>
                    <img
                        onClick={() => {
                            setIsProfile(false);
                        }}
                        id="back"
                        src="/icons/close.png"
                    />
                </div>
                {/*-- User Profile Here... --*/}
                <UserProfile user={authUser} />
            </div>
            {isCheckingAuth && <LoadingSpinner />}
        </>
    );
};

export default Header;

import React, { useState, useEffect, useRef } from "react";
import "../styles/profile.css";
import useAuthStore from "../store/useAuthStore";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const param = useParams();
    const location = useLocation();
    const [viewUser, setViewUser] = useState(false);

    const fileRef = useRef(null);
    const [fileData, setFileData] = useState(null);
    const [imgFile, setImg] = useState(null);
    const {
        authUser,
        isUpdatingProfile,
        updateProfile,
        checkAuth,
        isCheckingAuth,
        getViewUser,
        getOneUser,
        isAdding,
        addContact
    } = useAuthStore();

    const handleFile = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            setFileData(base64Image);
            await updateProfile({ avatar: base64Image });
        };
    };

    useEffect(() => {
        let path = location.pathname.split("/");
        if (path.length > 1) {
            if (path[1] === "profile") {
                setViewUser(true);
                getOneUser(param.id);
            }
        }
        checkAuth();
    }, [location, checkAuth]);

    useEffect(() => {
        fileData ? setImg(fileData) : setImg(getViewUser?.avatar) || null;
    }, [fileData]);

    if (isUpdatingProfile) <ProfileSkeleton />;

    return (
        <>
            <div className="profile-area">
                <div className="user-img">
                    <img
                        id="img"
                        src={
                            getViewUser?.avatar
                                ? getViewUser?.avatar
                                : "/icons/user-2.png"
                        }
                    />
                    {/*
                    <img
                        onClick={() => {
                            fileRef.current.click();
                        }}
                        id="upload"
                        src="/icons/camera.png"
                    />*/}
                </div>
                <h3>{getViewUser?.name}</h3>
                <p>{getViewUser?.email}</p>
                <div className="info">
                    <p>
                        Join Since - <span>22 October 2025</span>
                    </p>
                </div>
                <div className="btn-area">
                    <button
                        onClick={e => {
                            addContact(param.id, e.target);
                        }}
                        className={authUser?.contact?.includes(param?.id) ? "added-btn" : "add-btn"}
                    >
                        {authUser?.contact?.includes(param?.id) ? "Remove Contact" : "Add Contact"}
                    </button>
                    <button
                        onClick={() => {
                            navigate("/chat/" + param.id);
                        }}
                        className="chat-btn"
                    >
                        Chat Now
                    </button>
                </div>
                <input
                    onChange={handleFile}
                    ref={fileRef}
                    type="file"
                    accept="*/*"
                    id="file"
                    hidden={true}
                />
            </div>
            {isUpdatingProfile && <LoadingSpinner />}
        </>
    );
};

export default Profile;

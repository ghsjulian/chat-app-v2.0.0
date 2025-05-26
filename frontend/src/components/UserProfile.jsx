import React, { useState, useEffect, useRef } from "react";
import "../styles/profile.css";
import useAuthStore from "../store/useAuthStore";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { NavLink } from "react-router-dom";
import SavedContact from "../components/SavedContact"


const UserProfile = ({ user }) => {
    const fileRef = useRef(null);
    const [fileData, setFileData] = useState(null);
    const [imgFile, setImg] = useState(null);
    const {
        authUser,
        isUpdatingProfile,
        updateProfile,
        checkAuth,
        isCheckingAuth,
        isAdding,
        addContact,
        getOneUser,
        getViewUser
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
        fileData ? setImg(fileData) : setImg(user?.avatar) || null;
    }, [fileData]);

    if (isUpdatingProfile) <ProfileSkeleton />;

    return (
        <>
            <div className="profile-area">
                <div className="user-img">
                    <img
                        id="img"
                        src={imgFile ? imgFile : "/icons/user-2.png"}
                    />
                    <img
                        onClick={() => {
                            fileRef.current.click();
                        }}
                        id="upload"
                        src="/icons/camera.png"
                    />
                </div>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
                <div className="info">
                    <p>
                        Join Since - <span>22 October 2025</span>
                    </p>
                </div>
                {/*
                <div className="btn-area">
                    <button className="add-btn">Add Contact</button>
                    <button className="chat-btn">Chat Now</button>
                </div>
                */}
                <input
                    onChange={handleFile}
                    ref={fileRef}
                    type="file"
                    accept="*/*"
                    id="file"
                    hidden={true}
                />
            </div>
            <div className="contact-list">
                <h2>Your Contact List ({user?.contact?.length})</h2>
                {user.contact.length != 0 &&
                    user.contact.map((item, index) => {
                        return <SavedContact key={index} item={item} />
                    })}
            </div>
            {isUpdatingProfile && <LoadingSpinner />}
        </>
    );
};

export default UserProfile;

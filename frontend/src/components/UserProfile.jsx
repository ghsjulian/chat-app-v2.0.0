import React, { useState, useEffect, useRef } from "react";
import "../styles/profile.css";
import useAuthStore from "../store/useAuthStore";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { NavLink } from "react-router-dom";
import useSocketStore from "../store/useSocketStore";

const UserProfile = ({ user }) => {
    const { onlineUsers } = useSocketStore();
    const fileRef = useRef(null);
    const [fileData, setFileData] = useState(null);
    const [imgFile, setImg] = useState(null);
    const [contactUsers, setContactUsers] = useState([]); // State to hold contact user data
    const {
        authUser,
        isUpdatingProfile,
        updateProfile,
        checkAuth,
        isCheckingAuth,
        isAdding,
        addContact,
        getOneUser,
        getViewUser,
        getUserById,
        closeProfile
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

    // Fetch contact user data when user.contact changes
    useEffect(() => {
        const fetchContactUsers = async () => {
            const usersData = await Promise.all(
                user?.contact?.map(async contactId => {
                    const contactData = await getUserById(contactId);
                    return contactData;
                })
            );
            setContactUsers(usersData);
        };

        if (user?.contact) {
            fetchContactUsers();
        }
    }, [user?.contact, getUserById]);

    if (isUpdatingProfile) return <ProfileSkeleton />;

    return (
        <>
            <div className="profile-area">
                <div className="user-img">
                    <img
                        id="img"
                        src={imgFile ? imgFile : "/icons/user-2.png"}
                        alt="User  Avatar"
                    />
                    <img
                        onClick={() => {
                            fileRef.current.click();
                        }}
                        id="upload"
                        src="/icons/camera.png"
                        alt="Upload"
                    />
                </div>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
                <div className="info">
                    <p>
                        Join Since - <span>22 October 2025</span>
                    </p>
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
            <div className="contact-list">
                <h2>Your Contact List ({contactUsers?.length})</h2>
                {contactUsers?.length > 0 &&
                    contactUsers?.map((contact, index) => {
                        return (
                            <NavLink
                                onClick={() => {
                                    closeProfile(false);
                                }}
                                key={index}
                                to={`/profile/${contact?._id}`}
                                className="user"
                            >
                                <div>
                                    <div
                                        style={{
                                            border: `${
                                                onlineUsers?.includes(
                                                    contact?._id
                                                )
                                                    ? "1.5px solid #27be04"
                                                    : "1.5px solid #353b3a"
                                            }`
                                        }}
                                        className="user-round"
                                    >
                                        <div
                                            className={
                                                onlineUsers?.includes(
                                                    contact?._id
                                                )
                                                    ? "online"
                                                    : "offline"
                                            }
                                        ></div>
                                        <img
                                            src={
                                                contact?.avatar
                                                    ? contact?.avatar
                                                    : "/icons/user-1.png"
                                            }
                                            alt={contact?.name}
                                        />
                                    </div>
                                    <p>{contact?.name}</p>
                                </div>
                                <button
                                    onClick={e => {
                                        addContact(contact?._id, e.target);
                                    }}
                                    className="add-btn"
                                >
                                    <img src="/icons/delete.png" alt="Remove" />
                                    <p>Remove</p>
                                </button>
                            </NavLink>
                        );
                    })}
            </div>
            {isUpdatingProfile && <LoadingSpinner />}
        </>
    );
};

export default UserProfile;

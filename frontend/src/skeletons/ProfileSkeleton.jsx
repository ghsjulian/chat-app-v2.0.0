import React from "react";
import "../styles/skeleton.css";

const ProfileSkeleton = () => {
    return (
        <>
            <div className="profile-area -sk">
                <div className="user-img">
                    <div className="img"></div>
                </div>
                <h3></h3>
                <p></p>
                <div className="info">
                    <p>
                        <span></span>
                    </p>
                </div>
                <div className="btn-area">
                    <div ></div>
                    <div ></div>
                </div>
            </div>
        </>
    );
};

export default ProfileSkeleton;

import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/skeleton.css";

const UserContactsSkeleton = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
        <div className="user-area -sk">
            {arr.map((item, index) => {
                return (
                    <NavLink key={index+3} to="#" className="user">
                        <div>
                            <div className="img"></div>
                            <span></span>
                        </div>
                        <p></p>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default UserContactsSkeleton;

import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const SavedContact = ({ item }) => {
    const { getViewUser, getOneUser, isAdding, addContact } = useAuthStore();

    useEffect(() => {
        getOneUser(item);
    }, [item]);
    return (
        <>
            <NavLink to={`/profile/${item}`} className="user">
                <div>
                    <img src={getViewUser?.avatar ? getViewUser?.avatar : "/icons/user-1.png"} />
                    <p>{getViewUser.name}</p>
                </div>
                <button
                    onClick={e => {
                        addContact(item, e.target);
                    }}
                    className="add-btn"
                >
                    <img src="/icons/delete.png" />
                    <p>Remove</p>
                </button>
            </NavLink>
        </>
    );
};

export default SavedContact;

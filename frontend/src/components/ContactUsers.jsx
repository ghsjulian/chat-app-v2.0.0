import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContactsSkeleton from "../skeletons/UserContactsSkeleton";
import useAuthStore from "../store/useAuthStore";
import useSocketStore from "../store/useSocketStore";

const ContactUsers = ({ close }) => {
    const { getUsers, isFetchingUsers, allUsers } = useAuthStore();
    const { onlineUsers, socket } = useSocketStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isFetchingUsers) {
        return <UserContactsSkeleton />;
    }

    return (
        <div className="user-area">
            {allUsers.length == 0 && <h2>No User Found</h2>}
            {allUsers.length > 0 &&
                allUsers.map((user, index) => {
                    return (
                        <NavLink
                            key={index}
                            onClick={() => close(false)}
                            to={`/chat/${user?._id}`}
                            className="user"
                        >
                            <div>
                                <div style={{
                                   backgroundColor:`${onlineUsers?.includes(user?._id)? "#27be04" : "#353b3a"}`
                                }} className="user-circle">
                                    <div className={onlineUsers?.includes(user?._id) ? "online":"offline"}></div>
                                    <img
                                        src={
                                            user?.avatar
                                                ? user?.avatar
                                                : "/icons/user-1.png"
                                        }
                                    />
                                </div>
                                <p>{user?.name}</p>
                            </div>
                        </NavLink>
                    );
                })}
        </div>
    );

};

export default ContactUsers;

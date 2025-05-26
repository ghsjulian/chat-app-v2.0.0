import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContactsSkeleton from "../skeletons/UserContactsSkeleton";
import useAuthStore from "../store/useAuthStore";

const ContactUsers = ({ close }) => {
    const { getUsers, isFetchingUsers, allUsers } = useAuthStore();

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
                                <img
                                    src={
                                        user?.avatar
                                            ? user?.avatar
                                            : "/icons/user-1.png"
                                    }
                                />
                                <p>{user?.name}</p>
                            </div>
                        </NavLink>
                    );
                })}
        </div>
    );

    /*
    return (
        <div className="user-area">
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
            <NavLink to="/" className="user">
                <div>
                    <img src="/icons/user-1.png" />
                    <p>Ghs Julian</p>
                </div>
            </NavLink>
        </div>
    );
    */
};

export default ContactUsers;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContactsSkeleton from "../skeletons/UserContactsSkeleton";
import useAuthStore from "../store/useAuthStore";
import useSocketStore from "../store/useSocketStore";
import useMessageStore from "../store/useMessageStore";

const ContactUsers = ({ close }) => {
    const { getUsers, isFetchingUsers, allUsers } = useAuthStore();
    const { onlineUsers, socket, lastMessages } = useSocketStore();
    const { getOneMessage } = useMessageStore();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (allUsers.length == 0) {
            getUsers();
        }

        const fetchMessages = async () => {
            const messages = await Promise.all(
                allUsers?.map(async user => {
                    const message = await getOneMessage(user?._id);
                    return message;
                })
            );
            setLoading(false);
            setMessages(messages);
        };

        fetchMessages();
    }, [getUsers, onlineUsers]);

    if (isFetchingUsers) {
        return <UserContactsSkeleton />;
    }
    console.log(messages);
    return (
        <div className="user-area">
            {allUsers.length == 0 && <h2>No User Found</h2>}
            {!loading &&
                allUsers.length > 0 &&
                allUsers.map((user, index) => {
                    const dataa = messages[index];
                    const data = dataa[0]?.length != 0 ? dataa[0] : {};
                    return (
                        <NavLink
                            key={index}
                            onClick={() => close(false)}
                            to={`/chat/${user?._id}`}
                            className="user"
                        >
                            <div>
                                <div
                                    style={{
                                        backgroundColor: `${
                                            onlineUsers?.includes(user?._id)
                                                ? "#27be04"
                                                : "#353b3a"
                                        }`
                                    }}
                                    className="user-circle"
                                >
                                    <div
                                        className={
                                            onlineUsers?.includes(user?._id)
                                                ? "online"
                                                : "offline"
                                        }
                                    ></div>
                                    <img
                                        src={
                                            user?.avatar
                                                ? user?.avatar
                                                : "/icons/user-1.png"
                                        }
                                    />
                                </div>
                                <div className="mid-flex">
                                    <p>{user?.name}</p>
                                    <span>{data?._id}</span>
                                </div>
                            </div>
                            <span className="time">12:40PM</span>
                            <span className="new">3</span>
                        </NavLink>
                    );
                })}
        </div>
    );
};

export default ContactUsers;

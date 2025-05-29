import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContactsSkeleton from "../skeletons/UserContactsSkeleton";
import useAuthStore from "../store/useAuthStore";
import useSocketStore from "../store/useSocketStore";
import useMessageStore from "../store/useMessageStore";
import { getTime } from "../libs/utils";

const ContactUsers = ({ close }) => {
    const { getUsers, isFetchingUsers, allUsers } = useAuthStore();
    const { onlineUsers, isSent, socket } = useSocketStore();
    const { getOneMessage } = useMessageStore();

    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);

    // Fetch users if none on mount
    useEffect(() => {
        if (allUsers?.length === 0) {
            getUsers();
        }
    }, [allUsers?.length, getUsers]);

    // Fetch messages only after allUsers are available
    useEffect(() => {
        const fetchMessages = async () => {
            if (allUsers?.length === 0) {
                setMessages([]);
                setLoadingMessages(false);
                return;
            }

            setLoadingMessages(true);
            try {
                const fetchedMessages = await Promise.all(
                    allUsers?.map(async user => {
                        try {
                            const message = await getOneMessage(user?._id);
                            return message;
                        } catch (error) {
                            console.error(
                                `Error fetching message for user ${user?._id}:`,
                                error
                            );
                            return [];
                        }
                    })
                );
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
                setMessages([]);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [allUsers, isSent, getOneMessage]);

    if (isFetchingUsers || loadingMessages) {
        return <UserContactsSkeleton />;
    }

    if (allUsers?.length === 0) {
        return <h2>No User Found</h2>;
    }

    // console.log(messages);

    return (
        <div className="user-area">
            {allUsers?.map((user, index) => {
                const dataa = messages[index];
                const data =
                    dataa && dataa?.length > 0 ? dataa[dataa?.length - 1] : {};
                return (
                    <NavLink
                        key={user?._id || index}
                        onClick={() => close(false)}
                        to={`/chat/${user?._id}`}
                        className="user"
                    >
                        <div>
                            <div
                                style={{
                                    backgroundColor: onlineUsers?.includes(
                                        user?._id
                                    )
                                        ? "#27be04"
                                        : "#353b3a"
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
                                    alt={`${user?.name}'s avatar`}
                                />
                            </div>
                            <div className="mid-flex">
                                <p>{user?.name}</p>
                                <span>{data?.message}</span>
                            </div>
                        </div>
                        {data?.seen && (
                            <>
                                <span className="time">
                                    {getTime(data?.createdAt)}
                                </span>
                                <span className="new"></span>
                            </>
                        )}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default ContactUsers;

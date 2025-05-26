import React from "react";

const ChatSkeleton = () => {
    return (
        <>
            <div className="-sk-left-1 receiver chat-bubble"></div>
            <div className="-sk-right-1 sender chat-bubble"></div>

            <div className="-sk-left-2 receiver chat-bubble"></div>
            <div className="-sk-right-2 sender chat-bubble"></div>

            <div className="-sk-left-3 receiver chat-bubble"></div>
            <div className="-sk-right-3 sender chat-bubble"></div>

            <div className="-sk-left-4 receiver chat-bubble"></div>
            <div className="-sk-right-4 sender chat-bubble"></div>

            <div className="-sk-left-5 receiver chat-bubble"></div>
            <div className="-sk-right-5 sender chat-bubble"></div>

 </>
    );
};

export default ChatSkeleton;

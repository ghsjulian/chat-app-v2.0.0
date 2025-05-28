import { create } from "zustand";
import axios from "../libs/axios.js";
import { io } from "socket.io-client";
import useAuthStore from "./useAuthStore";
import useMessageStore from "./useMessageStore";

const socket_server_url = [
    "http://localhost:3000",
    "https://chat-app-v2-0-0.onrender.com"
];

const useSocketStore = create((set, get) => ({
    onlineUsers: [],
    lastMessages: [],
    socket: null,

    connectSocket: async () => {
        const user = useAuthStore.getState().authUser;
        if (!user || get().socket?.connected) return;

        const socket = io(socket_server_url[0], {
            query: {
                user_id: user._id
            }
        });
        socket.connect();
        set({ socket: socket });
        socket.on("online-users", activeUsers => {
            set({ onlineUsers: activeUsers });
        });
    },

    setMessageSeen: message_id => {
        if (!message_id) return;
        const socket = get().socket;
        socket.emit("set-seen", message_id);
    },

    messageListener: chatUser => {
        if (!chatUser) return;
        const socket = get().socket;

        if (!socket || !socket.connected) return; // Ensure socket is connected

        const handleNewMessage = newMessage => {
            const isMessageSentFromSelectedUser =
                newMessage.sender_id === chatUser;
            if (!isMessageSentFromSelectedUser) return;

            // Update the message store correctly
            useMessageStore.setState(state => ({
                conversations: [...state.conversations, newMessage]
            }));
        };

        socket.on("new-message", handleNewMessage);

        // Cleanup function to remove the listener when no longer needed
        return () => {
            socket.off("new-message", handleNewMessage);
        };
    },

    getLastMessages: () => {
        const user = useAuthStore.getState().authUser;
        if (!user) return;
        const socket = get().socket;
        if (!socket || !socket.connected) return; // Ensure socket is connected

        // Request for last message
        socket.emit("get-last-message", user?._id);

        const handleLastMessage = lastMessage => {
            console.log("Last message",lastMessage);
            set({ lastMessages: lastMessage });
        };

        socket.on("last-message", handleLastMessage);
        return () => {
            socket.off("last-message", handleLastMessage);
        };
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}));

export default useSocketStore;

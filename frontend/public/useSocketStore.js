import { create } from "zustand";
import axios from "../libs/axios.js";
import { io } from "socket.io-client";
import useAuthStore from "./useAuthStore";
import useMessageStore from "./useMessageStore";

const socket_server_url = "http://localhost:3000";

const useSocketStore = create((set, get) => ({
    onlineUsers: [],
    socket: null,

    connectSocket: async () => {
        const user = useAuthStore.getState().authUser;
        if (!user || get().socket?.connected) return;

        const socket = io(socket_server_url, {
            query: {
                user_id: user._id
            }
        });
        socket.connect();
        set({ socket: socket });
        socket.on("online-users", (activeUsers) => {
      set({ onlineUsers: activeUsers });
    });
    },
    messageListener: chatUser => {
        if (!chatUser) return;
        const socket = get().socket;

        socket.on("new-message", newMessage => {
            const isMessageSentFromSelectedUser =
                newMessage.sender_id === chatUser;
            if (!isMessageSentFromSelectedUser) return;
            const conversations = useMessageStore.getState().conversations;
            useMessageStore.set({
                conversations: [
                    ...useMessageStore.getState().conversations,
                    newMessage
                ]
            });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}));

export default useSocketStore;

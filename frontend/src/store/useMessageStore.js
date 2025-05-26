import { create } from "zustand";
import axios from "../libs/axios";

const useMessageStore = create((set, get) => ({
    conversations: [],
    isHeaderOff: false,
    isFetchingChats : true,

    setIsHeaderOff: type => {
        set({ isHeaderOff: type });
    },
    
    setConversation : ()=>{
        set({conversations:[]})
    },

    sendText: async data => {
        try {
            const res = await axios.post(
                "/message/send-message/" + data.receiver_id,
                data
            );
            if (res?.data?.success) {
                const currentConversations = get().conversations;
                set({
                    conversations: [...currentConversations, res.data.message]
                });
            }
        } catch (error) {
            console.log(
                "Error in sending message client side --> ",
                error.message
            );
        }
    },

    getMessages: async id => {
        try {
            const res = await axios.get("/message/get-messages/" + id);
            if (res?.data) {
                set({ conversations: res.data }); // Set conversations directly
            } else {
                set({ conversations: [] });
            }
        } catch (error) {
            console.log(
                "Error in fetching messages client side --> ",
                error.message
            );
        } finally {
            set({isFetchingChats:false})
        }
    }
}));

export default useMessageStore;

import { create } from "zustand";
import axios from "../libs/axios";

const useAuthStore = create((set, get) => ({
    authUser: JSON.parse(localStorage.getItem("chat-user")) || null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,
    isLogouting: false,
    isDarkMood: localStorage.getItem("theme") ? true : false,
    theme: localStorage.getItem("theme") || "light-mood",
    allUsers: [],
    isFetchingUsers: false,
    getViewUser: {},
    isAdding: false,

    setAuthUser: () => {
        let user = JSON.parse(localStorage.getItem("chat-user")) || null;
        set({ authUser: user });
    },

    setDarkmood: () => {
        document.body.classList.remove("light-mood");
        document.body.classList.add("dark-mood");
        set({ isDarkMood: true });
        localStorage.setItem("theme", "dark-mood");
    },
    setLightmood: () => {
        document.body.classList.remove("dark-mood");
        document.body.classList.add("light-mood");
        set({ isDarkMood: false });
        localStorage.setItem("theme", "light-mood");
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axios.get("/auth/check");
            set({ authUser: res.data.user });
            localStorage.setItem("chat-user", JSON.stringify(res.data.user));
        } catch (error) {
            console.log("Error in checkAuth Client Side :", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    getOneUser: async id => {
        set({ isCheckingAuth: true });
        try {
            const res = await axios.get("/auth/get-user/" + id);
            set({ getViewUser: res.data.user });
        } catch (error) {
            console.log("Error in checkAuth Client Side :", error);
            set({ getViewUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    getUsers: async () => {
        set({ isFetchingUsers: true });
        try {
            const res = await axios.get("/auth/get-users");
            if (res?.data?.success) {
                set({ allUsers: res.data.users });
            }
        } catch (error) {
            console.log("Error in checkAuth Client Side :", error);
            set({ allUsers: null });
        } finally {
            set({ isFetchingUsers: false });
        }
    },

    signup: async (data, showMsg, navigate) => {
        set({ isSigningUp: true });
        try {
            const res = await axios.post("/auth/signup", data);
            if (res.data?.success) {
                set({ authUser: res.data.user });
                s;
                localStorage.setItem(
                    "chat-user",
                    JSON.stringify(res.data.user)
                );
                showMsg(res.data.user, res.data.message);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            showMsg(false, error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data, showMsg, navigate) => {
        set({ isLoggingIn: true });
        try {
            const res = await axios.post("/auth/login", data);
            if (res.data?.success) {
                set({ authUser: res.data.user });
                localStorage.setItem(
                    "chat-user",
                    JSON.stringify(res.data.user)
                );
                showMsg(res.data.user, res.data.message);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            showMsg(false, error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        set({ isLogouting: true });
        try {
            const res = await axios.post("/auth/logout");
            if (res.data?.success) {
                set({ authUser: null });
                localStorage.removeItem("chat-user");
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ isLogouting: false });
        }
    },

    updateProfile: async data => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axios.put("/auth/update-profile", data);
            set({ authUser: res?.data?.user });
            localStorage.setItem("chat-user", JSON.stringify(res.data.user));
            get().checkAuth();
        } catch (error) {
            console.log("error in update profile client side -- :", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    addContact: async (id, tag) => {
        tag.textContent = "Processing...";
        set({ isAdding: true });
        try {
            const res = await axios.get("/auth/add-contact/" + id);
            if (res?.data?.type === "ADDED") {
                tag.textContent = "Remove Contact";
                tag.classList.remove("add-btn");
                tag.classList.add("added-btn");
            } else {
                tag.classList.remove("added-btn");
                tag.classList.add("add-btn");
                tag.textContent = "Add Contact";
            }
            await get().checkAuth()
        } catch (error) {
            console.log("Error in addContact Client Side :", error);
        } finally {
            set({ isAdding: false });
        }
    }
}));

export default useAuthStore;

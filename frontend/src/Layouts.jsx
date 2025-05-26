import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/ui.css";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import useAuthStore from "./store/useAuthStore";

const Layouts = () => {
    const { isCheckingAuth, isLogouting, isUpdatingProfile } = useAuthStore();
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            {isCheckingAuth && <LoadingSpinner />}
            {isLogouting && <LoadingSpinner />}
        </>
    );
};

export default Layouts;

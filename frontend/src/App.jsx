import React, { useEffect } from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
    Routes,
    Route
} from "react-router-dom";
import myRoutes from "./Router";
import useAuthStore from "./store/useAuthStore";

const router = createBrowserRouter(myRoutes);
const App = () => {
    const { checkAuth, setAuthUser, isCheckingAuth, authUser, theme } = useAuthStore();
    useEffect(() => {
        checkAuth();
        setAuthUser();
        document.body.classList.add(theme)
    }, [setAuthUser]);
    return <RouterProvider router={router} />;
};

export default App;

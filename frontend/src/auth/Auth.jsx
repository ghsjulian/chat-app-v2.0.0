import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export const UseAuth = ({ children }) => {
    const { checkAuth, authUser } = useAuthStore();
    return authUser ? children : <Navigate to="/login" />;
};
export const IsLoggedIn = ({ children }) => {
    const { checkAuth, authUser } = useAuthStore();
    return !authUser ? children : <Navigate to="/" />;
};

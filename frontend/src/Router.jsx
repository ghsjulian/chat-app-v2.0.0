import { useNavigate } from "react-router-dom";
import { UseAuth, IsLoggedIn } from "./auth/Auth";

// Import Web Components
import Layouts from "./Layouts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Profile from "./pages/Profile";

const myRoutes = [
    {
        path: "/",
        element: (
            <UseAuth>
                <Layouts />
            </UseAuth>
        ),
        children: [
            {
                index: true,
                path: "/",
                element: (
                    <UseAuth>
                        <Home />
                    </UseAuth>
                )
            },
            {
                path: "/profile/:id",
                element: (
                    <UseAuth>
                        <Profile />
                    </UseAuth>
                )
            },
                {
        path: "/chat/:id",
        element: (
            <UseAuth>
                <ChatRoom />
            </UseAuth>
        )
    },
        ]
    },
    {
        path: "/login",
        element: (
            <IsLoggedIn>
                <Login />
            </IsLoggedIn>
        )
    },
    {
        path: "/signup",
        element: (
            <IsLoggedIn>
                <Signup />
            </IsLoggedIn>
        )
    }
];

export default myRoutes;

import { createBrowserRouter, } from "react-router";
import Login from "../src/features/auth/pages/Login";
import Register from "../src/features/auth/pages/Register";
import Protected from "../src/features/auth/components/Protected"
import Home from "./features/interview/pages/Home";

import "../src/style.scss"

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    }
])


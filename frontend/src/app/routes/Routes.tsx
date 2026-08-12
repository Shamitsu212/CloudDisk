import Log_Page from "../../auth/page/Log_Page";
import Reg_Page from "../../auth/page/Reg_Page";

import MainPage from "../../main/page/MainPage";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

export const routes = [
    {
        path: "/login",
        element: <Log_Page />,
    },
    {
        path: "/register",
        element: <Reg_Page />,
    },
    {
        path: "/",
        element: 
            <ProtectedRoute>
                <MainPage />
            </ProtectedRoute>,
    }
];
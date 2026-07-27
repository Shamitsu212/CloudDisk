import Auth_Page from "../../auth/page/Auth_Page";
import MainPage from "../../main/page/MainPage";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

export const routes = [
    {
        path: "/login",
        element: <Auth_Page />,
    },
    {
        path: "/",
        element: 
            <ProtectedRoute>
                <MainPage />
            </ProtectedRoute>,
    }
];
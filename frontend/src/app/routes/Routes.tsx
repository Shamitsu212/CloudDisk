import Auth_Page from "../../auth/page/Auth_Page";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

export const routes = [
    {
        path: "/",
        element: <Auth_Page />,
    },
];
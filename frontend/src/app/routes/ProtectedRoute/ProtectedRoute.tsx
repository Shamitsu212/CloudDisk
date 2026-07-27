import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store"

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    
    const isAuth = useSelector(
        (state: RootState) => state.auth.isAuth
    );

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
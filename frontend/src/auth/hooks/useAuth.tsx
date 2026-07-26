import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../slice/authSlice";

export const useAuth = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {

        const token = localStorage.getItem("accessToken");

        if (token) {
            dispatch(setToken(token));
        }

    }, [dispatch]);
};
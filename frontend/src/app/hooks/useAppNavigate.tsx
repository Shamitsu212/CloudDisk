import { useNavigate } from "react-router-dom";

export function useAppNavigate(){

    const navigate = useNavigate()

    return{
        toMain: () => navigate("/"),
        toLogin: () => navigate("/login"),
        toFolder: (id:number) => navigate(`/folder/${id}`)
    }
}
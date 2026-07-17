import type { LoginDto, LoginResponse } from "./types";

export const loginRequest = async( data: LoginDto): Promise<LoginResponse> => {

    const response = await fetch("http://localhost:5000/auth/login", {

        method: "POST",

        headers: {"Content-Type": "application/json"},

        credentials: "include",

        body: JSON.stringify(data)

    })

    if(!response.ok){
        throw new Error("Ошибка авторизации")
    }

    return response.json()

}
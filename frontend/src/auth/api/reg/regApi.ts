import type { RegDto, RegResponse } from "./types";


export const regRequest = async(data:RegDto): Promise<RegResponse> => {

    const response = await fetch("http://localhost:8080/api/v1/auth/register", {

        method: "POST",

        headers: {"Content-Type": "application/json"},

        credentials: "include",

        body: JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error("Ошибка регистрации")
    }

    return response.json()

}
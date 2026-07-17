import type { User } from "../../slice/types"

export interface LoginDto {

    email: string,
    password: string

}

export interface LoginResponse {

    accessToken: string,
    user:User

}
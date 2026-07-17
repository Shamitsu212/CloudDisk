import type { User } from "../../slice/types";

export interface RegDto {

    email: string;
    name: string;
    password: string;

}

export interface RegResponse {

    accessToken: string,
    user:User

}
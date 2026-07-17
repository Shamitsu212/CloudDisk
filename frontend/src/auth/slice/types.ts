export interface User {

    id: number,

    email: string,
    name: string,

}

export interface AuthState {

    accessToken: string | null,

    user: User | null,

    isAuth: boolean,
    isLoading: boolean

}
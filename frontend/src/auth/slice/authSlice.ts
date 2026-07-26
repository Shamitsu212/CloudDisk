import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./types";




const initialState: AuthState = {

    accessToken: null,

    user: null,

    isAuth: false,
    isLoading: false
     
}

const authSlice = createSlice({

    name: "auth",
    
    initialState,

    reducers: {

        login(state, action: PayloadAction<{accessToken:string; user:User}>){
            
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user

            state.isAuth = true

            localStorage.setItem(
                "accessToken",
                action.payload.accessToken
            );
        },

        logout(state){
            
            state.accessToken = null
            state.user = null

            state.isAuth = false

        },

        setLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },

        setToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            state.isAuth = true;
        }

    }

})

export const { login, logout, setLoading, setToken } = authSlice.actions
export default authSlice.reducer
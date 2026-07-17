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
        },

        logout(state){
            
            state.accessToken = null
            state.user = null

            state.isAuth = false

        },

        setLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        }

    }

})

export const { login, logout, setLoading } = authSlice.actions
export default authSlice.reducer
import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../../auth/slice/authSlice'
import folderReducer from '../../main/slice/folderSlice'


export const store = configureStore({

    reducer: {

        auth: authReducer,

        folders: folderReducer,

    }

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
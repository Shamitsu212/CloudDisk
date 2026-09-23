import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../../auth/slice/authSlice'
import folderReducer from '../../main/slice/folderSlice/folderSlice'
import fileReducer from '../../main/slice/fileSlice/fileSlice'

export const store = configureStore({

    reducer: {

        auth: authReducer,

        folders: folderReducer,
        files: fileReducer

    }

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
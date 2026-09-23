import { createSlice } from "@reduxjs/toolkit";

import type { FileState } from "./types";



const initialState: FileState = {
    files: [],
    loading: false,
    error: null,
};

const fileSlice = createSlice({
    
    name: "files",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

    },
});

export default fileSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

import type { FolderState } from "./types";

import { fetchFolders, createFolder, deleteFolder, renameFolder, favoriteFolder } from "./folderThunks";

const initialState: FolderState = {
    folders: [],
    loading: false,
    error: null,
};

const folderSlice = createSlice({
    name: "folders",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchFolders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFolders.fulfilled, (state, action) => {
                state.loading = false;
                state.folders = action.payload;
            })
            .addCase(fetchFolders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Ошибка";
            })

            .addCase(createFolder.fulfilled, (state, action) => {
                state.folders.push(action.payload);
            })

            .addCase(deleteFolder.fulfilled, (state, action) => {
                state.folders = state.folders.filter(
                    (folder) => folder.id !== action.payload
                );
            })

            .addCase(renameFolder.fulfilled, (state, action) => {
                const folder = state.folders.find(
                    (folder) => folder.id === action.payload.id
                );

                if (folder) {
                    folder.name = action.payload.name;
                }
            })

            .addCase(favoriteFolder.fulfilled, (state, action) => {
                const folder = state.folders.find(
                    (folder) => folder.id === action.payload.id
                );

                if (folder) {
                    folder.isFavorite = action.payload.isFavorite;
                }
            });
    },
});

export default folderSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

import type { FileState } from "./types";

import { createFile, fetchFiles, deleteFile, renameFile, favoriteFile } from "./fileThunks";

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

            
            .addCase(createFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFile.fulfilled, (state, action) => {
                state.loading = false;
                state.files.push(action.payload);
            })
            .addCase(createFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Не удалось загрузить файл";
            })


            
            .addCase(fetchFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Не удалось получить файлы";
            })


            
            .addCase(deleteFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.loading = false;

                state.files = state.files.filter(
                    (file) => file.id !== action.payload
                );
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Не удалось удалить файл";
            })


            
            .addCase(renameFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(renameFile.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.files.findIndex(
                    (file) => file.id === action.payload.id
                );

                if (index !== -1) {
                    state.files[index] = action.payload;
                }
            })
            .addCase(renameFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Не удалось переименовать файл";
            })


            
            .addCase(favoriteFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(favoriteFile.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.files.findIndex(
                    (file) => file.id === action.payload.id
                );

                if (index !== -1) {
                    state.files[index] = action.payload;
                }
            })
            .addCase(favoriteFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Не удалось изменить избранное";
            });
            
    },
});

export default fileSlice.reducer;
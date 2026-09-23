import { describe, it, expect } from "vitest";

import fileReducer from "./fileSlice";

import { createFile, fetchFiles, deleteFile, renameFile, favoriteFile } from "./fileThunks";

describe("fileSlice", () => {

    const initialState = {
        files: [],
        
        loading: false,
        error: null,
    };

    const file = {
        id: 1,
        name: "test.pdf",
        type: "PDF" as const,
        lastUpdate: "2026-09-23T18:00:00Z",
    };

    it("createFile.pending", () => {

        const action = {
            type: createFile.pending.type,
        };

        const state = fileReducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it("createFile.fulfilled", () => {

        const action = {
            type: createFile.fulfilled.type,
            payload: file,
        };

        const state = fileReducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.files).toEqual([file]);
    });

    it("createFile.rejected", () => {

        const action = {
            type: createFile.rejected.type,
            error: {
                message: "Не удалось загрузить файл",
            },
        };

        const state = fileReducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.error).toBe("Не удалось загрузить файл");
    });


    it("fetchFiles.fulfilled", () => {

        const files = [
            file,
            {
                id: 2,
                name: "archive.rar",
                type: "RAR" as const,
                lastUpdate: "2026-09-23T18:30:00Z",
            },
        ];

        const action = {
            type: fetchFiles.fulfilled.type,
            payload: files,
        };

        const state = fileReducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.files).toEqual(files);
    });


    it("deleteFile.fulfilled", () => {

        const stateWithFiles = {
            files: [
                file,
                {
                    id: 2,
                    name: "archive.rar",
                    type: "RAR" as const,
                    lastUpdate: "2026-09-23T18:30:00Z",
                },
            ],
            loading: true,
            error: null,
        };

        const action = {
            type: deleteFile.fulfilled.type,
            payload: 1,
        };

        const state = fileReducer(stateWithFiles, action);

        expect(state.loading).toBe(false);
        expect(state.files).toEqual([
            {
                id: 2,
                name: "archive.rar",
                type: "RAR",
                lastUpdate: "2026-09-23T18:30:00Z",
            },
        ]);
    });


    it("renameFile.fulfilled", () => {

        const stateWithFiles = {
            files: [file],
            loading: true,
            error: null,
        };

        const renamedFile = {
            ...file,
            name: "renamed.pdf",
        };

        const action = {
            type: renameFile.fulfilled.type,
            payload: renamedFile,
        };

        const state = fileReducer(stateWithFiles, action);

        expect(state.loading).toBe(false);
        expect(state.files).toEqual([renamedFile]);
    });


    it("favoriteFile.fulfilled", () => {

        const stateWithFiles = {
            files: [file],
            loading: true,
            error: null,
        };

        const updatedFile = {
            ...file,
        };

        const action = {
            type: favoriteFile.fulfilled.type,
            payload: updatedFile,
        };

        const state = fileReducer(stateWithFiles, action);

        expect(state.loading).toBe(false);
        expect(state.files).toEqual([updatedFile]);
    });


    it("rejected action sets error", () => {

        const action = {
            type: fetchFiles.rejected.type,
            error: {
                message: "Ошибка сервера",
            },
        };

        const state = fileReducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.error).toBe("Ошибка сервера");
    });

});
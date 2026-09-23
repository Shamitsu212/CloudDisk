import { createAsyncThunk } from "@reduxjs/toolkit";

import { createFile as createFileApi } from "../../api/files/createFile/createFile";
import { getFiles } from "../../api/files/getFiles/getFiles";
import { deleteFile as deleteFileApi } from "../../api/files/deleteFile/deleteFile";
import { renameFile as renameFileApi } from "../../api/files/renameFile/renameFile";
import { favoriteFile as favoriteFileApi } from "../../api/files/favoriteFile/favoriteFile";

export const createFile = createAsyncThunk(

    "files/createFile",

    async ({ user_id, file}: { user_id: number; file: globalThis.File }) => {
        return await createFileApi(user_id, file);
    }

);

export const fetchFiles = createAsyncThunk(

    "files/fetchFiles",

    async (user_id: number) => {
        return await getFiles(user_id);
    }

);

export const deleteFile = createAsyncThunk(

    "files/deleteFile",

    async ({ user_id, file_id }: { user_id: number; file_id: number }) => {
        await deleteFileApi(user_id, file_id);
        return file_id;
    }

);

export const renameFile = createAsyncThunk(

    "files/renameFile",

    async ( {  user_id,  file_id,  name }: { user_id: number; file_id: number; name: string }) => {
        return await renameFileApi(user_id, file_id, name);
    }

);

export const favoriteFile = createAsyncThunk(
    "files/favoriteFile",

    async ( { user_id, file_id }: { user_id: number; file_id: number }) => {
        return await favoriteFileApi(user_id, file_id);
    }

);
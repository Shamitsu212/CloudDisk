import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFolders } from "../../api/folders/getFolders/getFolders";
import { createFolder as createFolderApi } from "../../api/folders/createFolder/createFolder";
import { deleteFolder as deleteFolderApi } from "../../api/folders/deleteFolder/deleteFolder";
import { renameFolder as renameFolderApi } from "../../api/folders/renameFolder/renameFolder";
import { favoriteFolder as favoriteFolderApi } from "../../api/folders/favoriteFolder/favoriteFolder";

export const fetchFolders = createAsyncThunk(

    "folders/fetchFolders",

    async (user_id: number) => {
        return await getFolders(user_id);
    }

);

export const createFolder = createAsyncThunk(

    "folders/createFolder",

    async ({ user_id, name }: { user_id: number; name: string }) => {
        return await createFolderApi(user_id, name);
    }

);

export const deleteFolder = createAsyncThunk(

    "folders/deleteFolder",

    async ({ user_id, folder_id }: { user_id: number; folder_id: number }) => {
        await deleteFolderApi(user_id, folder_id);
        return folder_id;
    }

);

export const renameFolder = createAsyncThunk(

    "folders/renameFolder",

    async ( {  user_id,  folder_id,  name }: { user_id: number; folder_id: number; name: string }) => {
        return await renameFolderApi(user_id, folder_id, name);
    }

);

export const favoriteFolder = createAsyncThunk(
    "folders/favoriteFolder",

    async ( { user_id, folder_id }: { user_id: number; folder_id: number }) => {
        return await favoriteFolderApi(user_id, folder_id);
    }

);
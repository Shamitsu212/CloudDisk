import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFolders } from "../api/getFolders";
import { createFolder as createFolderApi } from "../api/createFolder";
import { deleteFolder as deleteFolderApi } from "../api/deleteFolder";
import { renameFolder as renameFolderApi } from "../api/renameFolder";
import { favoriteFolder as favoriteFolderApi } from "../api/favoriteFolder";

export const fetchFolders = createAsyncThunk(

    "folders/fetchFolders",

    async (userId: number) => {
        return await getFolders(userId);
    }

);

export const createFolder = createAsyncThunk(

    "folders/createFolder",

    async ({ userId, name }: { userId: number; name: string }) => {
        return await createFolderApi(userId, name);
    }

);

export const deleteFolder = createAsyncThunk(

    "folders/deleteFolder",

    async ({ userId, folderId }: { userId: number; folderId: number }) => {
        await deleteFolderApi(userId, folderId);
        return folderId;
    }

);

export const renameFolder = createAsyncThunk(

    "folders/renameFolder",

    async ( {  userId,  folderId,  name }: { userId: number; folderId: number; name: string }) => {
        return await renameFolderApi(userId, folderId, name);
    }

);

export const favoriteFolder = createAsyncThunk(
    "folders/favoriteFolder",

    async ( { userId, folderId }: { userId: number; folderId: number }) => {
        return await favoriteFolderApi(userId, folderId);
    }

);
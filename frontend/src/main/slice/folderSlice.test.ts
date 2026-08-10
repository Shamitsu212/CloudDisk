import { describe, expect, it } from "vitest";

import reducer from "./folderSlice";

import { fetchFolders, createFolder, deleteFolder, renameFolder, favoriteFolder } from "./folderThunks";

describe("folderSlice", () => {

  it("fetchFolders.pending устанавливает loading", () => {
    const state = reducer(
      undefined,
      fetchFolders.pending("request-id", 1)
    )

    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()

  })

  it("fetchFolders.fulfilled загружает папки", () => {
    const folders = [
      {
        id: 1,
        user_id: 1,
        name: "Folder 1",
        files: 5,
        lastUpdate: "2026-08-10",
        isFavorite: false,
      },
      {
        id: 2,
        user_id: 1,
        name: "Folder 2",
        files: 10,
        lastUpdate: "2026-08-09",
        isFavorite: true,
      },
    ]

    const state = reducer(
      undefined,
      fetchFolders.fulfilled(folders, "request-id", 1)
    )

    expect(state.loading).toBe(false)
    expect(state.folders).toEqual(folders)
  })

  it("fetchFolders.rejected устанавливает ошибку", () => {

    const state = reducer(
      undefined,
      fetchFolders.rejected(
        new Error("Ошибка сервера"),
        "request-id",
        1
      )

    )

    expect(state.loading).toBe(false)
    expect(state.error).toBe("Ошибка сервера")
  })

  it("createFolder.fulfilled добавляет папку", () => {

    const folder = {
      id: 1,
      user_id: 1,
      name: "New Folder",
      files: 0,
      lastUpdate: "2026-08-10",
      isFavorite: false,
    }

    const state = reducer(
      undefined,
      createFolder.fulfilled(
        folder,
        "request-id",
        {
          user_id: 1,
          name: "New Folder",
        }
      )
    )

    expect(state.folders).toContainEqual(folder)
  })

  it("deleteFolder.fulfilled удаляет папку", () => {
    const initialState = {
      folders: [
        {
          id: 1,
          user_id: 1,
          name: "Folder 1",
          files: 5,
          lastUpdate: "2026-08-10",
          isFavorite: false,
        },
        {
          id: 2,
          user_id: 1,
          name: "Folder 2",
          files: 10,
          lastUpdate: "2026-08-09",
          isFavorite: false,
        },
      ],
      loading: false,
      error: null,
    }

    const state = reducer(
      initialState,
      deleteFolder.fulfilled(
        1,
        "request-id",
        {
          user_id: 1,
          folder_id: 1,
        }
      )
    )

    expect(state.folders).toEqual([
      {
        id: 2,
        user_id: 1,
        name: "Folder 2",
        files: 10,
        lastUpdate: "2026-08-09",
        isFavorite: false,
      },
    ])
    
  })

  it("renameFolder.fulfilled меняет имя папки", () => {

    const initialState = {
      folders: [
        {
          id: 1,
          user_id: 1,
          name: "Old Name",
          files: 5,
          lastUpdate: "2026-08-10",
          isFavorite: false,
        },
      ],
      loading: false,
      error: null,
    }

    const state = reducer(
      initialState,
      renameFolder.fulfilled(
        {
          id: 1,
          name: "New Name",
        },
        "request-id",
        {
          user_id: 1,
          folder_id: 1,
          name: "New Name",
        }
      )
    )

    expect(state.folders[0].name).toBe("New Name");
  })

  it("favoriteFolder.fulfilled меняет isFavorite", () => {
    const initialState = {
      folders: [
        {
          id: 1,
          user_id: 1,
          name: "Folder",
          files: 5,
          lastUpdate: "2026-08-10",
          isFavorite: false,
        },
      ],
      loading: false,
      error: null,
    }

    const state = reducer(
      initialState,
      favoriteFolder.fulfilled(
        {
          id: 1,
          isFavorite: true,
        },
        "request-id",
        {
          user_id: 1,
          folder_id: 1,
        }
      )
    )

    expect(state.folders[0].isFavorite).toBe(true);
  });
})
import { tokenFetch } from "../../../../app/shared/tokenFetch/tokenFetch";

export async function createFile(user_id: number, file: globalThis.File) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await tokenFetch(
        `http://localhost:8080/api/v1/${user_id}/files`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("Не удалось загрузить файл");
    }

    return response.json();
}
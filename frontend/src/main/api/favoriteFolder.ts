import { tokenFetch } from "../../app/shared/tokenFetch/tokenFetch";

export async function favoriteFolder(user_id:number, folder_id:number){

    const response = await tokenFetch(`http://localhost:8080/api/v1/${user_id}/folders/${folder_id}/favorite`, {
        method: "PATCH"
    })

    if(!response.ok){
        throw new Error("Ошибка при добавлении в избранные")
    }

    return response.json()
}
import { tokenFetch } from "../../app/shared/tokenFetch/tokenFetch";

export async function renameFolder(user_id:number, folder_id:number, name:string, ) {
    
    const response = await tokenFetch(`http://localhost:8080/api/v1/${user_id}/folders/${folder_id}`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({name})
    })

    if(!response.ok){
        throw new Error("Ошибка при изменении имени папки")
    }

    return response.json()
}
import { tokenFetch } from "../../app/shared/tokenFetch/tokenFetch";

export async function deleteFolder(user_id:number, folder_id:number) {
    
    const response = await tokenFetch(`http://localhost:8080/api/v1/${user_id}/folders/${folder_id}`,{
        method: "DELETE"
    })

    if(!response.ok){
        throw new Error("Ошибка при удалении папки")
    }

}
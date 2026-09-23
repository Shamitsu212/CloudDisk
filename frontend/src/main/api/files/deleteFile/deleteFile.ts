import { tokenFetch } from "../../../../app/shared/tokenFetch/tokenFetch";

export async function deleteFile(user_id:number, file_id:number) {
    
    const response = await tokenFetch(`http://localhost:8080/api/v1/${user_id}/files/${file_id}`,{
        method: "DELETE"
    })

    if(!response.ok){
        throw new Error("Ошибка при удалении файла")
    }

}
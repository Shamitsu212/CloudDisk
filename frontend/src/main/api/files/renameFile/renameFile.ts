import { tokenFetch } from "../../../../app/shared/tokenFetch/tokenFetch";

export async function renameFile(user_id:number, file_id:number, name:string, ) {
    
    const response = await tokenFetch(`http://localhost:8080/api/v1/${user_id}/files/${file_id}`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({name})
    })

    if(!response.ok){
        throw new Error("Ошибка при изменении имени файла")
    }

    return response.json()
}
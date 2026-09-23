import { tokenFetch } from "../../../../app/shared/tokenFetch/tokenFetch";

export async function getFiles(user_id:number){

    const response = await tokenFetch(`http://localhost:8080/api/v1/${user_id}/files`  )

    if(!response.ok){
        throw new Error("Ошибка загрузки файлов")
    }

    return response.json();
}
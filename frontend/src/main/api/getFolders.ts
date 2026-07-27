import { tokenFetch } from "../../app/shared/tokenFetch/tokenFetch";

export async function getFolders(user_id:number){

    const response = await tokenFetch(`http://localhost:8080/api/v1/${user_id}/folders`  )

    if(!response.ok){
        throw new Error("Ошибка загрузки папок")
    }

    return response.json();
}
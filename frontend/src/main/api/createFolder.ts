import { tokenFetch } from "../../app/shared/tokenFetch/tokenFetch";

export async function createFolder(user_id:number, name:string){

    const response = await tokenFetch(`http://localhost:8080/api/v1/${user_id}/folders`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({name})
    })

    if(!response.ok){
        throw new Error("Не удалось создать папку");
    }

    return response.json();
}
import styles from "./CreateNew.module.css"

import { PlusIcon } from "lucide-react"



function CreateNew(){

    

    return(
        <button className={styles.button}>

            <PlusIcon size={38}/>

            <span>Создать папку</span>

        </button>
    )
}

export default CreateNew
import type { SetStateAction } from "react"
import styles from "./CreateNew.module.css"

import { PlusIcon } from "lucide-react"

interface Props {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

function CreateNew({open, setOpen}:Props){

    

    return(
        <button className={styles.button} onClick={() => setOpen(!open)}>

            <PlusIcon size={38}/>

            <span>Создать папку</span>

        </button>
    )
}

export default CreateNew
import styles from "./Logo.module.css"

import { CloudIcon } from "lucide-react"
import { useAppNavigate } from "../../../../../../../../app/hooks/useAppNavigate"


function Logo(){

    const nav = useAppNavigate()

    function handleClick(){
        nav.toMain()
    }

    return(
        <div 
            className={styles.Logo}
            onClick={handleClick}    
        >

            <CloudIcon size={77} className={styles.Logo__icon}/>

            <p className={styles.Logo__text}>CloudDisk</p>

        </div>
    )
}

export default Logo
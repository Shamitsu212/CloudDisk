import styles from "./Logo.module.css"

import { useNavigate } from "react-router-dom"

import { CloudIcon } from "lucide-react"


function Logo(){

    const navigate = useNavigate()

    function handleClick(){
        navigate("/")
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
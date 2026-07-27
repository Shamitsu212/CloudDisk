import type { ReactNode } from "react"
import styles from "./Button.module.css"

interface Props {
    icon: ReactNode,
    text: string
}

function Button({icon, text}:Props){

    

    return(
        <button className={styles.button}>
            {icon}
            {text}
        </button>
    )
}

export default Button
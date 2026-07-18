import styles from './Button.module.css'

interface Props{
    text: string,
    onclick?: () => void,

    type?: "button" | "submit" | "reset";
}

function Button({ text, onclick, type }: Props){

    return(
        
        <button 
            onClick={onclick}
            className={styles.button}
            type={type}
        >
            {text}
        </button>
        
    )
}

export default Button
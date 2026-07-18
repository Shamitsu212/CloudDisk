import type { SetStateAction } from 'react'
import styles from './Input.module.css'

interface Props{
    value: string,
    setValue: React.Dispatch<SetStateAction<string>>

    placeholder: string,
    type: string,

    label: string,
}


function Input({value, setValue, placeholder, type, label}:Props){

    return(

        <div className={styles.inputContainer}>

            <label className={styles.inputContainer__label}>
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                className={styles.inputContainer__input}

                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

        </div>

        
        
    )
}

export default Input
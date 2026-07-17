import type { SetStateAction } from 'react'
import styles from './Input.module.css'

interface Props{
    value: string,
    setValue: React.Dispatch<SetStateAction<string>>

    placeholder: string,
    type: string,
}


function Input({value, setValue, placeholder, type}:Props){

    return(

        <input
            type={type}
            placeholder={placeholder}
            className={styles.input}

            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        
    )
}

export default Input
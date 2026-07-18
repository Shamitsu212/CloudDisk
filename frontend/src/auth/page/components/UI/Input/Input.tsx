import { useRef, type ReactNode, type SetStateAction } from 'react'
import styles from './Input.module.css'

interface Props {
    value: string
    setValue: React.Dispatch<SetStateAction<string>>

    placeholder: string
    type: string

    label: string
    icon?: ReactNode
}

function Input({ value, setValue, placeholder, type, label, icon }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div className={styles.Container}>

            <label className={styles.Container__label}>
                {label}
            </label>

            <div
                className={styles.Container__inputContainer}
                onClick={() => inputRef.current?.focus()}
            >
                <div className={styles.inputContainer__icon}>
                    {icon}
                </div>
                

                <input
                    ref={inputRef}
                    type={type}
                    placeholder={placeholder}
                    className={styles.inputContainer__input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Input
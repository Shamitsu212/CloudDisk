import styles from './AuthForm.module.css'

import { useState } from 'react'

import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

import { regRequest } from '../../../../api/reg/regApi'

import { useAppDispatch } from '../../../../../app/store/useAppHooks'
import { login } from '../../../../slice/authSlice'


function RegForm(){

    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const dispatch = useAppDispatch()

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        try{
            const response = await regRequest({email, password, name})

            dispatch(login(response))
        }

        catch(err){
            console.log(err)
        }
        

    }

    return(

        <form 
            className={styles.form}
            onSubmit={handleSubmit}    
        >

            <div className={styles.form__inputContainer}>

                <div className={styles.inputContainer__input}>

                    <label className={styles.input__label}>Email</label>

                    <Input 
                        value={email} 
                        setValue={setEmail}

                        placeholder='Введите ваш email'
                        type='email'
                    />

                </div>

                <div className={styles.inputContainer__input}>

                    <label className={styles.input__label}>Username</label>

                    <Input 
                        value={name} 
                        setValue={setName}

                        placeholder='Введите Username'
                        type='text'
                    />

                </div>

                <div className={styles.inputContainer__input}>

                    <label className={styles.input__label}>Password</label>

                    <Input 
                        value={password}
                        setValue={setPassword}

                        placeholder='Введите пароль'
                        type='password'
                    />

                </div>

            </div>

            <div>
                <Button 
                    text='Зарегестрироваться' 
                    type='submit'
                />
            </div>
            

        </form>

    )
}

export default RegForm
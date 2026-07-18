import styles from './AuthForm.module.css'

import { useState } from 'react'

import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

import { loginRequest } from '../../../../api/auth/authApi'

import { useAppDispatch } from '../../../../../app/store/useAppHooks'
import { login } from '../../../../slice/authSlice'

interface Props {
    changeForm: (form: "log" | "reg") => void
}

function AuthForm({changeForm}: Props){

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const dispatch = useAppDispatch()

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        try{
            const response = await loginRequest({email, password})

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

            <h1> Авторизация</h1>

            <div className={styles.form__inputContainer}>

                <Input 
                    value={email} 
                    setValue={setEmail}

                    placeholder='Enter email'
                    type='email'

                    label='Email'
                />



                <Input 
                    value={password}
                    setValue={setPassword}

                    placeholder='Enter password'
                    type='password'

                    label='Password'
                />


            </div>

            <div>
                <Button 
                    text='Войти' 
                    type='submit'
                />
            </div>

            <button onClick={() => changeForm("reg")}>
                Еще не зарегестрированны? 
            </button>
            

        </form>

    )
}

export default AuthForm
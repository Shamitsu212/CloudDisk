import styles from './RegForm.module.css'

import { useState } from 'react'

import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

import { regRequest } from '../../../../api/reg/regApi'

import { useAppDispatch } from '../../../../../app/store/useAppHooks'
import { login } from '../../../../slice/authSlice'

interface Props {
    changeForm: (form: "log" | "reg") => void
}

function RegForm({changeForm}: Props){

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

                    <h1> Регистрация </h1>

                    <Input 
                        value={email} 
                        setValue={setEmail}

                        placeholder='Enter email'
                        type='email'

                        label='Email'
                    />


                    <Input 
                        value={name} 
                        setValue={setName}

                        placeholder='Enter Username'
                        type='text'

                        label='Username'
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
                    text='Зарегестрироваться' 
                    type='submit'
                />
            </div>

            <button onClick={() => changeForm("log")}>
                Уже зарегестрированны? Нажмите чтоб перейти к авторизации
            </button>
            

        </form>

    )
}

export default RegForm
import styles from './AuthForm.module.css'

import { useState } from 'react'

import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

import { loginRequest } from '../../../../api/auth/authApi'

import { useAppNavigate } from '../../../../../app/hooks/useAppNavigate';

import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../../../app/store/useAppHooks'
import { login } from '../../../../slice/authSlice'

import Logo from '../../UI/Logo/Logo'

import { KeyRound, Mail } from 'lucide-react'

import logImg from "../../../../../assets/pic/auth/log.png"


function AuthForm(){

    const nav = useAppNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const dispatch = useAppDispatch()

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        try{
            const response = await loginRequest({email, password})

            dispatch(login(response))
            nav.toMain()
        }

        catch(err){
            console.log(err)
        }
        

    }

    return(

        <div className={styles.Container}>

            <form 
                className={styles.Container__form}
                onSubmit={handleSubmit}    
            >

                <div className={styles.form__collumn}>

                    <Logo/>

                    <div className={styles.collumn__description}>
                        <h1 className={styles.description__h}>Добро пожаловать!</h1>
                        <p className={styles.description__p}>Войдите в свой аккаунт чтобы продолжить</p>
                    </div>

                    <div className={styles.collumn__inputs}>

                        <Input 
                            value={email} 
                            setValue={setEmail}

                            placeholder='Enter email'
                            type='email'

                            label='Email'
                            icon={<Mail size={14} />}
                        />



                        <Input 
                            value={password}
                            setValue={setPassword}

                            placeholder='Enter password'
                            type='password'

                            label='Password'
                            icon={<KeyRound size={14} />}
                        />

                    </div>

                </div>

                <div className={styles.form__button}>
                    <Button 
                        text='Войти' 
                        type='submit'
                    />
                </div>

                <Link
                    to="/register"
                    className={styles.form__redirect} 
                >
                    Еще не зарегестрированны? 
                </Link>


            </form>

            <div className={styles.Container__wrapper}>

                <img src={logImg} className={styles.wrapper__img} />

            </div>

        </div>

    )
}

export default AuthForm
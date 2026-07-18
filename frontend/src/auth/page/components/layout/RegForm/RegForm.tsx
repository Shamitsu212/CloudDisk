import styles from './RegForm.module.css'

import { useState } from 'react'

import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Logo from '../../UI/Logo/Logo'

import { KeyRound, Mail, ShieldAlert, User } from 'lucide-react'

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

            <div className={styles.form__collumn}>

                <Logo/>

                <div className={styles.collumn__description}>
                    <h1 className={styles.description__h}>Создайте аккаунт</h1>
                    <p className={styles.description__p}>Начните хранить свои данные в облаке</p>
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
                        value={name} 
                        setValue={setName}
                        placeholder='Enter Username'
                        type='text'
                        label='Username'
                        icon={<User size={14}  />}
                    />
                    <div className={styles.inputs__password}>

                        <Input 
                            value={password}
                            setValue={setPassword}
                            placeholder='Enter password'
                            type='password'
                            label='Password'
                            icon={<KeyRound size={14}  />}
                        />

                        <p className={styles.password__description}>
                            <ShieldAlert size={12} />
                            at least 8 characters
                        </p>


                    </div>

                </div>
                

            </div>

            <div>
                <Button 
                    text='Зарегестрироваться' 
                    type='submit'
                />
            </div>

            <button className={styles.form__redirect} onClick={() => changeForm("log")}>
                Уже зарегестрированны? Нажмите чтоб перейти к авторизации
            </button>
            

        </form>

    )
}

export default RegForm
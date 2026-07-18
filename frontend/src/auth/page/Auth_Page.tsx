import styles from './Auth_Page.module.css'

import { useState } from 'react'

import RegForm from './components/layout/RegForm/RegForm'
import AuthForm from './components/layout/AuthForm/AuthForm'



function Auth_Page(){

    const [form, setForm] = useState<"log" | "reg">("reg")

    return(
        <div className={styles.page}>

            <div className={form == "reg" ? styles.hidden : ""}>
                <AuthForm changeForm={setForm}/>
            </div>

            <div className={form == "log" ? styles.hidden : ""}>
                <RegForm changeForm={setForm}/>
            </div>

        </div>
    )
}

export default Auth_Page
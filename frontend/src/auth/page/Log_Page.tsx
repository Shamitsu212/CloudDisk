import styles from './Page.module.css'

import AuthForm from './components/layout/AuthForm/AuthForm'



function Log_Page(){


    return(
        <div className={styles.page}>

            <AuthForm/>

        </div>
    )
}

export default Log_Page
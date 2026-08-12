import styles from './Page.module.css'

import RegForm from './components/layout/RegForm/RegForm'



function Reg_Page(){

    return(
        <div className={styles.page}>

            <div>
                <RegForm />
            </div>

        </div>
    )
}

export default Reg_Page
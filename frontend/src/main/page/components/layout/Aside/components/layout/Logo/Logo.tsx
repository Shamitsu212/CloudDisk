import styles from "./Logo.module.css"

import { useAppNavigate } from "../../../../../../../../app/hooks/useAppNavigate"

import logo from '../../../../../../../../assets/pic/Logo/Logo_day.png'

function Logo(){

    const nav = useAppNavigate()

    function handleClick(){
        nav.toMain()
    }

    return(
        <div 
            className={styles.Logo}
            onClick={handleClick}    
        >
            <div>
                <img src={logo} className={styles.Logo__icon}/>
            </div>

            <p className={styles.Logo__text}>CloudDisk</p>

        </div>
    )
}

export default Logo
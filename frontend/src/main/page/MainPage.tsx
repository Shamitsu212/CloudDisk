import styles from './MainPage.module.css'

import Aside from './components/layout/Aside/Aside'
import Content from './components/layout/Content/Content'


function MainPage(){

    return(
        <div className={styles.Container}>

            <Aside/>

            <Content/>

        </div>
    )
}

export default MainPage
import styles from "./Aside.module.css"

import ButtonList from "./components/layout/ButtonList/ButtonList"
import CreateNew from "./components/layout/CreateNew/CreateNew"
import Logo from "./components/layout/Logo/Logo"

function Aside(){

    return(
        <aside className={styles.aside}>
            
            <Logo/>

            <CreateNew />

            <ButtonList />

        </aside>
    )
}

export default Aside
import styles from "./Aside.module.css"

import ButtonList from "./components/layout/ButtonList/ButtonList"
import CreateNew from "./components/layout/CreateNew/CreateNew"
import CreateNewModal from "./components/layout/CreateNewModal/CreateNewModal"
import Logo from "./components/layout/Logo/Logo"

import { useState } from "react"

function Aside(){

    const [open, setOpen] = useState<boolean>(false)

    return(
        <aside className={styles.aside}>
            
            <Logo/>

            <CreateNew open={open} setOpen={setOpen} />

            <ButtonList />

            <CreateNewModal open={open} setOpen={setOpen}/>

        </aside>
    )
}

export default Aside
import styles from "./Content.module.css"

import { useAppSelector } from "../../../../../app/store/useAppHooks"

import FoldersList from "./components/layout/FoldersList/FoldersList"


function Content(){

    const username = useAppSelector((state) => state.auth.user?.name)

    return(
        <div className={styles.Content}>


            <div className={styles.Content__hero}>
                <h1 className={styles.hero__h}>Добрый день, {username}!</h1>
                <p className={styles.hero__p}>Рады видеть вас в CloudDisk.</p>
            </div>

            <FoldersList />

        </div>
    )
}

export default Content
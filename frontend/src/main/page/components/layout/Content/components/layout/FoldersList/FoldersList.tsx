import styles from "./FoldersList.module.css"

import Folder from "../../UI/Folder/Folder"
import { useAppSelector } from "../../../../../../../../app/store/useAppHooks"

function FoldersList(){

    const folders = useAppSelector((state) => state.folders.folders)

    return(
        <div className={styles.FoldersList}>

            <h2 className={styles.FoldersList__h}>Мои папки</h2>

            <div className={styles.FoldersList__list}>
                {folders.map((f) => (

                    <Folder 
                        key={f.id} 
                        id={f.id}
                        name={f.name} 
                        files={f.files} 
                        lastUpdate={f.lastUpdate} 
                    />
                    
                ))}
            </div>

        </div>
    )
}

export default FoldersList
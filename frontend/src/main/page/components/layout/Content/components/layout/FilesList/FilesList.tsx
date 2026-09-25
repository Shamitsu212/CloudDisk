import styles from "./FilesList.module.css"

import File from "../../UI/File/File"

import { useAppSelector } from "../../../../../../../../app/store/useAppHooks";

function FilesList(){

    const files = useAppSelector((state) => state.files.files);

    if(!files || files.length === 0){
        return(
            <></>
        )
    }

    return(
        <div className={styles.FilesList}>

            <h2 className={styles.FilesList__h}>Файлы без папки</h2>

            <div className={styles.FilesList__list}>

                {files.map((f) => (
                    <File id={f.id} name={f.name} type={f.type} lastUpdate={f.lastUpdate}/>
                ))}

            </div>

        </div>
    )
}

export default FilesList
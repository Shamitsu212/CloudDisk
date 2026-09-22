import styles from "./FilessList.module.css"

import File from "../../UI/File/File"



function FoldersList(){


    const files = [
        {id: 0, name: "Excel таблица", type: "EXCEL"}
    ]

    

    return(
        <div className={styles.FilesList}>

            <h2 className={styles.FilesList__h}>Файлы без папки</h2>

            <div className={styles.FilesList__list}>

                {files.map((f) => (
                    <File id={f.id} name={f.name} type={f.type} />
                ))}

            </div>

        </div>
    )
}

export default FoldersList
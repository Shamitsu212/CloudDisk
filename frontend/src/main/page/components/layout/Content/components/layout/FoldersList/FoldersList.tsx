import styles from "./FoldersList.module.css"

import Folder from "../../UI/Folder/Folder"

function FoldersList(){

    const folders = [ 
        {
            id: 1,
            name: "Документы",
            files: 12,
            lastUpdate: "10.05.2025"
        },
        {
            id: 2,
            name: "Документы",
            files: 12,
            lastUpdate: "10.05.2025"
        },
        {
            id: 3,
            name: "Документы",
            files: 12,
            lastUpdate: "10.05.2025"
        },
        {
            id: 4,
            name: "Документы",
            files: 12,
            lastUpdate: "10.05.2025"
        },
        {
            id: 5,
            name: "Документы",
            files: 12,
            lastUpdate: "10.05.2025"
        },
        {
            id: 6,
            name: "Документы",
            files: 12,
            lastUpdate: "10.05.2025"
        },
        {
            id: 7,
            name: "Документы",
            files: 12,
            lastUpdate: "10.05.2025"
        },
    ]

    return(
        <div className={styles.FoldersList}>

            <h2 className={styles.FoldersList__h}>Мои папки</h2>

            <div className={styles.FoldersList__list}>
                {folders.map((f) => (

                    <Folder 
                        key={f.id} 
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
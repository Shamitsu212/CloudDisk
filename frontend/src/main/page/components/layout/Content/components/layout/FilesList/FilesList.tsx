import styles from "./FilesList.module.css"

import File from "../../UI/File/File"



function FilesList(){

    type FileData = {
        id: number;
        name: string;
        type: "Another" | "EXC" | "PDF" | "PIC" | "PP" | "Word" | "RAR";
        lastUpdate: string;
    };


    const files:FileData[] = [
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},
        {id: 0, name: "Excel таблица", type: "EXC", lastUpdate: "09.11.2007"},

    ]

    

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
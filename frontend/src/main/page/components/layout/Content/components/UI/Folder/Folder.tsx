import styles from "./Folder.module.css"

import { useRef, useState } from "react";
import { useClickOutside } from "./hooks/useClickOutside"

import { EllipsisVerticalIcon, FolderIcon } from "lucide-react"
import { useNavigate } from "react-router-dom";

interface Props {
    name: string,
    files: number,
    lastUpdate: string
}

function Folder({name, files, lastUpdate}:Props){

    const [open, setOpen] = useState<boolean>(false)

    const articleRef = useRef<HTMLElement>(null);
    useClickOutside(articleRef, () => setOpen(false));

    const navigate = useNavigate()

    function handleClick(){
        navigate("/1")
    }

    return(
        <article 
            className={styles.article}
            ref={articleRef}
            onClick={handleClick}
        >

            <div className={styles.article__folder}>
                <FolderIcon size={62}/>
            </div>

            <div className={styles.article__text}>

                <h5 className={styles.text__h}>
                    {name}
                </h5>
                <p className={styles.text__p}>
                    {files} файлов
                </p>
                <time className={styles.text__p}>
                    Обновлено — {lastUpdate}
                </time>

            </div>

            <button 
                className={styles.article__button}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}
            >
                <EllipsisVerticalIcon size={22}/>
            </button>

            <div 
                className={open == true ? styles.editMenu : styles.hidden}
                onClick={(e) => e.stopPropagation()}    
            >

                <button>
                    Удалить
                </button>

                <button>
                    В избранные 
                </button>

                <button>
                    Переименовать
                </button>
            </div>

        </article>
    )
}

export default Folder
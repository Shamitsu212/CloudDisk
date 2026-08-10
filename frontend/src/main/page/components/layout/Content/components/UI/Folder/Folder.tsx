import styles from "./Folder.module.css"

import { useRef, useState } from "react";
import { useClickOutside } from "./hooks/useClickOutside"

import { EllipsisVerticalIcon, FolderIcon } from "lucide-react"
import { useAppNavigate } from "../../../../../../../../app/hooks/useAppNavigate";
import FolderMenu from "./components/FolderMenu/FolderMenu";
import RenameModal from "./components/RenameModal/RenameModal";
import DeleteModal from "./components/DeleteModal/DeleteModal";

interface Props {
    id: number,
    name: string,
    files: number[],
    lastUpdate: string
}

function Folder({id, name, files, lastUpdate}:Props){

    const [openRename, setOpenRename] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    const articleRef = useRef<HTMLElement>(null);
    useClickOutside(articleRef, () => setOpenMenu(false));

    const nav = useAppNavigate()

    function handleClick(){
        nav.toFolder(id)
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
                    {files.length} файлов
                </p>

                <time className={styles.text__p}>
                    Обновлено — {lastUpdate}
                </time>

            </div>
 
            <button 
                className={styles.article__button}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu((prev) => !prev);
                }}
            >
                <EllipsisVerticalIcon size={22}/>
            </button>

            <FolderMenu 
                id={id} 

                open={openMenu} 
                setOpen={setOpenMenu} 

                openRename={openRename}
                setOpenRename={setOpenRename}

                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />

            <RenameModal 
                id={id} 

                open={openRename} 
                setOpen={setOpenRename}  
            />

            <DeleteModal 
                id={id} 

                open={openDelete} 
                setOpen={setOpenDelete}
            />

        </article>
    )
}

export default Folder
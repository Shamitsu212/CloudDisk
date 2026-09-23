import { EllipsisVerticalIcon } from "lucide-react"

import styles from "./File.module.css"

import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside"

import { useAppNavigate } from "../../../../../../../../app/hooks/useAppNavigate"

import all from "../../../../../../../../assets/pic/files/file_all.png"
import excel from "../../../../../../../../assets/pic/files/file_excel.png"
import pdf from "../../../../../../../../assets/pic/files/file_pdf.png"
import picture from "../../../../../../../../assets/pic/files/file_picture.png"
import pp from "../../../../../../../../assets/pic/files/file_pp.png"
import word from "../../../../../../../../assets/pic/files/file_word.png"
import rar from "../../../../../../../../assets/pic/files/rar.png"

import RenameModal from "./components/RenameModal/RenameModal";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import FileMenu from "./components/FileMenu/FileMenu";


interface Props {
    id: number,
    name: string,
    type: "Another" | "EXC" | "PDF" | "PIC" | "PP" | "Word" | "RAR",
    lastUpdate: string,
}

function Folder({id, name, type, lastUpdate}:Props){

    const images = {
        Another: all,
        EXC: excel,
        PDF: pdf,
        PIC: picture,
        PP: pp,
        Word: word,
        RAR: rar,
    };

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
        >

            

            <div className={styles.article__wrapper}>

                {images[type] && (
                    <img 
                        src={images[type]} 
                        className={styles.wrapper__img}
                        onClick={handleClick}    
                    />
                )}

            </div>
            

            <p 
                className={styles.article__p}
                onClick={handleClick}   
            > 
                {name}
            </p>

            <p 
                className={styles.article__p}
                onClick={handleClick}       
            >
                {lastUpdate}
            </p>

            <button 
                className={styles.article__button}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu((prev) => !prev);
                }}
            
            >
                <EllipsisVerticalIcon size={22} />
            </button>

            <FileMenu
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
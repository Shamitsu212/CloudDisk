import { EllipsisVerticalIcon } from "lucide-react"

import styles from "./File.module.css"

import { useAppNavigate } from "../../../../../../../../app/hooks/useAppNavigate"

import all from "../../../../../../../../assets/pic/files/file_all.png"
import excel from "../../../../../../../../assets/pic/files/file_excel.png"
import pdf from "../../../../../../../../assets/pic/files/file_pdf.png"
import picture from "../../../../../../../../assets/pic/files/file_picture.png"
import pp from "../../../../../../../../assets/pic/files/file_pp.png"
import word from "../../../../../../../../assets/pic/files/file_word.png"
import rar from "../../../../../../../../assets/pic/files/rar.png"


interface Props {
    id: number,
    name: string,
    type: string,
    lastUpdate: string,
}

function Folder({id, name, type, lastUpdate}:Props){

    
    const nav = useAppNavigate()
    
    function handleClick(){
        nav.toFolder(id)
    }

   
    return(
        <article 
            className={styles.article}
            onClick={handleClick}
        >

            

            <div className={styles.article__wrapper}>

                {type == "Another" && (
                    <img src={all} className={styles.wrapper__img}/>
                )}

                {type == "EXC" && (
                    <img  src={excel} className={styles.wrapper__img}/>
                )}

                {type == "PDF" && (
                    <img  src={pdf} className={styles.wrapper__img}/>
                )}

                {type == "PIC" && (
                    <img  src={picture} className={styles.wrapper__img}/>
                )}

                {type == "PP" && (
                    <img src={pp} className={styles.wrapper__img}/>
                )}

                {type == "Word" && (
                    <img src={word} className={styles.wrapper__img}/>
                )}

                {type == "RAR" && (
                    <img src={rar} className={styles.wrapper__img}/>
                )}

            </div>
            


            <p className={styles.article__p}> 
                {name}
            </p>

            <p className={styles.article__p}>
                {lastUpdate}
            </p>

            <button className={styles.article__button}>
                <EllipsisVerticalIcon size={22} />
            </button>

        </article>
    )
}

export default Folder
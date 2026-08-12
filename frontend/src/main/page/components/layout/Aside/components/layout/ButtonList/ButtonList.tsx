import { Folder, StarIcon } from "lucide-react"
import styles from "./ButtonList.module.css"
import Button from "../../UI/Button/Button"


function ButtonList(){

    const buttons = [
        {
            id: 0,
            icon: <Folder  size={34}/>,
            text: "Мои файлы"
        },
        {
            id: 1,
            icon: <StarIcon size={34}/>,
            text: "Избранные"
        },
    ]

    return(
        <div className={styles.list}>
            {buttons.map((b) => (
                <Button 
                    key={b.id} 
                    icon={b.icon} 
                    text={b.text}  
                />
            ))}
        </div>
    )
}

export default ButtonList
import styles from './DeleteModal.module.css'

import { deleteFolder} from "../../../../../../../../../slice/folderThunks";
import { useAppDispatch, useAppSelector } from '../../../../../../../../../../app/store/useAppHooks';
import type { SetStateAction } from 'react';


interface Props {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    id: number
}

function DeleteModal({ open, setOpen, id }:Props){

    const dispatch = useAppDispatch()
    const user_id = useAppSelector((state) => state.auth.user?.id);

    function handleDelete(e: React.MouseEvent){
            e.stopPropagation();
    
            if (!user_id) {
                return null;
            }
    
            dispatch(deleteFolder({user_id: user_id, folder_id: id}))
        }

    return(
        <div 
            className={open == true ? styles.modal : styles.hidden}
            onClick={(e) => {e.stopPropagation(); setOpen(!open)}}
        >
            <div className={styles.modal__window}>

                <h1 className={styles.window__h}> 

                    <span>Вы уверены что хотите </span>
                    <span>удалить эту папку?</span>

                </h1>

                <div className={styles.window__buttonContainer}>

                    <button 
                        onClick={() =>  setOpen(!open)}
                        className={styles.buttonContainer__cancel}    
                    >
                        Отмена
                    </button>

                    <button 
                        onClick={handleDelete}
                        className={styles.buttonContainer__del}    
                    >
                        Удалить
                    </button>

                </div>

            </div>
        </div>
    )
}

export default DeleteModal
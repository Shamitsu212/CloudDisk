import styles from './RenameModal.module.css'

import { useAppDispatch } from '../../../../../../../../../../app/store/useAppHooks';
import { useAppSelector } from '../../../../../../../../../../app/store/useAppHooks';
import { renameFolder } from "../../../../../../../../../slice/folderThunks";
import { useState } from 'react';
import type { SetStateAction } from 'react';

interface Props {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    id: number
}

function RenameModal({ open, setOpen, id }:Props){

    const [value, setValue] = useState<string>("")

    const dispatch = useAppDispatch()
    const user_id = useAppSelector((state) => state.auth.user?.id);

    function handleRename(e: React.MouseEvent){
        e.stopPropagation();

        if (!user_id) {
            return null;
        }

        dispatch(renameFolder({user_id: user_id, folder_id: id, name: value }))
    }

    return(
        <div 
            className={open == true ? styles.modal : styles.hidden}
            onClick={(e) => {e.stopPropagation(); setOpen(!open)}}
        >

            <div 
                className={styles.modal__window}
                onClick={(e) => e.stopPropagation()}    
            >

                <h1 className={styles.window__h}>Переименовать</h1>

                <input
                    type='text'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={styles.window__input}
                    placeholder='Введите новое название'
                />

                <div className={styles.window__buttonContainer}>

                    <button 
                        onClick={() =>  setOpen(!open)}
                        className={styles.buttonContainer__cancel}    
                    >
                        Отмена
                    </button>

                    <button 
                        onClick={handleRename}
                        className={styles.buttonContainer__del}
                    >
                        ОК
                    </button>

                </div>

            </div>
        </div>
    )
}

export default RenameModal
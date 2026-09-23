import styles from './FileMenu.module.css'

import { useAppDispatch } from '../../../../../../../../../../app/store/useAppHooks';
import { useAppSelector } from '../../../../../../../../../../app/store/useAppHooks';
import { favoriteFile } from "../../../../../../../../../slice/fileSlice/fileThunks";

import { type SetStateAction } from 'react';

interface Props {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>

    openDelete: boolean,
    setOpenDelete: React.Dispatch<SetStateAction<boolean>>

    openRename: boolean,
    setOpenRename: React.Dispatch<SetStateAction<boolean>>

    id: number
}

function FileMenu({ open, setOpen, openDelete, setOpenDelete, openRename, setOpenRename, id }:Props){

    const dispatch = useAppDispatch()
    const user_id = useAppSelector((state) => state.auth.user?.id);

    function handleFavorite(e: React.MouseEvent){
        e.stopPropagation();

        if (!user_id) {
            return null;
        }
        
        dispatch(favoriteFile({user_id: user_id, file_id: id}))
        setOpen(!open)
    }

    return(

        <div 
            className={open == true ? styles.editMenu : styles.hidden}
            onClick={(e) => e.stopPropagation()}    
        >

            <button onClick={() => {setOpenDelete(!openDelete); setOpen(!open)}}>
                Удалить
            </button>

            <button onClick={handleFavorite}>
                В избранные 
            </button>

            <button onClick={() => {setOpenRename(!openRename); setOpen(!open)}}>
                Переименовать
            </button>

        </div>

    )
}

export default FileMenu
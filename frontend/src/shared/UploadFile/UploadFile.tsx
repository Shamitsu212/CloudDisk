import { Upload } from 'lucide-react'

import styles from './UploadFile.module.css'

import { useDrag } from './hooks/useDrag'

import { useAppSelector, useAppDispatch } from '../../app/store/useAppHooks';
import { createFile } from '../../main/slice/fileSlice/fileThunks';


function UploadFile(){

    const dispatch = useAppDispatch();

    const user_id = useAppSelector(
        (state) => state.auth.user?.id
    );

    const { isDragging } = useDrag((files) => {

        if(!user_id){
            return;
        }

        files.forEach((file) => {

            dispatch(createFile({user_id, file}))
            
        })

    });


    if (!isDragging) {
        return null;
    }


    return(
        <div className={styles.Modal}>

            <div className={styles.Modal__UploadFile}>

            
                <div className={styles.UploadFile__border}>

                    <p className={styles.border__p}>

                        <Upload  size={68} color='#2563eb'/>

                        <span className={styles.p__text}>
                            Перетащите файл для загрузки.
                        </span>


                    </p>

                </div>

            </div>

        </div>
    )
}

export default UploadFile
import styles from './MainPage.module.css'

import Aside from './components/layout/Aside/Aside'
import Content from './components/layout/Content/Content'

import { useAppDispatch, useAppSelector } from '../../app/store/useAppHooks'
import { fetchFolders } from '../slice/folderThunks'

import { useEffect } from 'react'


function MainPage(){

    const dispatch = useAppDispatch()
    const user_id = useAppSelector((state) => state.auth.user?.id)

    useEffect(() => {

        if(!user_id){
            return 
        }

        dispatch(fetchFolders(user_id))
    }, [dispatch])

    return(
        <div className={styles.Container}>

            <Aside/>

            <Content/>

        </div>
    )
}

export default MainPage
import styles from './Logo.module.css'

import { CloudUpload } from 'lucide-react'

function Logo(){

    return(
        
        <div className={styles.logo}>
            <CloudUpload size={24} color='#2563eb'/>
            CloudDisk
        </div>
    )
}

export default Logo
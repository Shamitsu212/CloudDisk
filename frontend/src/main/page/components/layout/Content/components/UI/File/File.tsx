import styles from "./File.module.css"




interface Props {
    id: number,
    name: string,
    type: string,
}

function Folder({id, name, type}:Props){

    
   
    return(
        <article 
            className={styles.article}
            
        >

            <div>
                {type}  {id}
            </div>

            <p> 
                {name}
            </p>

            <button>

            </button>

        </article>
    )
}

export default Folder
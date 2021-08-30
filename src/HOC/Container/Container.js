import React,{useState} from 'react'
import classes from "./Container.module.css"
export default function Container(props){
    const [showContainer, setShowContainer] = useState(true)
    return (
        <div className="container">
                <div className={classes.topWrapper} onClick={()=>{setShowContainer(!showContainer)}}>
                    <h1 className={classes.title}>{props.title}</h1>
                    <div className={classes.show} >{showContainer?"Скрыть":"Показать"}</div>
                </div>
                {showContainer && props.children}
        </div>
    )
}

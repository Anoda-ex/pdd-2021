import React from 'react'
import classes from "./Switch.module.css"
export default function Switch(props) {
    let classList=[classes.switch]
    if(props.isActive){
        classList.push(classes.active)
    }
    return (
        <div>
           <label className={classList.join(" ")}>
                <input type="checkbox" onChange={props.switch}></input>
                <span className={classes.slider+" "+classes.round}></span>
            </label> 
        </div>
    )
}

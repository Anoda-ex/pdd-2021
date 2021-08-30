import React,{useState} from 'react'
import classes from "./ThemeSelect.module.css"
export default function ThemeSelect(props) {
    // const [selectedThemes,seSelectedThemes]=useState({})
    const setSelectThemes=(index)=>{
        if(props.selectThemes.indexOf(index)==-1){
          

            let selectThemes=[...props.selectThemes]
            selectThemes.push(index)
            props.setSelectThemes(selectThemes)
        }else{
            let selectThemes=[...props.selectThemes]
            selectThemes.splice(selectThemes.indexOf(index),1)
            props.setSelectThemes(selectThemes)
        }
    }
    
    return (
        <React.Fragment>
            <div className={classes.wrapper}>
                {props.themes.map((theme,index)=>{
                    let classList=[classes.item]
                    if(props.selectThemes.indexOf(index)>-1){
                        classList.push(classes.active)
                    }
                    return <div key={theme.name} className={classList.join(" ")} onClick={()=>{setSelectThemes(index)}}>{theme.name}</div>
                })}
            </div>
        </React.Fragment>
    )
}

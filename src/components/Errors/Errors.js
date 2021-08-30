import React from 'react'
import classes from "./Errors.module.css"
export default function Errors(props) {
    
    let isErrors=true;
    let content=Object.keys(props.errors).map(themeId=>{  
        if(props.settings.onlyThemeError && props.selectThemes.indexOf(+themeId)<0){
            return null
        }else{
            isErrors=false
            let originalTheme=props.themes[themeId]
            return <div key={originalTheme.name}>
                <div className={classes.title}>
                    <span className={classes.title}>{originalTheme.name}</span>
                </div>
                <div className={classes.questTitles}>
                    {Object.keys(props.errors[themeId]).map(questionId=>{
                        let question=props.errors[themeId][questionId][Object.keys(props.errors[themeId][questionId])[0]]
                        let originalQuestion=originalTheme.quests[questionId]
                        let classList=[classes.questTitle]
                        if(questionId==props.selectError){
                            classList.push(classes.active)
                        }
                        return <div className={classList.join(" ")} key={questionId} onClick={()=>{props.selectErrorHandler(questionId)}}>{questionId}. {question.title}</div>
                    })}
                </div>
            </div>  

        }
    })
    if(isErrors){
        content=<div className={classes.titleNoErrors}>{props.isAuth?"У вас нет ошибок":"Войдите в аккаунт"}</div>
    }

    return (
        <div>
            {content}
        </div>
    )
}

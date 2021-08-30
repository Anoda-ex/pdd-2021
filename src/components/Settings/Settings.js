import React, { useState,useRef } from 'react'
import Switch from '../UI/Switch/Switch'
import classes from "./Settings.module.css"
let authTranslate={
    "auth/invalid-email":"Неправильная почта",
    "auth/user-not-found":"Нет пользователя с такой почтой",
    "auth/email-already-in-use":"Почтовый адресс занят",
    "auth/weak-password":"Слабый пароль, нужно миниум 6 символов",
    "auth/wrong-password":"Неправильный пароль"
}
export default function Settings(props) {
    // const [isTrackError, setIsTrackError] = useState(initialState)
    const [isRegister, setIsRegister] = useState(false)
    const emailRef = useRef("")
    const passwordRef = useRef("")

    return (
        <React.Fragment>
            <div className={classes.row}>
                <p className={classes.title}>Сохранять ошибки</p>
                <Switch switch={()=>{props.setParam("trackErrors",!props.settings.trackErrors)}} isActive={props.settings.trackErrors&&props.isAuth}></Switch>
            </div>
            <div className={classes.row}>
                <p className={classes.title}>Тестировать только по ошибкам</p>
                <Switch switch={()=>{props.setParam("onlyErrorTestingMode",!props.settings.onlyErrorTestingMode)}} isActive={props.settings.onlyErrorTestingMode}></Switch>
            </div>
            <div className={classes.row}>
                <p className={classes.title}>Показывать ошибки только по выбранной теме</p>
                <Switch switch={()=>{props.setParam("onlyThemeError",!props.settings.onlyThemeError)}} isActive={props.settings.onlyThemeError}></Switch>
            </div>
            <div className={classes.authWrapper}>
                {props.isAuth?
                <button onClick={props.exit} className={classes.authButton}>Выйти с аккаунта</button>
                :
                <React.Fragment>
                    <h2 className={classes.authTitle}>{isRegister?"Регистрация":"Войти"}</h2>
                    <input ref={emailRef} className={classes.authInput} placeholder="Почта"></input>
                    <input ref={passwordRef} className={classes.authInput} placeholder="Пароль" type="password"></input>
                    <div onClick={()=>{setIsRegister(!isRegister)}} className={classes.authMode}>{isRegister?"Есть аккаунт?":"Нет аккаунта?"}</div>
                    {props.authError&&props.authError.length==2 && <div className={classes.authError}>{authTranslate[props.authError[0]] ? authTranslate[props.authError[0]] : props.authError[1]}</div> }
                    <button onClick={()=>{props.auth(isRegister,emailRef.current.value,passwordRef.current.value)}} className={classes.authButton}>{isRegister?"Зарегестрироваться":"Войти в аккаунт"}</button>
                </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

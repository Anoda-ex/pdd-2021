import React,{useContext,useEffect,useState} from 'react'
import Container from '../../HOC/Container/Container'
import {Context} from "../../index"
import Errors from '../Errors/Errors'
import Loader from '../Loader'
import Questions from '../Questions/Questions'
import Settings from '../Settings/Settings'
import ThemeSelect from '../ThemeSelect/ThemeSelect'
export default function Test(props) {
    const {auth, database} = useContext(Context)



    const [themes,setThemes]=useState([])
    // const [UID,setUID]=useState("a1")
    const [selectThemes,setSelectThemes]=useState([0])
    const [errors,setErrors]=useState({})
    const [settings,setSettings]=useState({
        trackErrors: true,
        nextAnswerWaitingTime: 2000,
        onlyErrorTestingMode:false,
        onlyThemeError:false
    })
    const [selectError,setSelectError]=useState(null)
    const [UID, setUID] = useState(null)
    const [authError, setAuthError] = useState(null)


    useEffect(() => {
        getThemes()
        auth.onAuthStateChanged(user=>{
            if(user){
                setUID(user.uid)
            }
        })

    }, [])
    useEffect(() => {
        if(UID){
            getErrors()
        }
    }, [UID])


    const getThemes = () => {
        database.ref("/themes").once("value",themes=>{
            setThemes(themes.val())
        })
    }
    const getErrors = () => {
        database.ref("/errors/"+UID+"/themes").on("value",errors=>{
            if(errors.val()){
                setErrors(errors.val())

            }
        })
    }
    const addError=(theme,question,title,yourAnswer,correctAnswer,yourAnswerIndex,correctAnswerIndex)=>{
        if(UID){
            database.ref("/errors/"+UID+"/themes/"+theme+"/"+question).push({
                title:title,
                yourAnswer:yourAnswer,
                correctAnswer:correctAnswer,
                yourAnswerIndex:yourAnswerIndex,
                correctAnswerIndex:correctAnswerIndex
            })
        }
    }


    const transformQuestions=()=>{
        let questions={}
        selectThemes.map(themeId=>{
            questions={...questions,...themes[themeId]?.quests}
            Object.keys(themes[themeId].quests).map(questId=>{
                questions[questId]={...themes[themeId].quests[questId],themeId:themeId}
            })
        })
        return questions
    }
    const transformErrors=()=>{
        let questions={}
        let currentQuestions={}
        if(settings.onlyThemeError){
            selectThemes.map(themeId=>{
                
                let originalTheme=themes[themeId]
                if(errors[themeId]){
                    Object.keys(errors[themeId]).map(questionId=>{
                        if(errors[themeId]){
                            let question=errors[themeId][questionId][Object.keys(errors[themeId][questionId])[0]]
                            let originalQuestion=originalTheme.quests[questionId]
                            questions[questionId]={...originalQuestion,themeId:themeId}
                            currentQuestions[questionId]={active:question.yourAnswerIndex,status:"no",edit:false}
                        }
                    })
                    if(Object.keys(questions).indexOf(selectError)<0){
                        setSelectError(Object.keys(questions)[0])
                    }

                }
            })
        }
        else{
            Object.keys(errors).map(themeId=>{
                let originalTheme=themes[themeId]
                Object.keys(errors[themeId]).map(questionId=>{
                    let question=errors[themeId][questionId][Object.keys(errors[themeId][questionId])[0]]
                    let originalQuestion=originalTheme.quests[questionId]
                    questions[questionId]={...originalQuestion,themeId:themeId}
                    currentQuestions[questionId]={active:question.yourAnswerIndex,status:"no",edit:false}
                    
                })
            })
        }

        return [questions,currentQuestions]
    }

    let selectErrorHandler=(selectError)=>{
        setSelectError(selectError)
        if(!settings.onlyErrorTestingMode){
            setSettings(nowSetting=>({...nowSetting,onlyErrorTestingMode:true}))
        }
    }

    let startAuth=(isRegister,email,password)=>{
        setUID(null)
        setAuthError(null)

        if(isRegister){
            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              let user = userCredential.user;
            //   setUID(user.uid)
            })
            .catch((error) => {
              let errorCode = error.code;
              let errorMessage = error.message;
              setAuthError([errorCode,errorMessage])
              
            });
        }else{
            auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              let user = userCredential.user;
            })
            .catch((error) => {
              let errorCode = error.code;
              let errorMessage = error.message;
              setAuthError([errorCode,errorMessage])
              
            });

           
        }
    }
    let exit=()=>{
        auth.signOut().then(()=>{
            database.ref("/errors/"+UID+"/themes").off()
            setUID(null)
            setAuthError(null)
            setErrors({})
            setSelectError(null)
        })
    }

    if(themes.length==0){
        return <Loader></Loader>
    }
    
    
    let questions=Object.keys(themes).length>0?transformQuestions(selectThemes):[]
    let [errorsQuestions,errorsAnswers]=transformErrors()
    return (
        <div>
            <div>
                <Container title="Список тем">
                    <ThemeSelect 
                        themes={themes} 
                        selectThemes={selectThemes} 
                        setSelectThemes={setSelectThemes} >
                    </ThemeSelect>
                </Container>
                <Questions 
                    questions={questions} 
                    addError={addError} 
                    themes={selectThemes}
                    settings={settings}
                    errorsQuestions={errorsQuestions}
                    errorsAnswers={errorsAnswers}
                    selectError={selectError}
                    setSelectError={setSelectError}
                ></Questions>
                <Container title="Список ошибок">
                    <Errors 
                        errors={errors} 
                        settings={settings} 
                        themes={themes}
                        selectErrorHandler={selectErrorHandler}
                        selectThemes={selectThemes}
                        selectError={selectError}
                        isAuth={!!UID}
                    >
                    </Errors>
                </Container>
                <Container title="Настройки">
                    <Settings 
                        setParam={(paramName,value)=>{setSettings(nowSetting=>({...nowSetting,[paramName]:value}))}} 
                        settings={settings}
                        auth={startAuth}
                        isAuth={!!UID}
                        exit={exit}
                        authError={authError}

                    >
                    </Settings>
                </Container>

            </div>
        </div>
    )
}



import React,{useState,useEffect} from 'react'
import classes from "./Questions.module.css"
function Questions(props) {
    let [answersState,setAnswersState]=useState({})
    let [currentQuestion,setCurrentQuestionState]=useState(null)
    // props.settings.onlyErrorTestingMode?
    let answers=props.settings.onlyErrorTestingMode?props.errorsAnswers:answersState
    //выбор списка вопросов в зависимости от того включено показывание ошибок
    let questions=props.settings.onlyErrorTestingMode?props.errorsQuestions:props.questions
    let setCurrentQuestion=(questNumber)=>{
        setCurrentQuestionState(questNumber)
        if(props.settings.onlyErrorTestingMode){
            props.setSelectError(questNumber)
        }else{
            props.setSelectError(null)
        }
    }


    useEffect(
        () => {
            if(!props.settings.onlyErrorTestingMode){
                setCurrentQuestion((Object.keys(props.questions))[0])
            }
            else{
                if(props.selectError){
                    setCurrentQuestion(props.selectError)
                }else{
                    setCurrentQuestion(Object.keys(props.errorsQuestions)[0])
                    
                }
            }
        },
        [props.themes,props.settings.onlyErrorTestingMode,props.selectError],
      );
    

    let questList=Object.keys(questions).map(quest=>{
        let classList=[classes.questItem]
        if(currentQuestion==quest){
            classList.push(classes.active)
        }
        if(answers[quest]?.status=="ok"){
            classList.push(classes.ok)
        }
        if(answers[quest]?.status=="no"){
            classList.push(classes.no)
        }
        return <div 
                    className={classList.join(" ")} 
                    onClick={()=>{setCurrentQuestion(quest)}}
                    key={quest}
                >{quest}</div>
    })
    let answerList = null
    if(currentQuestion){
        answerList = questions[currentQuestion]?.answer.map((answerText,number)=>{
            let classList=[classes.answer]
           
            if(answers[currentQuestion]?.status=="ok" && answers[currentQuestion]?.active==number){
                classList.push(classes.ok)
            }
            if(answers[currentQuestion]?.status=="no" && questions[currentQuestion].correctAnswer==number+1){
                classList.push(classes.ok)
            }
            if(answers[currentQuestion]?.status=="no" && answers[currentQuestion]?.active==number){
                classList.push(classes.no)
            }
            if(!answers[currentQuestion]?.status && answers[currentQuestion]?.active==number){
                classList.push(classes.active)
            }
            return <div key={answerText} className={classList.join(" ")} onClick={()=>{(!answers[currentQuestion]?.edit) && setAnswersState({...answers,[currentQuestion]:{...answers[currentQuestion],active:number}  })}}>{answerText}</div>
        })
    }


    //метод проверки, написан на answersState, независимо от того включено показывать ошибки или нет
    //так как если ошибки показаны, метод cheсk() не должен работать
    const check=()=>{
        let questionsKeys= Object.keys(questions)
        let indexOfCurrentQuestion=questionsKeys.indexOf(currentQuestion)
        let lastIndexOfQuestions=questionsKeys[questionsKeys.length-1]
        let waitingTime=props.settings.onlyErrorTestingMode?0:props.settings.nextAnswerWaitingTime
        if(indexOfCurrentQuestion>=lastIndexOfQuestions){
            console.log("Конец");
        }else{
            setTimeout(()=>{
                setCurrentQuestion(questionsKeys[indexOfCurrentQuestion+1])
            
            },waitingTime)
        }

        if(props.settings.onlyErrorTestingMode){
            return
        }

        if(answersState[currentQuestion]?.active+1==props.questions[currentQuestion].correctAnswer){
            setAnswersState({...answersState,[currentQuestion]:{...answersState[currentQuestion],status:"ok",edit:true}})
        }else{
            let question=props.questions[currentQuestion]
            setAnswersState({...answersState,[currentQuestion]:{...answersState[currentQuestion],status:"no",edit:true}})
            if(props.settings.trackErrors){
                props.addError(question.themeId,currentQuestion,question.title,question.answer[answers[currentQuestion]?.active],question.answer[question.correctAnswer-1],answers[currentQuestion]?.active,question.correctAnswer-1)
            }
        }
        
       
    }


    return (
        <div className="container">
            {Object.keys(questions).length>0?
            <React.Fragment><div className={classes.questList}>
                {questList}
            </div>
            {questions[currentQuestion]&&<div className={classes.title}>{questions[currentQuestion].title}</div>}
            {currentQuestion&&questions[currentQuestion]?.img&& questions[currentQuestion]?.img!="none"&&
                <div className={classes.imgWrapper}>
                    <img src={"https://xn----gtbem5ahjgc.com/stat01052020/images/online/"+questions[currentQuestion].img} className={classes.img}></img>
                </div> 
            }
            <div className={classes.answerList}>
                {answerList}
            </div>
            <button className={classes.button} onClick={check} 
            disabled={!answers[currentQuestion]}
            >Следующий</button></React.Fragment>:<div className={classes.NoQuestions}>Нет вопросов по теме</div>}
        </div>
    )
}

export default Questions

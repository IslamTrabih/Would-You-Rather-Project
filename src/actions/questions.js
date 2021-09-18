import {saveQuestionAnswer, saveQuestion} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'


const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
const SAVE_ANSWER = 'SAVE_ANSWER'
const ADD_QUESTIONS = 'ADD_QUESTIONS'


const receiveQuestions =(questions)=>{
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

const saveAnswer = ({authUser, id, answer})=>{
    return{
        type: SAVE_ANSWER,
        authUser,
        id,
        answer,
    }
}

const addQuestion = (question)=>{
    return{
        type: ADD_QUESTIONS,
        question,
    }
}

const handhleddQuestion = (optionOneText, optionTwoText)=>{
    return(dispatch, getState)=>{
        const {authUser} = getState()
        dispatch(showLoading())
        return saveQuestion({optionOneText, optionTwoText, author: authUser})
        .then((question)=>{
            dispatch(addQuestion(question))
            dispatch(hideLoading())
        })
    }
}

const handleSaveAnswer = (id, answer)=>{
    return (dispatch, getState)=>{
        const {authUser} = getState()
        dispatch(showLoading())
        return saveQuestionAnswer({
                authedUser: authUser,
                qid: id,
                answer,
            })
            .then(()=> {
                dispatch(saveAnswer({authUser, id, answer}))
                dispatch(hideLoading())
            })
    }
}


export {RECEIVE_QUESTIONS, SAVE_ANSWER, ADD_QUESTIONS, receiveQuestions, handleSaveAnswer, handhleddQuestion}
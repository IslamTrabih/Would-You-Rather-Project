import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer,
} from './_DATA'


const getInitialData = ()=>{
    return(
        Promise.all([
            _getUsers(),
            _getQuestions(),
        ]).then(([users, questions])=>{
            return{
                users,
                questions,
            }
        })
    )
}

const saveQuestion =(info)=>{
    return _saveQuestion(info)
}

const saveQuestionAnswer =(info)=>{
    return _saveQuestionAnswer(info)
}

export {getInitialData, saveQuestion, saveQuestionAnswer}
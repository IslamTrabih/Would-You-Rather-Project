import { RECEIVE_QUESTIONS, SAVE_ANSWER, ADD_QUESTION } from '../actions/questions'

const questions = (state = {}, action)=>{
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return{
                ...state,
                ...action.questions,
            }
        case SAVE_ANSWER :
            return{
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.answer]: {
                        ...state[action.id][action.answer],
                        votes: state[action.id][action.answer].votes.concat([action.authUser])
                    }
                }
            }
        case ADD_QUESTION :
            return{
                ...state,
                [action.question.id]: action.question
            }
        default :
            return state
    }
}

export default questions
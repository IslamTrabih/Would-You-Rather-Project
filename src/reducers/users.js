import {RECEIVE_USERS} from '../actions/users'
import {SAVE_ANSWER, ADD_QUESTION} from '../actions/questions'

const users = (state = {}, action)=>{
    switch (action.type) {
        case RECEIVE_USERS :
            return{
                ...state,
                ...action.users
            }
        case SAVE_ANSWER :
            return{
                ...state,
                [action.authUser]:{
                    ...state[action.authUser],
                answers:{
                    ...state[action.authUser].answers,
                    [action.id]: action.answer
                }
                }
            }
        case ADD_QUESTION :
            return{
                ...state,
                [action.question.author]:{
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat(action.question.id)
                }
            }
        default :
            return state
    }
}

export default users
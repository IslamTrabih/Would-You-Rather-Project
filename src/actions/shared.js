import {receiveUsers} from './users'
import {receiveQuestions} from './questions'
import {getInitialData} from '../utils/api'
// import {setAuthedUser} from '../actions/authUser'
import {showLoading, hideLoading} from 'react-redux-loading'


// const USER_ID = 'tylermcginnis'

const handleInitialData = ()=>{
    return (dispatch)=>{
        dispatch(showLoading())
        return(
            getInitialData()
            .then(({users, questions})=>{
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                // dispatch(setAuthedUser(USER_ID))
                dispatch(hideLoading())
            })
        )
    }
}

export default handleInitialData
import {combineReducers} from 'redux'
import authUser from './authUser'
import users from './users'
import questions from './questions'
import {loadingBarReducer} from 'react-redux-loading'

const reducers = combineReducers({
    authUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
})

export default reducers
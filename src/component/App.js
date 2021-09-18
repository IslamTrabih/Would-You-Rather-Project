import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import handleInitialData from '../actions/shared'
// import UserCard from './UserCard'
import Nav from './veiws/Nav'
import Login from './veiws/Login'
import Dashboard from './veiws/Dashboard'
import QuestionDetailes from './veiws/QuestionDetailes'
import NewQuestion from './veiws/NewQuestion'
import Leaderboard from './veiws/Leaderboard'
import LoadingBar from 'react-redux-loading'
import Error_404 from './veiws/Error_404'


class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <LoadingBar />
          {
            // Check user is loged in in or not
            this.props.login ? <Login />
            : <Fragment >
                <Route path='/' component={Nav} />
                <Route path='/Login' component={Login}/>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/question/:id' component={QuestionDetailes} detailed/>
                <Route path='/add' component={NewQuestion}/>
                <Route path='/leaderboard' component={Leaderboard}/>
                <Route path='*/404' component={Error_404} />
            </Fragment>
          }
      </Router>
    )
  }
}

const mapStateToProps = ({authUser}) => ({
  login: authUser === null,
})


export default connect(mapStateToProps)(App)
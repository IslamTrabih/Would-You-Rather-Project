import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from '../dashboard/UserCard'
import {
    AppBar,
    Box,
    Tabs,
    Tab,
} from '@material-ui/core'
import {
    QuestionAnswer as QuestionAnswerIcon, 
    CheckCircle as CheckCircleIcon,
} from '@material-ui/icons'



export class Dashboard extends Component {

    state ={
        value: 0,
    }

    handleChange = (e, value)=>{
        this.setState((prevState)=>{
            return{
                value,
            }
        })
    }

    render() {
        const {value} = this.state
        const {unAnsweredQuestions, answeredQuestions} = this.props
        return (
            <div className='container' style={{border: `1px solid ${value ? '#3f51b5' : '#bb0042'}`}}>
                <AppBar position="static" color="default" >
                    <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    >
                    <Tab label="UnAnswered Questions" icon={<QuestionAnswerIcon />} />
                    <Tab label="Answered Questions" icon={<CheckCircleIcon />} />
                    </Tabs>
                </AppBar>
                <Box value={value}  hidden={value !== 0} m={3} >
                    {unAnsweredQuestions.map((key)=>{
                        return <UserCard key={key} id={key} />
                    })}
                </Box>
                <Box value={value}  hidden={value !== 1} m={3}>
                    {answeredQuestions.map((key)=>{
                        return <UserCard key={key} id={key} />
                    })}
                </Box>
            </div>
        )
    }
}

const mapStateToProps = ({questions, authUser, users}) =>{
    const user = users[authUser]
    const answeredQuestions = Object.keys(user.answers)
    .sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
    const unAnsweredQuestions = Object.keys(questions).filter((key)=> !answeredQuestions.includes(key))
    .sort((a,b)=> questions[b].timestamp - questions[a].timestamp)

    return{
        answeredQuestions,
        unAnsweredQuestions,
    }
}


export default connect(mapStateToProps)(Dashboard)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Typography, Button, ListItem, ListItemText} from '@material-ui/core'


export class QuestionCard extends Component {

    handeleClick = (e, id)=>{
        e.preventDefault()
        // console.log('Clicked')
        this.props.history.push(`/questions/${id}`)
    }

    render() {
        const {optionOne, answered, color, userAnswer, id} = this.props
        // console.log(userAnswer)
        return (
            <div >
                <Typography 
                variant="h6"
                color="textSecondary"
                >
                    {answered 
                        ? <div>
                            <ListItem style={{padding: "0"}}>
                                <ListItemText
                                    primary='Your Answer is: '
                                    secondary={userAnswer}
                                />
                            </ListItem>
                        </div> 
                        : <div>
                            {optionOne}
                            <br/>
                            or.......
                        </div>
                    }
                </Typography>
                <Button 
                variant="outlined"
                onClick={(e)=> this.handeleClick(e, id)}
                color="primary"
                style={{
                    border: `1px solid ${color}`,
                    color: `${color}`,
                    width: '100%'
                }} 
                >
                    {answered ? 'Result' : 'Answer'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = ({questions, users, authUser},{id}) =>{
    const question = questions[id]
    const optionOne = question.optionOne.text
    const answered = users[authUser].answers[id]
    const color = answered ? '#3f51b5' : '#bb0042'

    const userAnswer = answered ? question[answered].text : null
    return{
        question,
        optionOne,
        answered,
        color,
        userAnswer,
    }
}

export default withRouter(connect(mapStateToProps)(QuestionCard))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    Box,
    LinearProgress,
    Typography,
    Button,
} from '@material-ui/core'
import {
    ArrowLeftOutlined as ArrowLeftOutlinedIcon, 
    CheckCircle as CheckCircleIcon,
} from '@material-ui/icons'


export class QuestionResult extends Component {

    handleClick = (e)=>{
        e.preventDefault()
        // console.log('Clicked')
        this.props.history.push('/')
    }

    render() {
        const {
            optionOne,
            optionTwo,
            optionOneAnswer,
            optionTwoAnswer,
            answerSum,
            optionOnePercentage,
            optionTwoPercentage,
            optionOneStyle,
            optionTwoStyle,
            userAnswer,
        } = this.props
        // console.log(userAnswer)
        return (
            <div>
                <div id='optionOne'>
                    <Typography variant="h5" color="textSecondary">
                        {optionOne}
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <LinearProgress
                            style={{maxWidth: '245px', height: '20px', borderRadius: '10px'}}
                            color={optionOneStyle}
                            variant="determinate"
                            value={optionOnePercentage}
                            />
                        </Box>
                        {(userAnswer === 'optionOne') && <ArrowLeftOutlinedIcon />}
                        <Box>
                            <Typography variant="h5" color={optionOneStyle}>{`${optionOnePercentage}%`}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary" >
                        {`${optionOneAnswer} of ${answerSum}`}
                    </Typography>
                </div>
                <br/>
                <div id='optionTwo'>
                    <Typography variant="h5" color="textSecondary">
                        {optionTwo}
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <LinearProgress
                            style={{maxWidth: '245px', height: '20px', borderRadius: '10px'}}
                            color={optionTwoStyle}
                            variant="determinate"
                            value={optionTwoPercentage}
                            />
                        </Box>
                        {(userAnswer === 'optionTwo') && <CheckCircleIcon />}
                        <Box>
                            <Typography variant="h5" color={optionTwoStyle}>{`${optionTwoPercentage}%`}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary" >
                    {`${optionTwoAnswer} of ${answerSum}`}
                    </Typography>
                </div>
                <br/>
                <div style={{textAlign: 'right', marginRight: '10px'}}>
                <Button variant="outlined" onClick={this.handleClick}>back</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({questions, authUser, users}, {id}) =>{
    const question = questions[id]
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    const optionOneAnswer = question.optionOne.votes.length
    const optionTwoAnswer = question.optionTwo.votes.length
    const answerSum = optionOneAnswer + optionTwoAnswer
    const optionOnePercentage = Number(((optionOneAnswer / answerSum)*100).toFixed(2))
    const optionTwoPercentage = Number(((optionTwoAnswer / answerSum)*100).toFixed(2))
    const userAnswer = users[authUser].answers[id]
    const optionOneStyle = (userAnswer === 'optionOne') ? 'primary' : 'secondary'
    const optionTwoStyle = (userAnswer === 'optionTwo') ? 'primary' : 'secondary'

    return{
        optionOne,
        optionTwo,
        authUser,
        optionOneAnswer,
        optionTwoAnswer,
        answerSum,
        optionOnePercentage,
        optionTwoPercentage,
        optionOneStyle,
        optionTwoStyle,
        userAnswer,
    }
}

export default withRouter(connect(mapStateToProps)(QuestionResult))

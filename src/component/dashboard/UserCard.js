import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import QuestionForm from './QuestionForm'
import QuestionCard from './QuestionCard'
import QuestionResult from './QuestionResult'
import {
    Card,
    Grid,
    CardHeader,
    Avatar,
} from '@material-ui/core'


class UserCard extends Component {

    render() {
        const {
            id,
            name,
            avatarURL,
            cardColor,
            userAnswer,
            detailed,
            question,
            // user,
        } = this.props
        // console.log(user)
        if(!question){
            return <Redirect to='404' />
        }
        return (
            <div style={{width: '55%', margin: '0 auto', marginBottom: '20px'}}>
                <Card 
                style={{
                    borderRadius: '10px', borderBottom: `5px solid ${cardColor}`}}
                elevation={10}
                >
                    <CardHeader 
                    style={{background: `${cardColor}`, color: '#fff'}}
                    title={`${name} ask....`}
                    />
                    <Grid 
                    container
                    style={{margin: '5px'}}
                    spacing={3}
                    >
                        <Grid item >
                            <Avatar 
                            src={avatarURL}
                            alt={`Avatar of ${name}`}
                            style={{width: '150px',height: '150px'}}
                            />
                        </Grid>
                        <Grid item >
                            {!detailed 
                                ? <QuestionCard id={id} /> 
                                : userAnswer 
                                ? <QuestionResult id={id} /> 
                                : <QuestionForm id={id} />
                            }
                        </Grid>
                    </Grid>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({questions, authUser, users}, {id}) =>{
    const question = questions[id]
    const user = question && question.author
    const userAnswer = users[authUser].answers[id]
    const cardColor = userAnswer ? '#3f51b5' : '#bb0042'
    const avatarURL = question && users[user].avatarURL
    const name = question && users[user].name

    return{
        name,
        question,
        avatarURL,
        userAnswer,
        cardColor,
        // user
    }
}

export default connect(mapStateToProps)(UserCard)
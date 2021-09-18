import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    Grid,
    Avatar,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core'
import {
    CheckCircle as CheckCircleIcon,
} from '@material-ui/icons'



export class ScoreCard extends Component {
    render() {
        const {id, index, authUser, score, name, Color, avatarURL, answeredQuestions, createdQuestions} = this.props
        return (
                <div style={{maxWidth: '540px', margin: '0 auto', marginBottom: '20px'}}>
                    <Card 
                    style={{
                        borderRadius: '10px', borderBottom: `6px solid ${Color}`, borderTop: `2px solid ${Color}`}}
                    elevation={10}
                    >
                        <Grid 
                        container
                        style={{margin: '5px'}}
                        spacing={3}
                        >
                            {index && <Avatar style={{background: `${Color}`}}>{index}</Avatar>}
                            <Grid item >
                                <Avatar 
                                src={avatarURL}
                                alt={`avatar of ${name}`}
                                style={{width: '150px',height: '150px'}}
                                />
                            </Grid>
                            <Grid item >
                                <ListItem >
                                    <ListItemText
                                        primary={name}
                                        secondary={`@ ${id}`}
                                    />
                                </ListItem>
                                <ListItem >
                                    <ListItemText
                                        primary={`Answered Questions: ${answeredQuestions}`}
                                        color="textSecondary"
                                    />
                                </ListItem>
                                <ListItem >
                                    <ListItemText
                                        primary={`Created Questions: ${createdQuestions}`}
                                        color="textSecondary"
                                    />
                                </ListItem>
                            </Grid>
                            <Grid item style={{borderRadius: '10px', border: `1px solid ${Color}`}}>
                                <Typography 
                                variant="h5"
                                color="textSecondary"
                                >
                                    Score
                                </Typography>
                                <hr/>
                                <Avatar 
                                style={{width: '100%', margin: '0 auto', background: `${Color}`, marginBottom: '48px'}}
                                >
                                    {score}
                                </Avatar>
                                {(authUser === id) 
                                ? <CheckCircleIcon style={{width: '100%', margin: '0 auto', color: `${Color}`}} /> 
                                : null}
                            </Grid>
                        </Grid>
                    </Card>
            </div>
        )
    }
}

const mapStateToProps = ({authUser, users},{id, index}) => {
    const user = users[id]
    const name = user.name
    const avatarURL = user.avatarURL
    const answeredQuestions = Object.keys(user.answers).length
    const createdQuestions = user.questions.length
    const score = (answeredQuestions + createdQuestions)
    const Color = (index === 1) ? '#3f51b5' : (index === 2) ? 'green' : (index === 3) ? '#bb0042' : '#808080'

    return{
        id,
        index,
        authUser,
        name,
        avatarURL,
        answeredQuestions,
        createdQuestions,
        score,
        Color,
    }
}


export default connect(mapStateToProps)(ScoreCard)
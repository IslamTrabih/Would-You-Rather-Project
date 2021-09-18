import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScoreCard from '../leadboard/ScoreCard'

export class Leaderboard extends Component {
    render() {
        const {usersByScore} = this.props
        return (
            <div className='container' style={{border: '1px solid #3f51b5'}}>
                <h1 style={{textAlign: 'center', color: '#3f51b5'}}>Leaderboard</h1>
                {usersByScore.map((user)=>{
                    const id = user.id
                    const index = usersByScore.indexOf(user) + 1
                    return <ScoreCard key={id} index={index} id={id}/>
                })}
            </div>
        )
    }
}

const mapStateToProps = ({users}) => {
    const usersByScore = Object.keys(users).map((key)=>{
        const user = users[key]
        const answeredQuestions = Object.keys(user.answers).length
        const createdQuestions = user.questions.length
        const score = (answeredQuestions + createdQuestions)
        return{
            id: key,
            score,
        }
    }).sort((a,b)=> b.score - a.score)
    return{
        usersByScore
    }
}


export default connect(mapStateToProps)(Leaderboard)

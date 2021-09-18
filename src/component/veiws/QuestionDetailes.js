import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from '../dashboard/UserCard'


export class QuestionDetailes extends Component {
    render() {
        return (
            <div className='container'>
                <UserCard id={this.props.id} detailed/>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    const {id} = props.match.params
    return{
        id,
    }
}


export default connect(mapStateToProps)(QuestionDetailes)

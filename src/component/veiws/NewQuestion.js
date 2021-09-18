import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScoreCard from '../leadboard/ScoreCard'
import {handhleddQuestion} from '../../actions/questions'
import { withRouter } from 'react-router-dom'
import {
    Card,
    CardHeader,
    FormControl,
    FormLabel,
    Button,
    TextField,
    FormHelperText,
} from '@material-ui/core'
import {
    QuestionAnswer as QuestionAnswerIcon, 
} from '@material-ui/icons'



export class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleChange = (e, option) => {
        const value = e.target.value;
        // console.log(option, value)
        this.setState((prevState) => {
            return{
                ...prevState,
                [option]: value,
            }
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        // console.log('Submited')
        const {dispatch} = this.props
        const {optionOne, optionTwo} = this.state
        dispatch(handhleddQuestion(optionOne, optionTwo))
        this.props.history.push('/')
    }

    render() {
        const {id} = this.props
        const {optionOne, optionTwo} = this.state
        // console.log(this.state)
        return (
            <div className='container' style={{border: '1px solid #3f51b5'}}>
                <ScoreCard id={id} />
                <div style={{maxWidth: '540px', margin: '0 auto', marginBottom: '20px'}}>
                    <Card 
                    style={{
                        borderRadius: '10px', borderBottom: '5px solid #3f51b5'}}
                    elevation={10}
                    >
                        <CardHeader 
                        style={{background: '#3f51b5', color: '#fff'}}
                        title={'You are Asking Now.....'}
                        />
                        <form onSubmit={this.handleSubmit} style={{textAlign: 'center', margin: '20px'}}>
                            <FormLabel component='h1' style={{marginBottom: '30px'}}>Would You Rather?</FormLabel>
                            <FormControl fullWidth style={{marginBottom: '15px'}}>
                                <TextField 
                                label="Option One"
                                variant="outlined"
                                onChange={(e) => this.handleChange(e, 'optionOne')}
                                />
                                {!optionOne && <FormHelperText >is Required*</FormHelperText>}
                            </FormControl>
                            <br/>
                            <FormControl fullWidth style={{marginBottom: '25px'}}>
                                <TextField 
                                label="Option Two"
                                variant="outlined"
                                onChange={(e) => this.handleChange(e, 'optionTwo')}
                                />
                                {!optionTwo && <FormHelperText >is Required*</FormHelperText>}
                            </FormControl>
                            <Button 
                            type="submit"
                            variant="outlined"
                            color="primary"
                            endIcon={<QuestionAnswerIcon />}
                            fullWidth
                            disabled={!optionOne || !optionTwo}
                            >
                                Add Question
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({questions, authUser, users}) => {
    // const 

    return{
        users,
        id: authUser,

    }
}


export default withRouter(connect(mapStateToProps)(NewQuestion))

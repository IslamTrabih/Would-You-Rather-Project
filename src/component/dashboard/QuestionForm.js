import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../../actions/questions'
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Typography,
    Button,
} from '@material-ui/core';


export class QuestionForm extends Component {

    state ={
        value: '',
    }

    handleRadioChange = (e) => {
        this.setState((prevState)=>{
            return{
                value: e.target.value,
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log('Submited', this.state.value)
        const {id, dispatch} = this.props
        const {value} = this.state
        dispatch(handleSaveAnswer(id, value))
    }

    render() {
        const {value} = this.state
        const {optionOne, optionTwo} = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormControl component="fieldset">
                        <FormLabel 
                        component='h1'
                        style={{marginTop: '0'}}
                        >
                            Would You Rather?
                        </FormLabel>
                        <Typography 
                        variant="body2"
                        color="textSecondary"
                        >
                            You Selected: {value}
                        </Typography>
                        <RadioGroup 
                        aria-label="Would You Rather Card"
                        name="Would You Rather Card"
                        value={value}
                        onChange={this.handleRadioChange}
                        >
                        <FormControlLabel 
                        value="optionOne"
                        control={<Radio />}
                        label={optionOne}
                        />
                        <p style={{textAlign: 'center', margin: '0'}}>_________OR_________</p>
                        <FormControlLabel 
                        value="optionTwo"
                        control={<Radio />}
                        label={optionTwo}
                        />
                        </RadioGroup>
                        <Button 
                        type="submit"
                        variant="outlined"
                        color="primary"
                        disabled={!value}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({questions, authUser}, {id}) => {
    const question = questions[id]
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    return{
        optionOne,
        optionTwo,
        authUser,
    }
}

export default connect(mapStateToProps)(QuestionForm)

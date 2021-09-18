import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import login from '../../utils/imgs/login.jpg'
import logo from '../../utils/imgs/login-logo.jpg'
import {setAuthedUser} from '../../actions/authUser'
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    FormControl,
    Button,
    Avatar,
    Typography,
    ListItemText,
    ListItem,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core"
import MoodIcon from '@material-ui/icons/Mood'


export class Login extends Component {

    state = {
        value: '',
    }

    handleChange = (e)=>{
        this.setState((prevState)=>{
            return{
                value: e.target.value,
            }
        });
    }

    handleLogin = (e)=>{
        e.preventDefault()
        this.props.dispatch(setAuthedUser(this.state.value))
        // this.props.history.push('/')
    }


    render() {
        const {value} = this.state
        const {users, usersId} = this.props
        // console.log(value)
        return (
            <div className='container'>
                <Card style={{padding: "10px", border: '2px solid #3d3c3c', borderRadius: '10px'}} >
                    <CardHeader style={{margin: '5px'}}
                    avatar={
                        <Avatar
                        src={logo}
                        alt="logo"
                        style={{marginRight: '10px', width: '50px',height: '50px'}}
                        />
                    }
                    title="Would You Rather Game"
                    subheader="Login to Start"
                    />
                    <CardMedia
                    component="img"
                    image={login}
                    title="Would You Rather?"
                    alt="Would You Rather?"
                    style={{maxHeight: '500px'}}
                    />
                    <CardContent>
                        <Typography 
                        variant="body1"
                        color="textSecondary"
                        component="p"
                        style={{textAlign: 'center'}}
                        >
                            <MoodIcon /> Please Select User and Login enjoy <MoodIcon />
                        </Typography>
                    </CardContent>
                    <form >
                        <FormControl variant="outlined" style={{width: '100%'}}>
                            <InputLabel htmlFor="outlined-age-native-simple">Salact User</InputLabel>
                            <Select
                            value={value}
                            onChange={this.handleChange}
                            label="Salact User"
                            inputProps={{
                            name: 'userName',
                            id: 'user',
                            }}
                            fullWidth
                            >
                                <MenuItem value="">
                                <em>Select.......</em>
                                </MenuItem>
                                {usersId.map((userId)=>{
                                    return(
                                        <MenuItem key={userId} value={userId} >
                                            <Avatar
                                            src={users[userId].avatarURL}
                                            alt={`Avatar of ${users[userId].name}`}
                                            style={{marginRight: '20px'}}
                                            />
                                            <ListItem component="div"  style={{padding: "0"}}>
                                                <ListItemText
                                                primary={users[userId].name}
                                                secondary={`@ ${userId}`}
                                                />
                                            </ListItem>
                                        </MenuItem>
                                    )
                                })}
                                {/* For Test
                                <MenuItem value="">
                                <em>Select.......</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                            <br/>
                            <Button
                            aria-label="Logout"
                            onClick={this.handleLogin}
                            color="primary"
                            size="large"
                            variant="outlined"
                            disabled={value === ''}
                            style={{marginBottom: '10px'}}
                            >
                                Login
                            </Button>
                        </FormControl>
                    </form>
                </Card>
            </div>
        )
    }
}


const mapStateToProps = ({users}) => {
    const usersId = users && Object.keys(users)
    return{
        users,
        usersId,
    }
}


export default withRouter(connect(mapStateToProps)(Login))

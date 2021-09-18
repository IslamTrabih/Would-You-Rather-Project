import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../../actions/authUser'
import logo from '../../utils/imgs/logo.png'
import {withRouter, NavLink} from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Button,
    Avatar,
    ListItem,
    ListItemText,
} from "@material-ui/core"
import {
    Home as HomeIcon,
    ExitToApp as ExitToAppIcon,
    Help as HelpIcon,
    Dashboard as DashboardIcon
} from '@material-ui/icons';


export class Nav extends Component {
    state ={
        value: '/',
    }

    handleChange = (e, value)=>{
        this.setState((prevState)=>{
            return{
                value,
            }
        })
        this.props.history.push(`${value}`)
    }

    handleLogOut = (e) => {
        e.preventDefault()
        this.props.dispatch(setAuthedUser(null))
        this.props.history.push('/login')    
    }

    render() {
        const {value}=this.state
        const {id, avatarURL, name} = this.props.user
        return (
            <div style={{marginBottom: '15px'}}>
                <AppBar color="default" position="static">
                    <Toolbar>
                        <Avatar 
                        src={logo}
                        alt='logo'
                        style={{width: '60px',height: '60px', marginRight: '20px'}}
                        />
                        <div style={{flexGrow: '1'}}>
                            <Tabs 
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChange}
                            aria-label="Nav List"
                            >
                                <Tab
                                value="/"
                                label="Home"
                                component={NavLink}
                                to="/"
                                icon={<HomeIcon />}
                                />
                                <Tab
                                value="/add"
                                label="New Question"
                                component={NavLink}
                                to="/add"
                                icon={<HelpIcon />}
                                />
                                <Tab
                                value="/leaderboard"
                                label="Leaderboard"
                                component={NavLink}
                                to="/leaderboard"
                                icon={<DashboardIcon />}
                                />
                            </Tabs>
                        </div>
                        
                        <Button
                        aria-label="Avatar"
                        color="inherit"
                        style={{marginRight: '20px'}}
                        startIcon={
                            <Avatar
                            src={avatarURL}
                            alt={`Avatar of ${name}`}
                            style={{marginRight: '5px'}}
                            />
                        }
                        >
                            <ListItem style={{padding: "0"}}>
                                <ListItemText
                                    primary={name}
                                    secondary={`@ ${id}`}
                                />
                            </ListItem>
                        </Button>
                        <Button
                        aria-label="Logout"
                        onClick={this.handleLogOut}
                        color="secondary"
                        endIcon={<ExitToAppIcon />}
                        size="large"
                        variant="outlined"
                        >
                            LogOut
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


const mapStateToProps = ({authUser, users}) => {
    const user = users[authUser]
    return{
        user,
    }
}


export default withRouter(connect(mapStateToProps)(Nav))


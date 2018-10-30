import React, { Component } from 'react'
import { Paper, Grid, Button } from '@material-ui/core'
import TextField from '../../components/UI/TextField/TextField'
import Aux from '../../utils/Auxilary'
import classes from './Auth.css'
import bg from '../../assets/images/bitbird.png'
import { connect } from 'react-redux'
import * as authActions from '../../store/actions/auth'

class Auth extends Component {
    state = {
        isInRegisterMode: false,
        errors: []
    }

    onSubmit = (event) => {
        event.preventDefault();
        const errors=this.formValidation();
        if (errors.length>0)
        {
            this.setState({errors: errors})
            return;
        } 
        if(!this.state.isInRegisterMode) this.props.onLogin({ username: this.props.username, password: this.props.password })
        else this.props.onRegister({username: this.props.username,
                                    password: this.props.password,
                                    name: this.props.name,
                                    family: this.props.family})

    } 

    formValidation =()=>
    {
        const error=[];
        if(this.state.isInRegisterMode)
        {
            if(this.props.password!=this.props.rePassword) error.push('Password & RePassword are not equal.')
            if(this.props.password.length<5) error.push('Password must be longer than 5 characters.')
        }
        return error;
        
    }

    toggleRegisterModeHandler = () => this.setState(preState => { return { isInRegisterMode: !preState.isInRegisterMode } })
   
    render() {
        const style = { backgroundImage: `url(${bg})` }

        const registerFields = <Aux>
            <TextField required fullWidth type="password" label="Re-Password" name='rePassword' onChange={event => this.props.onFieldChanged(event)} />
            <TextField required fullWidth label="Name" name='name' onChange={event => this.props.onFieldChanged(event)} />
            <TextField required fullWidth label="Family" name='family' onChange={event => this.props.onFieldChanged(event)} />
        </Aux>

        return (
            <form onSubmit={event => this.onSubmit(event)}>
            <Grid container className={classes.container} >
                <Grid xs={4} item />
                <Grid xs={4} item>
                    <Paper className={classes.loginPanel}>
                        <Grid container>
                                <Grid xs={12} item style={style} className={classes.loginHeader} />
                                <Grid xs={12} item className={classes.loginText}><h3>Login</h3></Grid>
                                <Grid xs={12} item className={classes.errorPanel}>
                                {
                                        this.state.errors.map(error => <span>* {error}<br /></span>)
                                }
                                </Grid>
                                <TextField required fullWidth label="Username" name="username" onChange={event => this.props.onFieldChanged(event)} />
                                <TextField required type="password" name='password' fullWidth label="Password" onChange={event => this.props.onFieldChanged(event)} />
                                {
                                    this.state.isInRegisterMode ? registerFields : null
                                }
                                <Grid container >
                                    <Grid xs={12} className={classes.buttonsGrid}>
                                        <Button type='submit' fullWidth variant="contained" color="secondary" >{this.state.isInRegisterMode ? 'Register' : 'Login'}</Button>
                                    </Grid>
                                    <Grid xs={12} className={classes.buttonsGrid}>
                                        <Button onClick={this.toggleRegisterModeHandler} fullWidth color="primary" >{this.state.isInRegisterMode ? 'Login' : 'SignUp'}</Button>
                                    </Grid>
                                </Grid>
                        </Grid>
                    </Paper>
                    <div className={classes.domainText}>BitBird</div>
                </Grid>
                <Grid xs={4} item />
            </Grid>
            </form>
        )
    }
}

const mapDispathToProps = dispatch => {
    return {
             onLogin: (user) => dispatch(authActions.login(user)),
             onFieldChanged: (event) =>  dispatch(authActions.onFieldChanged(event.target.name,event.target.value)) ,
             onRegister: (user) => dispatch(authActions.onRegister(user))  
            }
}

const mapStateToProps = state =>({...state.auth})


export default connect(mapStateToProps, mapDispathToProps)(Auth);
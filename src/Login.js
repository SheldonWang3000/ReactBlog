import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import { globalVariable } from './GlobalVariable';

import { connect } from 'react-redux';
import { updateToken, clearToken } from './redux/actions';

import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1, 0),
    },
}));

function Login(props) {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();
    const loginFunc = () => {
        const url = globalVariable.host + "/api/token/";
            axios.post(url, {
                username: username,
                password: password
            }).then((response) => {
                props.updateToken(response.data.refresh, response.data.access);
                history.push('/');
            }).catch((e) => {
                console.log(e);
            });
    };
    useEffect(()=>{
        console.log(props.access_token);
    }, [props]);
    return (
        <div>
            <input id="username_input" onChange={(event)=>{
                setUsername(event.target.value);
            }} />
            <br/>
            <input id="password_input" type="password" onChange={(event)=>{
                setPassword(event.target.value);
            }} />
            <br/>
            <Button
                variant="contained" color="primary" className={classes.button}
                onClick={loginFunc}>Login</Button>
        </div>
    );
}

// Map Redux state to component props
function mapStateToProps(state) {
    return state.loginToken;
}

// Map Redux actions to component props
const mapDispatchToProps = {
    updateToken,
    clearToken,
}

// Connected Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
// export default Login;
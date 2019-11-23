import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { axiosInstance } from './Global';

import { connect } from 'react-redux';
import { updateToken } from './redux/actions';

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
        const url = "/token/";
            axiosInstance.post(url, {
                username: username,
                password: password
            }).then((response) => {
                props.updateToken(response.data.refresh);
                console.log("refresh");
                console.log(response.data.refresh);
                console.log("access");
                console.log(response.data.access);

                axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + response.data.access;
                console.log('history');
                console.log(history.location);
                if (history.location.state === undefined || history.location.state.from === undefined || history.location.state.from === "") {
                    history.replace("/dashboard");
                } else {
                    history.replace({
                        pathname: history.location.state.from, 
                        state: {}});
                }
            }).catch((e) => {
                console.log(e);
            });
    };
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
}

// Connected Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
// export default Login;
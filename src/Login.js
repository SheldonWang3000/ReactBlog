import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { axiosInstance } from './Global';

import { connect } from 'react-redux';
import { updateToken } from './redux/actions';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: theme.spacing(3, 0),
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
                axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + response.data.access;
                if (history.location.state === undefined || 
                    history.location.state.from === undefined || 
                    history.location.state.from.length === 0) {
                    history.replace("/dashboard");
                } else {
                    history.replace({
                        pathname: history.location.state.from[0], 
                        state: {
                            ...history.location.state, 
                            from: history.location.state.from.slice(1)
                        }});
                }
            }).catch((e) => {
                console.log(e);
            });
    };
    return (
        <Container component='main' maxWidth='xs' >
            <div className={classes.main}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
            </div>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Username"
                id="username_input" 
                onChange={(event) => {
                    setUsername(event.target.value);
                }}/>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                id="password_input" 
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
            />
            <Button
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={loginFunc}
                fullWidth
                >
                Log in 
            </Button>
        </Container>
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
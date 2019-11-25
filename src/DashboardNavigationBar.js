import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import { connect } from 'react-redux';
import { clearToken } from './redux/actions';

import { axiosInstance, verifyLogin } from './Global';

const useStyles = makeStyles(theme => ({
    header: {
        paddingBottom: '64px'
    },
    loginMsg: {
        textAlign: 'right',
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function NavigationBar(props) {
    console.log('NavigationBar');
    const classes = useStyles();
    const history = useHistory();
    const [buttonAttri, setButtonAttri] = useState({ msg: "login", func: () => { } });
    useEffect(() => {
        const loginButton = {
            msg: "Login",
            func: () => {
                history.push({
                    pathname:'/login/', 
                    state: { from: history.location.pathname }
                });
            }
        }

        const signoutButton = {
            msg: "Sign Out",
            func: () => {
                props.clearToken();
                axiosInstance.defaults.headers.common['Authorization'] = "";
                setButtonAttri(loginButton);
                history.push('/');
            }
        }
        verifyLogin().then(() => {
            setButtonAttri(signoutButton);
        }).catch(() => {
            setButtonAttri(loginButton);
        });
    }, [history, props]);
    return (
        <div className={classes.header}>
            <AppBar position='fixed' >
                <Toolbar>
                    <Typography variant="h5"className={classes.title}>
                        The Dashboard of Sheldon's Blog
                    </Typography>
                    <Typography className={classes.loginMsg}>
                        Hi, Sheldon
                    </Typography>
                    <Button color="inherit" onClick={buttonAttri.func}>
                        {buttonAttri.msg}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

// Map Redux actions to component props
const mapDispatchToProps = {
    clearToken,
}

// Connected Component
export default connect(null, mapDispatchToProps)(NavigationBar);

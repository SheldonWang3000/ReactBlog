import React, { useState, useEffect } from 'react';
import { Button, Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { defaultUser } from './GlobalVariable';
import { connect } from 'react-redux';
import { commentAccountSave, commentAccountClear } from './redux/actions';

const gapi = window.gapi;

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(1),
        width: 'auto'
    },
    btnPNG: {
        width: '134px',
        height: '32px'
    },
    button: {
        padding: '0px',
    }
}));


function SocialLogin(props) {
    console.log("SocialLogin");
    const classes = useStyles();

    const buttonFunc = () => {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signOut();
        } else {
            gapi.auth2.getAuthInstance().signIn();
        }
    }

    const [user, setUser] = useState(defaultUser);

    const [buttonExpression, setButtonExpression] = useState(<div></div>);

    useEffect(() => {

        const signInButton = (
            <Button
                className={classes.button}
                onClick={buttonFunc}>
                <img src="https://www.sheldonweb.com/media/btn_google_signin_dark_normal_web@2x.png"
                    className={classes.btnPNG} alt="Sign in with Google" />
            </Button>
        );

        const signOutButton = (
            <Button
                color="secondary"
                variant="contained"
                onClick={buttonFunc}
            >
                Sign Out
        </Button>
        );

        const signIn = () => {
            gapi.client.people.people.get({
                'resourceName': 'people/me',
                'personFields': 'names,photos'
            }).then(function (resp) {
                var name = resp.result.names[0].givenName;
                var avatarUrl = resp.result.photos[0].url;
                setUser({ "buttonMsg": "SignOut", "username": name, "avatarUrl": avatarUrl });
                setButtonExpression(signOutButton)
                props.commentAccountSave(name, avatarUrl);
            });
        }

        const signOut = () => {
            setUser(defaultUser);
            setButtonExpression(signInButton);
            props.commentAccountClear();
        }

        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: '***REMOVED***',
                discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
                clientId: '***REMOVED***',
                scope: 'profile'
            }).then(function () {
                if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    signIn();
                } else {
                    signOut();
                }
                gapi.auth2.getAuthInstance().isSignedIn.listen((val) => {
                    if (val) {
                        signIn();
                    } else {
                        signOut();
                    }
                });
            });
        });
    }, [props, classes]);

    return (
        <Grid container direction="column" alignItems="center" spacing={1} className={classes.container}>
            <Grid item>
                <Avatar src={user['avatarUrl'] } variant="square"/>
            </Grid>
            <Grid item>
                {user['username']}
            </Grid>
            <Grid item>
                {buttonExpression}
            </Grid>
        </Grid>
    );
}

// Map Redux actions to component props
const mapDispatchToProps = {
    commentAccountSave,
    commentAccountClear,
}

// Connected Component
export default connect(
    null,
    mapDispatchToProps
)(SocialLogin);
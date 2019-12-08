import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Avatar } from '@material-ui/core';

const gapi = window.gapi;
const defaultUser = {
    "buttonMsg": "google",
    "username": "User",
    "avatarUrl": "https://www.sheldonweb.com/media/default_avatar.png"
};


function SocialLogin() {
    console.log("SocialLogin");
    const [user, setUser] = useState(defaultUser);
    
    const makeRequest = () => {
        gapi.client.people.people.get({
            'resourceName': 'people/me',
            'personFields': 'names,photos'
        }).then(function (resp) {
            var name = resp.result.names[0].givenName;
            var avatarUrl = resp.result.photos[0].url;
            setUser({ "buttonMsg": "SignOut", "username": name, "avatarUrl": avatarUrl });
        });
    }

    useEffect(()=>{
        const signIn = () => {
            makeRequest();
        }

        const signOut = () => {
            setUser(defaultUser);
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
    }, []);

    return (
        <div>
            <ButtonGroup>
                <Button onClick={() => {
                    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                        gapi.auth2.getAuthInstance().signOut();
                    } else {
                        gapi.auth2.getAuthInstance().signIn();
                    }
                }}>{user['buttonMsg']}
                </Button>
            </ButtonGroup>
            <br/>
            {user['username']}
            <br/>
            <Avatar src={user['avatarUrl']}/>
        </div>
    );
}

export default SocialLogin;
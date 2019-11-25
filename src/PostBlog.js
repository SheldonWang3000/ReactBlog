import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from "react-router-dom";

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import { axiosInstance } from './Global';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
    },
    textField: {
    },
    button: {
        margin: theme.spacing(1),
    },
}));


function PostBlog(props) {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("You have created blog successfully!")
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [buttonMsg, setButtonMsg] = useState("post");


    const handleAlertClose = () => {
        setAlertOpen(false);
        history.push('/');
    }

    useEffect(()=>{
        if (id !== undefined) {
            const url = `/posts/${id}`;
            setButtonMsg("update");
            axiosInstance.get(url)
                .then((response) => {
                    if (response.status === 200) {
                        return response.data;
                    }
                })
                .then((data) => {
                    setTitle(data.title);
                    setContent(data.content);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 404) {
                        history.push('/404');
                    }
                });
        }
        
    }, [id, history]);

    const postFunc = () => {
        if (buttonMsg === "post") {
            const url = "/posts/";
            axiosInstance.post(url, {
                title: title,
                content: content,
                user: 1
            }
            ).then((response) => {
                setAlertMessage("You have created blog successfully!");
                setAlertOpen(true);
            }).catch((e) => {
                console.log(e);
                setAlertMessage("You have failed to create the blog");
                setAlertOpen(true);
            });
        }
        if (buttonMsg === "update") {
            const url = `/posts/${id}/`;
            axiosInstance.put(url, {
                title: title,
                content: content
            }).then((response)=>{
                setAlertMessage("You have updated blog successfully!");
                setAlertOpen(true);
            }).catch((e)=>{
                console.log(e);
                setAlertMessage("You have failed to update the blog");
                setAlertOpen(true)
            });
        }
    }

    return (
        <div className={classes.root}>
            <TextField
                id="blog-title"
                label="Blog Title"
                fullWidth
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
            <TextField
                id="blog-content"
                label="Blog Content"
                multiline
                fullWidth
                rows="25"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={content}
                onChange={(event) => {
                    setContent(event.target.value);
                }}
            />
            <Button 
                variant="contained" color="primary" className={classes.button}
                onClick={postFunc} >
                {buttonMsg} 
            </Button>

            <Dialog
                open={alertOpen}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alertMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
// Map Redux state to component props
function mapStateToProps(state) {
    return state.loginToken;
}

// Connected Component
export default connect(mapStateToProps)(PostBlog);
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import SocialLogin from './SocialLogin';
import { axiosInstance } from './Global';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0px',
        margin: '0px',
        width: '100%'
    }, 
    textField: {
        flex: '1',
    },
    socialLogin: {
        float: 'left',
    }
}));

function CommentInput(props) {
    console.log("CommentInput");
    const classes = useStyles();
    const [commentContent, setCommentContent] = useState("");
    return (
        <Grid container direction="row" className={classes.container}>
            <Grid item className={classes.socialLogin}>
                <SocialLogin />
            </Grid>
            <Grid item className={classes.textField}>
                <Grid container direction="column" spacing={1} >
                    <Grid item>
                        <TextField
                            label="Comment"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows="5" 
                            value={commentContent}
                            onChange={(event)=>{
                                setCommentContent(event.target.value);
                            }}
                            />

                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={(event)=>{
                                axiosInstance.post("/comments/create/", {
                                    blog: props.blog,
                                    content: commentContent,
                                    parent: props.id === undefined ? null : props.id,
                                    username: props.username,
                                    avatar: props.avatarUrl
                                }).then((response)=>{
                                    if (response.status === 201) {
                                        //callback toggle
                                        setCommentContent("");
                                        props.refreshCallback(Date.now());
                                    }
                                }).then((data)=>{

                                }).catch((error)=>{
                                    console.log(error);
                                });
                            }}
                            >
                            Add Comment
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

// Map Redux state to component props
function mapStateToProps(state) {
    return state.commentAccount;
  }
  
// Connected Component
export default connect(
    mapStateToProps,
    null
)(CommentInput);


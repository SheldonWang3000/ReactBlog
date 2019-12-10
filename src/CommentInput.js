import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import SocialLogin from './SocialLogin';
import { axiosInstance } from './Global';

function CommentInput(props) {
    console.log("CommentInput");
    const [commentContent, setCommentContent] = useState("");
    return (
        <Grid container direction="row">
            <Grid item xs={1}>
                <SocialLogin />
            </Grid>
            <Grid item xs={11}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>

                        <TextField
                            label="Comment"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows="5" 
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
                                console.log(props.id);
                                axiosInstance.post("/comments/create/", {
                                    blog: props.blog,
                                    content: commentContent,
                                    parent: props.id === undefined ? null : props.id,
                                    username: props.username,
                                    avatar: props.avatarUrl
                                }).then((response)=>{
                                    if (response.status === 200) {
                                        //TODO 
                                        //callback toggle
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


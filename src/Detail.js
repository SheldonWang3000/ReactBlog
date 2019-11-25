import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Hidden, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { axiosInstance, verifyLogin } from "./Global";
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        // margin: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
    button: {
        margin: theme.spacing(1, 1, 1, 0),
    },
}));

function Detail(props) {
    const { id } = useParams(0);
    const history = useHistory();
    const [deleteId, setDeleteId] = useState(-1);
    const [attri, setAttri] = useState({
        publishDate: "",
        title: "",
        content: ""
    });
    const [showButtons, setShowButtons] = useState(false);
    useEffect(()=>{
        console.log("Detail: verity");
        verifyLogin().then(() => {
            setShowButtons(true);
        }).catch(() => {
            setShowButtons(false);
        });
    },[]);
    
    const classes = useStyles();

    useEffect(()=>{
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
    }, [attri]);

    useEffect(() => {
        if (deleteId !== -1) {
            axiosInstance.delete(`/posts/${deleteId}/`)
            .then((response) => {
                if (response.status === 204) {
                    history.push('/');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [deleteId, history]);

    useEffect(() => {
        const url = `/posts/${id}/`;
        axiosInstance.get(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .then((data) => {
                setAttri({
                    publishDate: data.publish_date,
                    title: data.title,
                    content: data.content
                });
           })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 404) {
                    history.push('/404');
                }
            });
    },[id, history]);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h3" component="h3">
                    {attri.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Publish Date:  {attri.publishDate}
                </Typography>
                <br />
                <Typography component="div">
                    <ReactMarkdown source={attri.content} />
                </Typography>
            </Paper>
            <Hidden lgDown={!showButtons}>
                <Button
                    variant="contained" color="secondary" className={classes.button}
                    onClick={() => {
                        setDeleteId(id);
                    }} >
                    Delete
                </Button>
                <Button
                    variant="contained" color="primary" className={classes.button}
                    onClick={() => {
                        history.push(`/post/${id}/`);
                    }} >
                    Update
                </Button>
            </Hidden>
        </div>
    );
}
// Map Redux state to component props
function mapStateToProps(state) {
    return state.loginToken;
}

// Connected Component
export default connect(mapStateToProps)(Detail);
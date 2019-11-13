import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(10)
    },
  }));

function Detail() {
    const [postId, setPostId] = useState(1);
    const [title, setTitle] = useState("Title");
    const [content, setContent] = useState("Content");
    const classes = useStyles();
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/posts/1/?format=json')
            .then((response) => {
                console.log(response)
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
            });
    },[]);
    return (
        <Paper className={classes.root}>
            <Typography variant="h3" component="h3">
                {title}     
            </Typography>
            <Typography component="p">
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
            </Typography>
        </Paper>
    );
}

export default Detail
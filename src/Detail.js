import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {globalVariable} from "./GlobalVariable"

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(10)
    },
  }));

function Detail() {
    const { id } = useParams(0);

    const [publishDate, setPublishDate] = useState("")
    const [title, setTitle] = useState("Title");
    const [content, setContent] = useState("Content");

    const classes = useStyles();

    useEffect(() => {
        const url = globalVariable.host + "/api/v1/posts/" + id;
        axios.get(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .then((data) => {
                setTitle(data.title);
                setContent(data.content);
                setPublishDate(data.publish_date);
            })
            .catch((error) => {
                console.log(error);
            });
    },[id]);
    return (
        <Paper className={classes.root}>
            <Typography variant="h3" component="h3">
                {title}     
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Publish Date:  {publishDate}
            </Typography>
            <br/>
            <Typography component="p">
                {content}
            </Typography>
        </Paper>
    );
}

export default Detail
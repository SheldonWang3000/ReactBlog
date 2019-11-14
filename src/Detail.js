import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { globalVariable } from "./GlobalVariable";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(10, 10, 1, 10)
    },
    button: {
        margin: theme.spacing(1, 10),
    },
    input: {
        display: 'none',
    },
}));

function Detail(props) {
    const { id } = useParams(0);
    const history = useHistory();
    const [deleteId, setDeleteId] = useState(-1);
    const [attri, setAttri] = useState({
        publishDate: "",
        title: "Title",
        content: "Content"
    });

    const classes = useStyles();
    useEffect(() => {
        if (deleteId !== -1) {
            axios.delete(globalVariable.host + "/api/v1/posts/" + deleteId)
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
        const url = globalVariable.host + "/api/v1/posts/" + id;
        axios.get(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                if (response.status === 404) {
                    return {};
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
            });
    },[id]);
    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h3" component="h3">
                    {attri.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Publish Date:  {attri.publishDate}
                </Typography>
                <br />
                <Typography component="p">
                    {attri.content}
                </Typography>
            </Paper>
            <Button 
                variant="contained" color="secondary" className={classes.button}
                onClick={() => {
                    setDeleteId(id);
                }} >
                Delete
            </Button>
        </div>
    );
}

export default Detail;
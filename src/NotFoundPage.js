import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            background: theme.palette.grey[100]
        }
    },
    root: {
        borderRadius: theme.shape.borderRadius * 2,
        padding: theme.spacing(5),
        marginTop: theme.spacing(20),
    },
    content: {
        color: theme.palette.text.secondary,
    },
    title: {
        fontWeight: "bold",
        color: theme.palette.text.primary,
    }
  }));

function NotFoundPage(props) {
    const classes = useStyles();
    return (
        <Container component="div" maxWidth="xs" className={classes.root}>
            <Typography bold="true" variant="h3" align="left" className={classes.title}>404</Typography>
            <Typography variant="h6" align="left" className={classes.content}>Sorry, we can’t find the page you were looking for.</Typography>
            <Link to='/'>Go back to home page.</Link>
        </Container>
    );
}

export default NotFoundPage;
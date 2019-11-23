import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        // marginTop: theme.spacing(10),
    },
}));

function Dashboard(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.content}>
                <Link to='/'>Blog List</Link>
                <br />
                <Link to='/post'>Create Blog</Link>
            </div>
        </div>
    );
}

export default Dashboard;
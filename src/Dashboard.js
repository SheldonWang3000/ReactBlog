import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        // marginTop: theme.spacing(10),
    },
}));

function Dashboard(props) {
    const classes = useStyles();
    const location = useLocation();
    return (
        <div>
            <div className={classes.content}>
                <Link to='/'>Blog List</Link>
                <br />
                <Link to={{
                    pathname: '/post',
                    state: {
                        from: location.pathname
                    }
                }}>
                    Create Blog</Link>
            </div>
        </div>
    );
}

export default Dashboard;
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

function NotFoundPage(props) {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div>404 Page not found<br/>
            We are sorry but the page you are looking for does not exist.
            <IconButton className={classes.button} onClick={() => { history.push('/'); }}>
                <HomeIcon />
            </IconButton>
        </div>
    );
}

export default NotFoundPage;
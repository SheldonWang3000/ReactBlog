import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { verifyLogin} from './Global';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

function LoginVerifyProcess(props) {
    const classes = useStyles();
    const history = useHistory();
    const [content, setContent] = useState(<CircularProgress/>);
    useEffect(() => {
        verifyLogin().then(()=>{
            setContent(props.children);
        }).catch(()=>{
            console.log("LoginVerifyProcess: Unauthorized");
            if (props.to === undefined) {
                history.push({pathname: '/login', state: {'from': history.location.pathname}}); 
            }
            else {
                history.push({pathname: props.to, state: {'from': history.location.pathname}}); 
            }
        });
    }, [history, props]);

    return (
        <div className={classes.root}>
            {content}
        </div>
    );
}

export default LoginVerifyProcess;
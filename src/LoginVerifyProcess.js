import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { verifyLogin} from './Global';
import { useHistory } from 'react-router-dom';

function LoginVerifyProcess(props) {
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
        <div>
            {content}
        </div>
    );
}

export default LoginVerifyProcess;
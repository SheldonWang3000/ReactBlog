import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { verifyLogin} from './Global';
import { useHistory } from 'react-router-dom';

function LoginVerifyProcess(props) {
    const history = useHistory();
    console.log(history.location.pathname);
    const [content, setContent] = useState(<CircularProgress/>);
    useEffect(() => {
        verifyLogin().then(()=>{
            setContent(props.children);
        }).catch(()=>{
            console.log("LoginVerifyProcess: Unauthorized");
            let fromList = [];
            if (history.location !== undefined && history.location.state !== undefined && history.location.state.from !== undefined) {
                fromList = history.location.state.from;
            }
            if (props.to === undefined) {
                history.push({ pathname: '/login', state: { from: [history.location.pathname, ...fromList] } }); 
            }
            else {
                history.push({ pathname: props.to, state: { from: [history.location.pathname, ...fromList] } }); 
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
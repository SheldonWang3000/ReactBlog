import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";

function Test(props) {
    const md = "```javascript\n var a = 1;\n```";
    useEffect(()=>{
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
    }, []);
    return (
        <ReactMarkdown source={md}/>
    );
}
export default Test;

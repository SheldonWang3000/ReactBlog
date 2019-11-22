import React from 'react';

export function Parent(props) {
    let content;
    if (false) {
        content = props.children;
    } else {
        content = (<div>Parent</div>);
    }
    return (
        <div>
            {content}
        </div>
    );
}
export function Test(props) {
    console.log(props.children);
    return (
        <div>TEST</div>
    );
}

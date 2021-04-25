import React from 'react';

const Route = (props) => {
    let text = props.directory;
    return (
        <div classname='route-text'>
            {text}
        </div>
    );
};

export default Route;
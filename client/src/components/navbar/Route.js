import React from 'react';
import RouteEntry from './RouteEntry'

const Route = (props) => {
    let directory = props.directory;
    

    return (
        <div className='directory-inner'>
            {directory.map((entry, index) => (
                <RouteEntry region={entry} isLastElement={index}/>
            ))
        }
        </div>
    );
};

export default Route;
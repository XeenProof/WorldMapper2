import React from 'react';
import RouteEntry from './RouteEntry'

const Route = (props) => {
    let directory = props.directory;
    let display = [];

    for(let i = 0; i < directory.length; i++){
        display.push({_id: directory[i]._id, name: directory[i].name});
        if (i == directory.length-1){
            break;
        }
        display.push({_id: '', name: '>'});
    }

    return (
        <div className='directory-inner'>
            {display.map((entry) => (
                <RouteEntry region={entry} redirect={props.redirect}/>
            ))
        }
        </div>
    );
};

export default Route;
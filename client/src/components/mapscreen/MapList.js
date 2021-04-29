import React 	from 'react';
import MapEntry from './MapEntry';

const MapList = (props) => {
    let roots = props.roots;
    return (
        roots? <div className='size container-primary'>{
            roots.map(entry => (
                <MapEntry map={entry} setShowDelete={props.setShowDelete} setShowRename={props.setShowRename}/>
            ))
        }   
        </div>: <div className='size'/>
    );
}

export default MapList;
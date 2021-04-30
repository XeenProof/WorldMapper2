import React 	from 'react';
import MapEntry from './MapEntry';

const MapList = (props) => {


    let roots = props.roots;
    let rootOrder = props.rootOrder;
    return (
        roots? <div className='size container-primary'>{
            rootOrder.map(id => (
                <MapEntry map={roots.find(x => x._id == id)} 
                setShowDelete={props.setShowDelete} setShowRename={props.setShowRename}
                selectMap={props.selectMap} setActiveRegion={props.setActiveRegion}
                />
            ))
        }   
        </div>: <div className='size'/>
    );
}

export default MapList;
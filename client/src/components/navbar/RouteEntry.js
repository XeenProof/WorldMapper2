import React from 'react';

const RouteEntry = (props) => {
    let region = props.region;
    let isLastElement = props.isLastElement;

    return (
            <div className='directory-margin'>{region.name}</div>
    )
}

export default RouteEntry;
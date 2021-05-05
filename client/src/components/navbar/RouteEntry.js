import React from 'react';

const RouteEntry = (props) => {
    let region = props.region;
    let clickable = (region._id != '');
    let displayStyle = (region._id != '')? 'directory-margin route-clickable': 'directory-margin route-clickable-disable';
    let _id = region._id;

    const handleClick = () => {
        props.redirect(`/spreadsheet/${_id}`);
    }

    return (
            <div className={displayStyle} onClick={(clickable)? handleClick: () => {}}>{region.name}</div>
    )
}

export default RouteEntry;
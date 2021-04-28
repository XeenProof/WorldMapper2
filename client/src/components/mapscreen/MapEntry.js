import React 	from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const MapEntry = (props) => {
    let map = props.map;

    const handleDelete = () => {
        props.setShowDelete(map._id);
    }

    return (
        <WRow className='map-entry'>
            <WCol size='11'>
            <div className='map-text'>{map.name}</div>
            </WCol>
            <WCol size='1'>
                <WButton className='map-entry-button'>
                <i className='map-entry-button material-icons' onClick={handleDelete}>delete</i>
                </WButton>
            </WCol>
        </WRow>
    )
}

export default MapEntry;
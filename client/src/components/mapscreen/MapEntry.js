import React 	from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const MapEntry = (props) => {
    let map = props.map;

    const handleDelete = () => {
        props.setShowDelete(map._id);
    }

    const handleRename = () => {
        props.setShowRename(map._id);
    }

    const spreadsheetRedirect = () => {
        props.selectMap(map._id);  
    }

    return (
        <WRow className='map-entry'>
            <WCol size='9'>
                <div className='map-text' onClick={spreadsheetRedirect}>{map.name}</div>
            </WCol>
            <WCol size='2'>
                <div className='button-group'>
                    <WButton className='map-entry-button'>
                        <i className='map-entry-button material-icons' onClick={handleRename}>edit</i>
                    </WButton>
                    <WButton className='map-entry-button'>
                        <i className='map-entry-button material-icons' onClick={handleDelete}>delete</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
    )
}

export default MapEntry;
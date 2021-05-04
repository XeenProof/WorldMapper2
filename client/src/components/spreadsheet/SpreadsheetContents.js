import React from 'react'
import SpreadsheetEntry from './SpreadsheetEntry';

const SpreadsheetContents = (props) => {
    let regionIds = props.children;
    let allRegions = props.allRegions;

    return (
        regionIds ? <div className='table-entries container-primary ss-height-lock'>
            {
                regionIds.map(entry => (
                    <SpreadsheetEntry
                        region={allRegions.find(x => x._id == entry)}
                        setShowDelete={props.setShowDelete}
                        redirect={props.redirect}
                        updateRegionField={props.updateRegionField}
                    />
                ))
            }
            </div>
            : <div className='container-primary' />
    );
}

export default SpreadsheetContents;
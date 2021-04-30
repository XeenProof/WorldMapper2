import React from 'react'
import SpreadsheetEntry from './SpreadsheetEntry';

const SpreadsheetContents = (props) => {
    let regionIds = props.children;
    let allRegions = props.allRegions;

    return (
        regionIds ? <div className='table-entries container-primary test'>
            {
                regionIds.map(entry => (
                    <SpreadsheetEntry
                        region={allRegions.find(x => x._id == entry)}
                        deleteSubregion={props.deleteSubregion}
                        redirect={props.redirect}
                    />
                ))
            }

            </div>
            : <div className='container-primary test' />
    );
}

export default SpreadsheetContents;
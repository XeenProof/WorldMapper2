import React            from 'react';
import SpreadsheetTableHeader from './SpreadsheetTableHeader'
import SpreadsheetContents from './SpreadsheetContents'

const SpreadsheetTable = (props) => {
    return(<div className=''>
        <SpreadsheetTableHeader sortRegion={props.sortRegion}/>
        <SpreadsheetContents children={props.children} allRegions={props.allRegions}
        setShowDelete={props.setShowDelete} redirect={props.redirect}
        updateRegionField={props.updateRegionField}
        editing={props.editing} setEditField={props.setEditField}/>
        
    </div>)
}

export default SpreadsheetTable;
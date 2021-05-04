import React            from 'react';
import SpreadsheetTableHeader from './SpreadsheetTableHeader'
import SpreadsheetContents from './SpreadsheetContents'

const SpreadsheetTable = (props) => {
    return(<div className=''>
        <SpreadsheetTableHeader/>
        <SpreadsheetContents children={props.children} allRegions={props.allRegions}
        setShowDelete={props.setShowDelete} redirect={props.redirect}
        updateRegionField={props.updateRegionField}/>
        
    </div>)
}

export default SpreadsheetTable;
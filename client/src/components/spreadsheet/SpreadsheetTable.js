import React            from 'react';
import SpreadsheetTableHeader from './SpreadsheetTableHeader'
import SpreadsheetContents from './SpreadsheetContents'

const SpreadsheetTable = (props) => {
    return(<div className=''>
        <SpreadsheetTableHeader/>
        <SpreadsheetContents children={props.children} allRegions={props.allRegions}
        deleteSubregion={props.deleteSubregion}/>
        
    </div>)
}

export default SpreadsheetTable;
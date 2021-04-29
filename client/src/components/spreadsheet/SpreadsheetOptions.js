import React 	from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const SpreadsheetOptions = (props) => {
    const wip = () => {};

    const handleAdd = () => {
        console.log("added");
        props.addSubregion();
    };

    return(
        <div className='button-set'>
            <WButton className='spreadsheet-entry-button'>
                <i className='spreadsheet-entry-button2 material-icons' onClick={handleAdd}>add</i>
            </WButton>
            <WButton className='spreadsheet-entry-button'>
                <i className='spreadsheet-entry-button material-icons' onClick={wip}>undo</i>
            </WButton>
            <WButton className='spreadsheet-entry-button'>
                <i className='spreadsheet-entry-button material-icons' onClick={wip}>redo</i>
            </WButton>
        </div>
    );
}

export default SpreadsheetOptions;
import React 	from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const SpreadsheetOptions = (props) => {
    const wip = () => {};

    let region = props.region;
    let user = props.user;

    const handleAdd = () => {
        console.log("added");
        props.addSubregion();
    };

    const handleBack = () => {
        console.log("back");
        if(!region){
            return;
        }
        let parent = region.parent;
        let id = user._id;
        if (parent == 'root'){
            props.redirect(`/maps/${id}`);
        }
        else{
            props.redirect(`/spreadsheet/${parent}`);
        }
    };

    return(
        <div className='button-set'>
            <WButton className='spreadsheet-entry-button'>
                <i className='spreadsheet-entry-button2 material-icons' onClick={handleAdd}>add</i>
            </WButton>
            <WButton className='spreadsheet-entry-button'>
                <i className='spreadsheet-entry-button material-icons' onClick={handleBack}>close</i>
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
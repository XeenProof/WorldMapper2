import React 	from 'react';
import { WButton } from 'wt-frontend';

const SpreadsheetOptions = (props) => {

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

    let undoClass = props.canUndo? 'spreadsheet-entry-button': 'spreadsheet-entry-button-disabled';
    let redoClass = props.canRedo? 'spreadsheet-entry-button': 'spreadsheet-entry-button-disabled';

    return(
        <div className='button-set'>
            <WButton className='spreadsheet-entry-button' onClick={handleAdd}>
                <i className='spreadsheet-entry-button2 material-icons'>add</i>
            </WButton>
            <WButton className='spreadsheet-entry-button' onClick={handleBack}>
                <i className='material-icons'>arrow_back</i>
            </WButton>
            <WButton className={undoClass} onClick={props.undo}>
                <i className='material-icons'>undo</i>
            </WButton>
            <WButton className={redoClass} onClick={props.redo}>
                <i className='material-icons'>redo</i>
            </WButton>
        </div>
    );
}

export default SpreadsheetOptions;
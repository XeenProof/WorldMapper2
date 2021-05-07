import React 	from 'react';
import { WButton } from 'wt-frontend';

const RegionOptions = (props) => {

    let leftId = props.left;
    let rightId = props.right;
    
    const handleLeft = () => {
        if(leftId != ''){
            props.redirect(`/region/${leftId}`);
        }
    }

    const handleRight = () => {
        if(rightId != ''){
            props.redirect(`/region/${rightId}`);
        }
    }

    let leftClass = (leftId != '')?'viewer-entry-button': 'viewer-entry-button-disabled';
    let rightClass = (rightId != '')?'viewer-entry-button': 'viewer-entry-button-disabled';
    let undoClass = (props.canUndo)?'viewer-entry-button': 'viewer-entry-button-disabled';
    let redoClass = (props.canRedo)?'viewer-entry-button': 'viewer-entry-button-disabled';

    return(
        <div className='button-set'>
            <WButton className={undoClass} onClick={props.undo}>
                <i className='material-icons'>undo</i>
            </WButton>
            <WButton className={redoClass} onClick={props.redo}>
                <i className='material-icons'>redo</i>
            </WButton>
            <WButton className={leftClass} onClick={handleLeft}>
                <i className='material-icons'>arrow_back</i>
            </WButton>
            <WButton className={rightClass} onClick={handleRight}>
                <i className='material-icons'>arrow_forward</i>
            </WButton>
        </div>
    );
}

export default RegionOptions;
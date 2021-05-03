import React 	from 'react';
import { WButton } from 'wt-frontend';

const RegionOptions = (props) => {
    const wip = () => {};

    let region = props.region;
    let leftId = props.left;
    let rightId = props.right;
    // let user = props.user;

    // const handleBack = () => {
    //     console.log("back");
    //     if(!region){
    //         return;
    //     }
    //     let parent = region.parent;
    //     let id = user._id;
    //     if (parent == 'root'){
    //         props.redirect(`/maps/${id}`);
    //     }
    //     else{
    //         props.redirect(`/spreadsheet/${parent}`);
    //     }
    // };
    const handleLeft = () => {
        props.redirect(`/region/${leftId}`);
    }

    const handleRight = () => {
        props.redirect(`/spreadsheet/${rightId}`);
    }

    return(
        <div className='button-set'>
            <WButton className='viewer-entry-button'>
                <i className='viewer-entry-button material-icons' onClick={wip}>undo</i>
            </WButton>
            <WButton className='viewer-entry-button'>
                <i className='viewer-entry-button material-icons' onClick={wip}>redo</i>
            </WButton>
            <WButton className='viewer-entry-button'>
                <i className='viewer-entry-button material-icons' onClick={handleLeft}>arrow_back</i>
            </WButton>
            <WButton className='viewer-entry-button'>
                <i className='viewer-entry-button material-icons' onClick={handleRight}>arrow_forward</i>
            </WButton>
        </div>
    );
}

export default RegionOptions;
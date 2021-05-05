import React from 'react'
import { WButton, WInput } from 'wt-frontend';

const LandmarkEntry = (props) => {
    let landmark = props.landmark;
    let name = landmark.landmark;
    let owner = landmark.owner;
    let editable = landmark.editable;

    let display = (editable)? name: name.concat(' - ', owner);
    let hidden = editable? '':'hidden';

    const handleDelete = () => {
        props.deleteLandmark(name);
    }

    return(
        <div className='flexlr border-test'>
            <WButton className={`button-settings ${hidden}`}>
                <i className='landmark-delete-button material-icons' onClick={handleDelete}>close</i>
            </WButton>
            <div className="landmark-entry-text" onClick={() =>  {}}>
                {display}
            </div>
        </div>
    )
}

export default LandmarkEntry;
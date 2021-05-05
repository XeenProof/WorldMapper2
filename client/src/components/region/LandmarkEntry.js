import React, { useState } from 'react'
import { WButton, WInput } from 'wt-frontend';


const LandmarkEntry = (props) => {
    const [edit, toggleEdit] = useState(false);

    let landmark = props.landmark;
    let name = landmark.landmark;
    let owner = landmark.owner;
    let editable = landmark.editable;

    let display = (editable)? name: name.concat(' - ', owner);
    let hidden = editable? '':'hidden';
    let canEdit = editable? 'landmark-entry-text':'landmark-entry-text-disabled';

    const handleDelete = () => {
        props.deleteLandmark(name);
    }

    const handleUpdate = (e) => {
        props.updateLandmark(name, e.target.value);
        toggleEdit(false);
    }

    return(
        <div className='flexlr'>
            <WButton className={`button-settings ${hidden}`}>
                <i className='landmark-delete-button material-icons' onClick={handleDelete}>close</i>
            </WButton>
            {
            edit? <WInput
            className='table-input' onBlur={handleUpdate}
            autoFocus={true} defaultValue={name} type='text'
            wType="outlined" barAnimation="solid" inputClass="landmark-input-class"
            />
            :<div className={canEdit} onClick={editable? () => {toggleEdit(true)}:() =>  {}}>
                {display}
            </div>}
        </div>
    )
}

export default LandmarkEntry;
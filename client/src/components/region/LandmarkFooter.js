import React, { useState } from 'react';
import { WButton, WInput } from 'wt-frontend';

const LandmarkFooter = (props) => {

    const [value, setValue] = useState('the default');
    let value2 = '';

    const handleValue = (e) => {
        setValue(e.target.value);
    }

    const handleAdd = () => {
        if (value != ''){
            props.addLandmark(value);
        }
    }

    return(
        <div className='flexlr'>
            <WButton className='button-settings' onClick={handleAdd}>
                <i className='landmark-add-button material-icons'>add</i>
            </WButton>
            <WInput
                className='table-input' onBlur={handleValue}
                defaultValue={value2} type='text'
                wType="outlined" barAnimation="solid" inputClass="landmark-input-class"
            />
        </div>
    )
}

export default LandmarkFooter;
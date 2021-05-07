import React, { useState } from 'react';
import { WButton, WInput } from 'wt-frontend';

const LandmarkFooter = (props) => {

    const [value, setValue] = useState('');

    const handleValue = (e) => {
        console.log(e.target.value);
        props.setLandmark(e.target.value);
    }

    const handleAdd = () => {
        if (props.landmark != ''){
            props.addLandmark(props.landmark);
        }
    }

    return(
        <div className='flexlr'>
            <WButton className='button-settings' onClick={handleAdd}>
                <i className='landmark-add-button material-icons'>add</i>
            </WButton>
            <WInput id='addLandmark'
                className='table-input' onChange={handleValue}
                defaultValue={props.landmark} type='text'
                wType="outlined" barAnimation="solid" inputClass="landmark-input-class"
            />
        </div>
    )
}

export default LandmarkFooter;
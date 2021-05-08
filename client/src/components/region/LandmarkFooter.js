import React, { useState, useEffect} from 'react';
import { WButton, WInput } from 'wt-frontend';

const LandmarkFooter = (props) => {
    useEffect(() => {
		document.addEventListener('keydown', shortcuts);
		return () => {document.removeEventListener('keydown', shortcuts)}
	});

    let shortcuts = (event) => {
        if(event.code == 'Enter'){
            handleAdd();
        }
    }

    const [value, setValue] = useState('');

    const handleValue = (e) => {
        setValue(e.target.value);
    }

    const handleAdd = () => {
        props.addLandmark(value);
    }

    return(
        <div className='flexlr'>
            <WButton className='button-settings' onClick={handleAdd}>
                <i className='landmark-add-button material-icons'>add</i>
            </WButton>
            <WInput id='addLandmark'
                className='table-input' onChange={handleValue}
                defaultValue={value} type='text'
                wType="outlined" barAnimation="solid" inputClass="landmark-input-class"
            />
        </div>
    )
}

export default LandmarkFooter;
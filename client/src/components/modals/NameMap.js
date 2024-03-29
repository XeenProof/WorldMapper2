import React, { useState, useEffect } 	from 'react';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const NameMap = (props) => {

	useEffect(() => {
		document.addEventListener('keydown', shortcuts);
		return () => {document.removeEventListener('keydown', shortcuts)}
	});

    const [input, setInput] = useState("");
    const [isVisible, setVisible] = useState(true);

	let shortcuts = (event) => {
        if(event.code == 'Enter'){
            handleCreate();
        }
    }

    const updateInput = (e) => {
		const { value } = e.target;
		setInput(value);
	}

    const handleCreate = async () => {
		props.createRegion(input);
    }

    return (<WModal visible={isVisible} cover={true} className="login-modal">
			<WMHeader className="modal-header" onClose={() => props.setShowName(false)}>
				Name New Map
			</WMHeader>

			{
                    <WMMain className="main-login-modal">
						<WInput 
						className="modal-input" onChange={updateInput} name='Map Name' labelAnimation="up" 
						barAnimation="solid" labelText="Name" wType="outlined" inputType='text' 
						autoFocus={true}/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleCreate} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Create Map
				</WButton>
			</WMFooter>
		</WModal>);
}

export default NameMap;
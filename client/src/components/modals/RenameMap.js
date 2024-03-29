import React, { useState, useEffect } 	from 'react';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const RenameMap = (props) => {

	useEffect(() => {
		document.addEventListener('keydown', shortcuts);
		return () => {document.removeEventListener('keydown', shortcuts)}
	});

    const [input, setInput] = useState((props.activeRegion)? props.activeRegion.name: '');
    const [isVisible, setVisible] = useState(true);

	let shortcuts = (event) => {
        if(event.code == 'Enter'){
            handleRename();
        }
    }

    const updateInput = (e) => {
		const { value } = e.target;
		setInput(value);
	}

    const handleRename = async () => {
        props.renameRegion(input);
        props.setShowRename("");
    }

    return (<WModal visible={isVisible} cover={true} className="login-modal">
			<WMHeader className="modal-header" onClose={() => props.setShowRename(false)}>
				Rename Map
			</WMHeader>

			{
                    <WMMain className="main-login-modal">
						<WInput 
						className="modal-input" onChange={updateInput} name='Map Name' labelAnimation="up" 
						barAnimation="solid" labelText="Name" wType="outlined" inputType='text' value={input}
						autoFocus={true}/>

					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleRename} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Rename Map
				</WButton>
			</WMFooter>
		</WModal>);
}

export default RenameMap;
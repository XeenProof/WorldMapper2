import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';


import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {

    let account = props.user;
	const [input, setInput] = useState({ _id: account._id, email: '', password: '', name: ''});
	const [loading, toggleLoading] = useState(false);
	const [Update] = useMutation(UPDATE);
	const [isVisible, setVisible] = useState(true);
///WIP
	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		const { loading, error, data } = await Update({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.update.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowUpdate(false);
		};
		console.log(props.user);
		console.log("WIP");
		//props.setShowUpdate(false);
	};

	return (
        // Replace div with WModal
		<WModal visible={isVisible} cover={true} className="signup-modal">
			<WMHeader className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account
			</WMHeader>

			{
				loading ? <WMMain />
					: <WMMain>
						<WInput 
							className="modal-input" onChange={updateInput} name="name" labelAnimation="up" 
							barAnimation="solid" labelText="Name" wType="outlined" inputType="text"
						/>

						<WMMain className="modal-spacer">&nbsp;</WMMain>{/*cosider keeping div*/}
						<WInput 
							className="modal-input" onChange={updateInput} name="email" labelAnimation="up" 
							barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text"
						/>
						<WMMain className="modal-spacer">&nbsp;</WMMain>{/*cosider keeping div*/}
						<WInput 
							className="modal-input" onChange={updateInput} name="password" labelAnimation="up" 
							barAnimation="solid" labelText="Password" wType="outlined" inputType="text"
						/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Update
				</WButton>
			</WMFooter>
		</WModal>
	);
}

export default UpdateAccount;

import React, { useState } 	from 'react';
import { LOGIN } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);
	const [isVisible, setVisible] = useState(true);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {

		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			//props.refetchTodos();
			toggleLoading(false);
			props.setShowLogin(false);
			props.redirect(`/maps/${data.login._id}`);
		};
	};


	return (
        // Replace div with WModal

		<WModal visible={isVisible} cover={true} className="login-modal">
			<WMHeader className="modal-header" onClose={() => props.setShowLogin(false)}>
				Login
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className="main-login-modal">
						<WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" barAnimation="solid" labelText="Email Address" wType="outlined" inputType='text' />
						<WMMain className="modal-spacer">&nbsp;</WMMain>
						<WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" labelText="Password" wType="outlined" inputType='password' />
						{
							showErr ? <WMMain className='modal-error'>
								{errorMsg}
							</WMMain>
								: <WMMain className='modal-error'>&nbsp;</WMMain>
						}

					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleLogin} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Login
				</WButton>
			</WMFooter>
		</WModal>
	);
}

export default Login;
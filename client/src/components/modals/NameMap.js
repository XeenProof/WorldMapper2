import React, { useState } 	from 'react';
import * as mutations 			from '../../cache/mutations';
import { useMutation}    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const NameMap = (props) => {
    const [AddRegion] 		= useMutation(mutations.ADD_REGION);

    const [input, setInput] = useState("");
    const [isVisible, setVisible] = useState(true);

    const updateInput = (e) => {
		const { value } = e.target;
		setInput(value);
	}

    // _id: String!
	// id: Int!
	// name: String!
	// capital: String
	// leader: String
	// owner: String!
	// parent: String!
	// children: [String]
	// landmark: [LandmarkInput]

    const handleCreate = async () => {
        console.log(props.user._id);
        console.log(input);
        let map = {
            _id: 'temp',
            name: input,
            capital: 'null',
            leader: 'null',
            owner: props.user._id,
            parent: 'root',
            children: [],
            landmarks: []
        };
        const { data } = await AddRegion({ variables: { region: map}});
        props.setShowName();
    }

    return (<WModal visible={isVisible} cover={true} className="login-modal">
			<WMHeader className="modal-header" onClose={() => props.setShowName(false)}>
				Name New Map
			</WMHeader>

			{
                    <WMMain className="main-login-modal">
						<WInput className="modal-input" onChange={updateInput} name='Map Name' labelAnimation="up" barAnimation="solid" labelText="Name" wType="outlined" inputType='text' />
						{/* {
							showErr ? <WMMain className='modal-error'>
								{errorMsg}
							</WMMain>
								: <WMMain className='modal-error'>&nbsp;</WMMain>
						} */}

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
import React, { useState } from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const Delete = (props) => {
    const [isVisible, setVisible] = useState(true);

    const handleDelete = async () => {
        props.deleteRegion(props.deleteId);
        props.setShowDelete("");
    }

    return (
        // Replace div with WModal

        <WModal visible={isVisible} cover={true} className="delete-modal">
            <WMHeader className="modal-header" onClose={() => props.setShowDelete(false)}>
                Delete Region?
			</WMHeader>

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDelete("")} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </WMMain>

        </WModal>
    );
}

export default Delete;
import React, { useState } 	from 'react';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';
import ParentTable from './ParentTable'

const Parent = (props) => {
	const allRegions = props.allRegions;
	const regionId = props.regionId;
	const region = allRegions.find(x => x._id == regionId);


	const [selectedId, setSelectedId] = useState(region? region.parent: 'root');
    const [isVisible, setVisible] = useState(true);

	console.log(allRegions.find(x => x._id == regionId));

	const parent = allRegions.find(x => x._id == selectedId);

	const createDisplayList = (id) => {
		let regions = allRegions.filter(x => x.parent == id);
		let filtered = regions.filter(x => x._id != regionId);
		let displaySet = filtered.map(x => ({_id: x._id, name:x.name}));
		if(parent){
			displaySet.unshift({_id: parent.parent, name: '...'});
		}
		// ids = ids.filter(x => x != regionId);//remove self
		// let regionSet = ids.map(x => allRegions.find(y => y._id == x));//
		// let displaySet = regionSet.map(x => ({_id: x._id, name: x.name}));
		// displaySet.unshift({_id: parent.parent, name: '...'});
		return displaySet;
	}

	let displayList = createDisplayList(selectedId);
	let disabled = (selectedId == 'root');

    const handleCreate = async () => {
		props.updateRegionParent(selectedId);
		props.setChangeParent();
    }

	const setId = (id) => {
		setSelectedId(id);
	}

    return (<WModal visible={isVisible} cover={true} className="Parent-modal">
			<WMHeader className="Parent-header" onClose={props.setChangeParent}>
				<div className='flexlr'>
				<div>Current Parent:</div>
				<div className='header-selected'>{parent? parent.name: ''}</div>
				</div>
			</WMHeader>
			{
                <WMMain className="Parent-main">
					<ParentTable displayList={displayList} setId={setId}/>
				</WMMain>
			}
			<WMFooter className="Parent-footer">
				{disabled? <WButton className="modal-button modal-button-disabled" onClick={() => {console.log('disabled')}}>
					Cannot Become Root
				</WButton>:
				<WButton className="modal-button" onClick={handleCreate} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Place Region Here
				</WButton>}
			</WMFooter>
		</WModal>);
}

export default Parent;
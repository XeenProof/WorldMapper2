import React, { useState, useEffect } 	from 'react';
import Navbar 							from '../navbar/Navbar';
import { WNavbar, WSidebar, WNavItem, WButton } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { useHistory, useParams } from "react-router-dom";
import { GET_DB_REGIONS } 				from '../../cache/queries';
import NameMap from '../modals/NameMap';
import MapList from './MapList';
import * as mutations 					from '../../cache/mutations';

import Delete 							from '../modals/Delete';
import UpdateAccount from '../modals/UpdateAccount';
import RenameMap from '../modals/RenameMap';


const Mapscreen = (props) => {

    // let { user } = props.user;

    let { id } = useParams();
    
    let allRegions = [];
    let rootRegions = [];
    let rootIdSet = [];
    let rootOrder = [];

    const [AddRegion] 		= useMutation(mutations.ADD_REGION);
    const [DeleteRegion] = useMutation(mutations.DELETE_REGION);
    const [UpdateRegionField] = useMutation(mutations.UPDATE_REGION_FIELD);

    const [activeRegion, setActiveRegion]     = useState("");
    const [nameMap, toggleNameMap]          = useState(false);
    const [showDelete, toggleShowDelete]    = useState(false);
    const [showUpdate, toggleShowUpdate]    = useState(false);
    const [showRename, toggleShowRename]       = useState(false);

    const sortRoots = (ids, info) => {
        let rootIds = ids;
        let source = info;
		for(let i = 0; i < rootIds.length-1; i++){
			for(let j = i + 1; j < rootIds.length; j++){
				let itemi = source.find(e => e._id.toString() === rootIds[i]);
				let itemj = source.find(e => e._id.toString() === rootIds[j]);
				let result = (itemi.last_opened > itemj.last_opened)? -1: (itemi.last_opened == itemj.last_opened)? 0: 1;
				if (result == 1){
					let temp = rootIds[i];
					rootIds[i] = rootIds[j];
					rootIds[j] = temp;
				}
			}
		}
		return rootIds;
    }

    const auth = props.user === null ? false : true;


//-----Temp-Sealed-------------------------------------------------------
    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
        console.log(data);
		allRegions = data.getAllRegions;
        rootRegions = allRegions.filter(x => x.parent == 'root');
        rootIdSet = rootRegions.map(x => x._id);
        rootOrder = sortRoots(rootIdSet, rootRegions);
	}
    
    console.log(props.user);
    console.log(allRegions);
    console.log(rootRegions);
//-----Temp-Sealed-------------------------------------------------------

    //-------Bug-Unstable-Fix--------------------------------------
    // if(!auth){//makes sure that the list is loaded
    //     console.log("reloaded");
    //     refetch();
    // }
    //-------------------------------------------------------------

    // if(id){
    //     refetch();
    // }

    let history = useHistory();
    console.log((history.location.state)? history.location.state.reload: 'no');
    let reload = (history.location.state)? history.location.state.reload: false;
    if(reload){
        refetch();
        history.replace(history.location.pathname, {reload: false});
    }
	const redirect = (route) => {
        props.tps.clearAllTransactions();
		history.push(route, {reload: true});
	};

    const createRegion = async (input) => {
        let map = {
            _id: 'temp',//This is required to be temp if we are generating a completely new _id
            name: input,
            capital: 'null',
            leader: 'null',
            owner: props.user._id,
            parent: 'root',
			last_opened: '',
            children: [],
            landmarks: []
        };
        const { data } = await AddRegion({ variables: { region: map}});
        setShowName();
		refetch();
    }

    const deleteRegion = async () => {
        const { data } = await DeleteRegion({ variables: { _id: activeRegion}});
        setShowDelete("");
		refetch();
    }

    const renameRegion = async (value) => {
        const { data } = await UpdateRegionField({variables: {_id: activeRegion, field: "name", value: value}});
        setShowRename("");
        refetch();
    }

    const setShowName = () => {
        toggleNameMap(!nameMap);
        toggleShowDelete(false);
        toggleShowUpdate(false);
        toggleShowRename(false);
	};

    const setShowDelete = (id) => {
        setActiveRegion(id);
        toggleNameMap(false);
        toggleShowDelete(!showDelete);
        toggleShowUpdate(false);
        toggleShowRename(false);
	};

    const setShowUpdate = () => {
        setActiveRegion("");
        toggleNameMap(false);
        toggleShowDelete(false);
        toggleShowUpdate(!showUpdate);
        toggleShowRename(false);
	};

    const setShowRename = (id) => {
        setActiveRegion(id);
        toggleNameMap(false);
        toggleShowDelete(false);
        toggleShowUpdate(false);
        toggleShowRename(!showRename);
    }
    

    const selectMap = async (_id) => {
        const { data } = await UpdateRegionField({variables: {_id: _id, field: "last_opened", value: new Date().toISOString()}});
        refetch();
        redirect(`/spreadsheet/${_id}`);
    };


    return(
        <WLayout id="fullpage" wLayout="header">
            <WLHeader id='header'>
                <Navbar 
                    fetchUser={props.fetchUser} auth={auth} 
                    setShowCreate={() => {}} setShowLogin={() => {}}
                    refetchTodos={refetch} setActiveList={() => {}}
                    directory={"Mapscreen"} redirect={redirect} user={props.user}
                    setShowUpdate={setShowUpdate}/>
            </WLHeader>
			<WLMain className='mapscreen-alignment'>
                <WLayout wLayout="header">
                    <WLHeader className='mapscreen-text'>
                        <div >Your Maps</div>
                    </WLHeader>
                    <div className='flexlr'>
                        <MapList roots={rootRegions} rootOrder={rootOrder}
                        setShowDelete={setShowDelete} setShowRename={setShowRename}
                        selectMap={selectMap} setActiveRegion={props.setActiveRegion}
                        />

                        {/** perhaps move this to it's own file */}
                        <div className='size'>
                            <div className='image2 background-test2'>PlaceHolder</div>
							<WButton onClick={setShowName} className='create-new-map'>
                                Create New Map
                            </WButton>
                        </div>
                    </div>
                </WLayout>
            </WLMain>
            {
				nameMap && (<NameMap createRegion={createRegion} refetchTodos={refetch} setShowName={setShowName} user={props.user} refetch={refetch}/>)
			}
            {
				showDelete && (<Delete deleteRegion={deleteRegion} setShowDelete={setShowDelete} />)
			}
            {
				showUpdate && (<UpdateAccount user={props.user} setShowUpdate={setShowUpdate} fetchUser={props.fetchUser}/>)
			}
            {
				showRename && (<RenameMap renameRegion={renameRegion} setShowRename={setShowRename} activeRegion={allRegions.find(x => x._id == activeRegion)}/>)
			}
        </WLayout>
    );
}

export default Mapscreen;
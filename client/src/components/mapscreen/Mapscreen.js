import React, { useState, useEffect } 	from 'react';
import Navbar 							from '../navbar/Navbar';
import { WNavbar, WSidebar, WNavItem, WButton } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { useHistory } from "react-router-dom";
import { GET_DB_REGIONS } 				from '../../cache/queries';
import NameMap from '../modals/NameMap';
import MapList from './MapList';
import * as mutations 					from '../../cache/mutations';

import Delete 							from '../modals/Delete';
import UpdateAccount from '../modals/UpdateAccount';
import RenameMap from '../modals/RenameMap';


const Mapscreen = (props) => {

    // let { user } = props.user;
    let reload = false;

    let allRegions = [];
    let rootRegions = [];

    const [DeleteRegion] = useMutation(mutations.DELETE_REGION);
    const [UpdateRegionField] = useMutation(mutations.UPDATE_REGION_FIELD);

    const [activeRegion, setActiveRegion]     = useState("");
    const [nameMap, toggleNameMap]          = useState(false);
    const [showDelete, toggleShowDelete]    = useState(false);
    const [showUpdate, toggleShowUpdate]    = useState(false);
    const [showRename, toggleShowRename]       = useState(false);
    


    const [activeList, setActiveList] 		= useState({}); //remove

    

    
    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
        console.log("data reached");
		allRegions = data.getAllRegions;
        rootRegions = allRegions.filter(x => x.parent == 'root');
	}

    const auth = props.user === null ? false : true;
    if(!auth && !reload){//makes sure that the list is loaded
        refetch();
        reload = true;
    }

    // const refetchRegion = async (refetch) => {
	// 	const { loading, error, data } = await refetch();
	// 	if (data) {
	// 		allRegions = data.getAllRegions;
	// 	}
	// }



    console.log(allRegions);
    console.log(rootRegions);


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


    let history = useHistory();
	const redirect = (route) => {
		history.push(route);
	}


    return(
        <WLayout id="fullpage" wLayout="header">
            <WLHeader id='header'>
                <Navbar 
                    fetchUser={props.fetchUser} auth={auth} 
                    setShowCreate={() => {}} setShowLogin={() => {}}
                    refetchTodos={refetch} setActiveList={setActiveList}
                    directory={"Mapscreen"} redirect={redirect} user={props.user}
                    setShowUpdate={setShowUpdate}/>
            </WLHeader>
			<WLMain className='mapscreen-alignment'>
                <WLayout wLayout="header">
                    <WLHeader className='mapscreen-text'>
                        <div >Your Maps</div>
                    </WLHeader>
                    <div className='flexlr'>
                        <MapList roots={rootRegions} setShowDelete={setShowDelete} setShowRename={setShowRename}/>

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
				nameMap && (<NameMap refetchTodos={refetch} setShowName={setShowName} user={props.user} refetch={refetch}/>)
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
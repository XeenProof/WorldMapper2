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


const Mapscreen = (props) => {

    // let { user } = props.user;

    let allRegions = [];
    let rootRegions = [];

    const [DeleteRegion] = useMutation(mutations.DELETE_REGION);

    const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
    const [nameMap, toggleNameMap]          = useState(false);
    const [showDelete, toggleShowDelete]          = useState(false);
    const [mapToDelete, setMapToDelete]     = useState("");
    const [activeList, setActiveList] 		= useState({});

    const auth = props.user === null ? false : true;




    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		allRegions = data.getAllRegions;
        rootRegions = allRegions.filter(x => x.parent == 'root');
	}

    console.log(allRegions);
    console.log(rootRegions);

    const deleteRegion = async () => {
        const { data } = await DeleteRegion({ variables: { _id: mapToDelete}});
        setShowDelete("");
		refetch();
    }


    const setShowLogin = () => {
		toggleShowCreate(false);
        toggleNameMap(false);
        toggleShowDelete(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
        toggleNameMap(false);
        toggleShowDelete(false);
		toggleShowCreate(!showCreate);
	};

    const setShowName = () => {
		toggleShowLogin(false);
        toggleNameMap(!nameMap);
		toggleShowCreate(false);
        toggleShowDelete(false);
	};

    const setShowDelete = (id) => {
        setMapToDelete(id);
		toggleShowLogin(false);
        toggleNameMap(false);
		toggleShowCreate(false);
        toggleShowDelete(!showDelete);
	};


    let history = useHistory();
	const redirect = (route) => {
		history.push(route);
	}

    return(
        <WLayout id="fullpage" wLayout="header">
            <WLHeader id='header'>
                <Navbar 
                    fetchUser={props.fetchUser} auth={auth} 
                    setShowCreate={setShowCreate} setShowLogin={setShowLogin}
                    refetchTodos={refetch} setActiveList={setActiveList}
                    directory={"Mapscreen"} redirect={redirect} user={props.user}/>
            </WLHeader>
			<WLMain className='mapscreen-alignment'>
                <WLayout wLayout="header">
                    <WLHeader className='mapscreen-text'>
                        <div >Your Maps</div>
                    </WLHeader>
                    <div className='flexlr'>
                        <MapList roots={rootRegions} setShowDelete={setShowDelete}/>
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
				showDelete && (<Delete deleteRegion={deleteRegion} deleteId={mapToDelete} setShowDelete={setShowDelete} />)
			}
        </WLayout>
    );
}

export default Mapscreen;
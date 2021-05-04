import React, { useState, useEffect } 	from 'react';
import Navbar 							from '../navbar/Navbar';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import { useHistory, useParams } from "react-router-dom";
import RegionInfo from './RegionInfo'
import Landmarks from './Landmarks';
import UpdateAccount from '../modals/UpdateAccount';

const Region = (props) => {

    let activeRegion = {};
    let history = useHistory();
    let { id } = useParams();
    let activeId = id;

    const [showUpdate, toggleShowUpdate]    = useState(false);

	const redirect = (route) => {
        props.tps.clearAllTransactions();
		history.push(route, {reload: true});
	}

    const auth = props.user === null ? false : true;
    let reload = false;
    let allRegions = [];
    let parent = {};
    let siblings = [];
    let left = {};
    let right = {};

    const getRegion = (_id) => {
        return allRegions.find(x => x._id == _id);
    }

//-----Temp-Sealed-------------------------------------------------------
    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		allRegions = data.getAllRegions;
        activeRegion = allRegions.find(x => x._id == activeId);
        parent = activeRegion? allRegions.find(x => x._id == activeRegion.parent): {};
        siblings = parent? parent.children: [];
        let index = (siblings)? siblings.indexOf(activeId):0;
        if(siblings){
            left = (index-1 > 0)? siblings[index-1]: '';
            right = (index+1 < siblings.length)? siblings[index+1]: '';
            console.log(left);
            console.log(right);
        }
	}
    if(!auth && !reload){//makes sure that the list is loaded
        refetch();
        reload = true;
    }
//-----Temp-Sealed-------------------------------------------------------
	console.log(activeRegion);

	const createDirectory = () => {
        if (!activeRegion){return ""}
        let route = [];
        let currentId = activeRegion.parent;
        let region;
        while (currentId != 'root'){
            region = allRegions.find(x => x._id == currentId);
            if(!region){break;}
            route.unshift(region.name);
            currentId = region.parent;
        }
        return route.join(' > ');
    }

    let directory = createDirectory();

    const setShowUpdate = () => {
        toggleShowUpdate(!showUpdate);
	};

    return(
        <WLayout id="fullpage" wLayout="header">
            <WLHeader id='header'>
                <Navbar 
                    fetchUser={props.fetchUser} auth={auth} 
                    setShowCreate={() => {}} setShowLogin={() => {}}
                    refetchTodos={refetch} setActiveList={() => {}}
                    directory={directory} redirect={redirect} user={props.user}
                    setShowUpdate={setShowUpdate}/>
            </WLHeader>
			<WLMain>
				<div className='region-container flexlr'>
					<RegionInfo region={activeRegion} user={props.user}
					redirect={redirect} allRegions={allRegions}
                    left={left} right={right}
					/>
					<Landmarks region={activeRegion}/>
				</div>
			</WLMain>
            {
				showUpdate && (<UpdateAccount user={props.user} setShowUpdate={setShowUpdate} fetchUser={props.fetchUser}/>)
			}
        </WLayout>
    );
}

export default Region;
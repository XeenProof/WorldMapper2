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
import * as mutations 					from '../../cache/mutations';
import {  UpdateRegionArray_Transaction } 				from '../../utils/jsTPS';

const Region = (props) => {

    let activeRegion = {};
    let history = useHistory();
    let { id } = useParams();
    let activeId = id;

    const [showUpdate, toggleShowUpdate]    = useState(false);

    const [UpdateRegionArray] = useMutation(mutations.UPDATE_REGION_ARRAY);

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
    let myLandmarks = [];

//-----Temp-Sealed-------------------------------------------------------
    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		allRegions = data.getAllRegions;
        activeRegion = allRegions.find(x => x._id == activeId);
        myLandmarks = activeRegion? activeRegion.landmarks:[];
        parent = activeRegion? allRegions.find(x => x._id == activeRegion.parent): {};
        siblings = parent? parent.children: [];
        let index = (siblings)? siblings.indexOf(activeId):0;
        if(siblings){
            left = (index-1 > 0)? siblings[index-1]: '';
            right = (index+1 < siblings.length)? siblings[index+1]: '';
        }
	}
    if(!auth && !reload){//makes sure that the list is loaded
        refetch();
        reload = true;
    }
//-----Temp-Sealed-------------------------------------------------------
	//console.log(activeRegion);
    const tpsUndo = async () => {
		if (props.tps.hasTransactionToUndo()){
			const retVal = await props.tps.undoTransaction();
			refetch();
		}
	}

	const tpsRedo = async () => {
		if (props.tps.hasTransactionToRedo()){
			const retVal = await props.tps.doTransaction();
			refetch();
		}
	}

	const createDirectory = () => {
        if (!activeRegion){return ""}
        let route = [];
        let currentId = activeRegion.parent;
        let region;
        while (currentId != 'root'){
            region = allRegions.find(x => x._id == currentId);
            if(!region){break}
            route.unshift(region);
            currentId = region.parent;
        }
        return route;
    }

    let directory = createDirectory();

    const getTree = (startId) => {
        let regions = [allRegions.find(x => x._id == startId)];
        for(let i = 0; i < regions.length; i++){
            let currentRegion = regions[i];
            if (!currentRegion) continue;
            let children = currentRegion.children;
            let newRegions = children.map(x => allRegions.find(y => y._id == x));
            regions = regions.concat(newRegions);
        }
        return regions;
    }

    const getAllLandmarks = (id) => {
        let landmarkList = [];
        let regions = getTree(id);
        let allLandmarkArrays = regions.map(x => ({
            landmarks: x? x.landmarks: [],
            owner: x? x.name: '',
            editable: x? (x._id == id): false,
            exist: !!x
        }));
        allLandmarkArrays = allLandmarkArrays.filter(x => x.exist);
        if (allLandmarkArrays.length == 0) return [];
        allLandmarkArrays.map(array => array.landmarks.map(landmark => landmarkList.push({
            landmark: landmark,
            owner: array.owner,
            editable: array.editable
        })));
        return landmarkList;
    }

    let allLandmarks = getAllLandmarks(activeId);

//---------Resolver-Callers-----------------------------------------
    const addLandmark = (landmark) => {
        let landmarkSet = myLandmarks.map(x => x);
        let newLandmarkSet = myLandmarks.map(x => x);
        if (newLandmarkSet.find(x => x == landmark)){
            return;
        }
        newLandmarkSet.push(landmark);
        let transaction = new UpdateRegionArray_Transaction(activeId, 'landmarks', landmarkSet, newLandmarkSet, UpdateRegionArray);
        props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const deleteLandmark = (landmark) => {
        let landmarkSet = myLandmarks.map(x => x);
        let newLandmarkSet = myLandmarks.map(x => x);
        let index = newLandmarkSet.findIndex(x => x == landmark);
        console.log(index);
        if (index < 0){
            return;
        }
        newLandmarkSet.splice(index, 1);
        let transaction = new UpdateRegionArray_Transaction(activeId, 'landmarks', landmarkSet, newLandmarkSet, UpdateRegionArray);
        props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const updateLandmark = (oldValue, newValue) => {
        let landmarkSet = myLandmarks.map(x => x);
        let newLandmarkSet = myLandmarks.map(x => x);
        let index = newLandmarkSet.findIndex(x => x == oldValue);
        console.log(index);
        if (index < 0){
            return;
        }
        newLandmarkSet.splice(index, 1, newValue);
        let transaction = new UpdateRegionArray_Transaction(activeId, 'landmarks', landmarkSet, newLandmarkSet, UpdateRegionArray);
        props.tps.addTransaction(transaction);
        tpsRedo();
    }
//---------Resolver-Caller-Ends-------------------------------------


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
                    undo={tpsUndo} redo={tpsRedo}
					/>
					<Landmarks region={activeRegion} landmarks={allLandmarks}
                    addLandmark={addLandmark} deleteLandmark={deleteLandmark}
                    updateLandmark={updateLandmark}
                    />
				</div>
			</WLMain>
            {
				showUpdate && (<UpdateAccount user={props.user} setShowUpdate={setShowUpdate} fetchUser={props.fetchUser}/>)
			}
        </WLayout>
    );
}

export default Region;
import React, { useState, useEffect } 	from 'react';
import Navbar 							from '../navbar/Navbar';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { useHistory, useParams } from "react-router-dom";
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import SpreadsheetOptions from './SpreadsheetOptions';
import SpreadsheetTable from './SpreadsheetTable'
import SpreadsheetTableHeader from './SpreadsheetTableHeader';
import Delete 							from '../modals/Delete';
import UpdateAccount from '../modals/UpdateAccount';

const Spreadsheet = (props) => {

    let activeRegion = {};
    let history = useHistory();
    let { id } = useParams();
    let activeId = id;

    

    const [AddRegion] = useMutation(mutations.ADD_REGION);
    const [DeleteRegion] = useMutation(mutations.DELETE_REGION);

    //console.log(activeId);

    const [region, setRegion]     = useState("");
    const [showUpdate, toggleShowUpdate]    = useState(false);
    const [showDelete, toggleShowDelete]    = useState(false);

	

    const auth = props.user === null ? false : true;

    let reload = false;
    let allRegions = [];
//-----Temp-Sealed-------------------------------------------------------
    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		allRegions = data.getAllRegions;
        activeRegion = allRegions.find(x => x._id == activeId);
	}
//-----Temp-Sealed-------------------------------------------------------

    

    let name = (activeRegion)? activeRegion.name: '';

    //console.log(activeRegion);

    const createDirectory = () => {
        if (!activeRegion){return ""}
        let route = [];
        let currentId = activeRegion.parent;
        let region;
        while (currentId != 'root'){
            region = allRegions.find(x => x._id == currentId);
            if(!region){break}
            route.unshift(region.name);
            currentId = region.parent;
        }
        return route.join(' > ');
    }

    let directory = createDirectory();

    const getRegion = (_id) => {
        return allRegions.find(x => x._id == _id);
    }

    //------------------------------resolvers callers----------------------------------------------
    const addSubregion = async() => {
        let region = {
            _id: 'temp',//This is required to be temp if we are generating a completely new _id
            name: 'region',
            capital: 'capital',
            leader: 'leaded',
            owner: props.user._id,
            parent: activeId,
            last_opened: '',
            children: [],
            landmarks: []
        };
        const { data } = await AddRegion({ variables: { region: region}});
        refetch();
    }

    const deleteSubregion = async () => {
        const { data } = await DeleteRegion({ variables: { _id: region}});
        console.log(data);
		refetch();
    }
    //------------------------------resolvers callers end------------------------------------------

    const redirect = (route) => {
        props.tps.clearAllTransactions();
		history.push(route, {reload: true});
	}

    if(!auth && !reload){//makes sure that the list is loaded
        
        refetch();
        reload = true;
    }

    const setShowUpdate = () => {
        setRegion('');
        toggleShowDelete(false);
        toggleShowUpdate(!showUpdate);
	};

    const setShowDelete = (id) => {
        setRegion(id);
        toggleShowDelete(!showDelete);
        toggleShowUpdate(false);
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
            <WLMain className='spreadsheet-alignment'>
                <WLayout wLayout="header">
                    <WLHeader className='container flexlr'>
                        <SpreadsheetOptions 
                        addSubregion={addSubregion} redirect={redirect}
                        region={activeRegion} user={props.user}
                        />
                        <div className='spreadsheet-text flexlr title-card'>
                            <div>{"Region Name: "}</div>
                            <div className={"title-name-text"}>{name}</div>
                        </div>
                    </WLHeader>
                    <WLMain className="spreadsheet-background ">
                        {activeRegion && <SpreadsheetTable children={activeRegion.children} 
                        allRegions={allRegions} setShowDelete={setShowDelete}
                        redirect={redirect}
                        />}
                    </WLMain>
                </WLayout>
            </WLMain>
            {
				showDelete && (<Delete deleteRegion={deleteSubregion} setShowDelete={setShowDelete} />)
			}
            {
				showUpdate && (<UpdateAccount user={props.user} setShowUpdate={setShowUpdate} fetchUser={props.fetchUser}/>)
			}
        </WLayout>
    );
}

export default Spreadsheet;
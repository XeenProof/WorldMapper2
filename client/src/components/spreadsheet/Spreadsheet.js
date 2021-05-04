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
import { DeleteRegion_Transaction,
    UpdateRegionField_Transaction, 
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction,
	UpdateList_Transaction } 				from '../../utils/jsTPS';

const Spreadsheet = (props) => {

    let activeRegion = {};
    let history = useHistory();
    let { id } = useParams();
    let activeId = id;

    

    const [AddRegion] = useMutation(mutations.ADD_REGION);
    const [DeleteRegion] = useMutation(mutations.DELETE_REGION);
    const [UpdateRegionField] = useMutation(mutations.UPDATE_REGION_FIELD);

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
        let region = [{
            _id: 'temp',//This is required to be temp if we are generating a completely new _id
            name: 'region',
            capital: 'capital',
            leader: 'leaded',
            owner: props.user._id,
            parent: activeId,
            last_opened: '',
            children: [],
            landmarks: []
        }];
        const { data } = await AddRegion({ variables: { region: region}});
        refetch();
    }

    const deleteSubregion = async () => {
        let transaction = new DeleteRegion_Transaction(region, DeleteRegion, AddRegion);
        props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const updateRegionField = async (_id, field, prev, update) => {
        let transaction = new UpdateRegionField_Transaction(_id, field, prev, update, UpdateRegionField);
        props.tps.addTransaction(transaction);
        tpsRedo();
    }
    //------------------------------resolvers callers end------------------------------------------

    const redirect = (route) => {
        props.tps.clearAllTransactions();
		history.push(route, {reload: true});
	}

    // if(!auth && !reload){//makes sure that the list is loaded
        
    //     refetch();
    //     reload = true;
    // }

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
                        undo={tpsUndo} redo={tpsRedo}
                        />
                        <div className='spreadsheet-text flexlr title-card'>
                            <div>{"Region Name: "}</div>
                            <div className={"title-name-text"}>{name}</div>
                        </div>
                    </WLHeader>
                    <WLMain className="spreadsheet-background ">
                        {activeRegion && <SpreadsheetTable children={activeRegion.children} 
                        allRegions={allRegions} setShowDelete={setShowDelete}
                        redirect={redirect} updateRegionField={updateRegionField}
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
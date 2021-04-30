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

const Spreadsheet = (props) => {

    let titleCard = "Region Name:";
    let activeRegion = {};
    let history = useHistory();
    let { id } = useParams();
    let activeId = id;

    const [AddRegion] = useMutation(mutations.ADD_REGION);
    const [DeleteRegion] = useMutation(mutations.DELETE_REGION);

    //console.log(activeId);

	const redirect = (route) => {
		history.push(route);
	}

    const auth = props.user === null ? false : true;
    let reload = false;
    let allRegions = [];

    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
        console.log("data reached");
		allRegions = data.getAllRegions;
        activeRegion = allRegions.find(x => x._id == activeId);
	}
    if(!auth && !reload){//makes sure that the list is loaded
        refetch();
        reload = true;
    }

    let name = (activeRegion)? activeRegion.name: '';

    console.log(activeRegion);

    const addSubregion = async() => {
        let region = {
            _id: 'temp',//This is required to be temp if we are generating a completely new _id
            name: 'region',
            capital: 'capital',
            leader: 'leaded',
            owner: props.user._id,
            parent: activeId,
            children: [],
            landmarks: []
        };
        const { data } = await AddRegion({ variables: { region: region}});
        refetch();
    }

    const deleteSubregion = async (_id) => {
        const { data } = await DeleteRegion({ variables: { _id: _id}});
        //setShowDelete("");
		refetch();
    }


    return(
        <WLayout id="fullpage" wLayout="header">
            <WLHeader id='header'>
                <Navbar 
                    fetchUser={props.fetchUser} auth={auth} 
                    setShowCreate={() => {}} setShowLogin={() => {}}
                    refetchTodos={refetch} setActiveList={() => {}}
                    directory={"spreadsheet"} redirect={redirect} user={props.user}/>
            </WLHeader>
            <WLMain className='spreadsheet-alignment'>
                <WLayout wLayout="header">
                    <WLHeader className='container flexlr'>
                        <SpreadsheetOptions addSubregion={addSubregion}/>
                        <div className='spreadsheet-text flexlr title-card'>
                            <div>{"Region Name: "}</div>
                            <div className={"title-name-text"}>{name}</div>
                        </div>
                    </WLHeader>
                    <WLMain className="spreadsheet-background">
                        <SpreadsheetTable children={activeRegion.children} allRegions={allRegions} deleteSubregion={deleteSubregion}/>
                    </WLMain>

                    {/* <div className='flexlr'>
                        <div className='size background-test'>
                            hihi
                        </div>
                        <div className='size background-test2'>
                            hihi
                        </div>
                    </div> */}
                </WLayout>
            </WLMain>
        </WLayout>
    );
}

export default Spreadsheet;
import React, { useState, useEffect } 	from 'react';
import Navbar 							from '../navbar/Navbar';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { useHistory, useParams } from "react-router-dom";
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import SpreadsheetOptions from './SpreadsheetOptions';
import SpreadsheetTable from './SpreadsheetTable'
import SpreadsheetTableHeader from './SpreadsheetTableHeader';

const Spreadsheet = (props) => {

    let titleCard = "Region Name:";
    let activeRegion = {};
    let history = useHistory();
    let { id } = useParams();
    let activeId = id;

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
                        <SpreadsheetOptions />
                        <div className='spreadsheet-text flexlr title-card'>
                            <div>{"Region Name: "}</div>
                            <div className={"title-name-text"}>{name}</div>
                        </div>
                    </WLHeader>
                    <WLMain className="spreadsheet-background">
                        <SpreadsheetTable/>
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
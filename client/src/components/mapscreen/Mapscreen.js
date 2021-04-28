import React, { useState, useEffect } 	from 'react';
import Navbar 							from '../navbar/Navbar';
import { WNavbar, WSidebar, WNavItem, WButton } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_TODOS } 				from '../../cache/queries';
import { useHistory } from "react-router-dom";
import * as mutations 					from '../../cache/mutations';

const Mapscreen = (props) => {

    const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
    const [activeList, setActiveList] 		= useState({});

    const auth = props.user === null ? false : true;
    let todolists = [];

    const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		todolists = data.getAllTodos; 
		// todolistsIds = todolists.map(x => x._id.toString());
		// const listComparator = makeComparator('last_opened', true);
		// todolistsIdsSorted = sortList(todolistsIds, todolists, listComparator);
	}

    const setShowLogin = () => {
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
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
                        <div className='size'>
                            
                        </div>
                        <div className='size'>
                            <div className='image2 background-test2'>PlaceHolder</div>
							<WButton className='create-new-map'>
                                Create New Map
                            </WButton>
                        </div>
                    </div>
                </WLayout>
            </WLMain>
        </WLayout>
    );
}

export default Mapscreen;
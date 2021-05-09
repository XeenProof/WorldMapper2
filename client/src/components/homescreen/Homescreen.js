import React, { useState } 	from 'react';
import Navbar 							from '../navbar/Navbar';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import { WLayout, WLHeader, WLMain} from 'wt-frontend';
import { useHistory } from "react-router-dom";





const Homescreen = (props) => {

	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);

	const auth = props.user === null ? false : true;

	const setShowLogin = () => {
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}
	
	return (//This attaches to the root
		<WLayout id="fullpage" wLayout="header">
			<WLHeader id='header'>
				<Navbar 
					fetchUser={props.fetchUser} auth={auth} 
					setShowCreate={setShowCreate} setShowLogin={setShowLogin}
					refetchTodos={() => {}} setActiveList={() => {}}
					directory={[]} redirect={redirect} user={props.user}/>
			</WLHeader>
			<WLMain>
				<img className='home-image' src='Logo2.JPG' width="500" height="500"/>
                <div className='homescreen-text'>Welcome to the World Data Mapper</div>
            </WLMain>
			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} redirect={redirect}/>)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} refetchTodos={() => {}}setShowLogin={setShowLogin} redirect={redirect}/>)
			}
			
		</WLayout>
	);
};

export default Homescreen;
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
	console.log(history);
	//console.log(history);
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

{/* <WNavbar color="colored">
<ul>
	<WNavItem>
		<Logo className='logo' />
	</WNavItem>
</ul>
<ul>
	<NavbarOptions
		fetchUser={props.fetchUser} auth={auth} 
		setShowCreate={setShowCreate} setShowLogin={setShowLogin}
		refetchTodos={refetch} setActiveList={setActiveList}
	/>
</ul>
</WNavbar> */}

//--------------------------------World Data Mapper
{/* <WLMain>
                <div className='image center'>
                    Globe
                </div>
                <div className='homescreen-text'>Welcome to the World Data Mapper</div>
            </WLMain> */}
//--------------------------------World Data Mapper End

//--------------------------------In a but not in b
// let a = [1,2,3,4,5];
// let b = [1,2,6,];
// let c = a.filter(x => !b.find(y => y == x));
//---------------------------------------------------------------------------


{/* <WLSide id='left-sidebar' side="left">
				<WSidebar>
					{
						activeList ?
							<SidebarContents
								todolists={todolists} activeid={activeList.id} auth={auth} listorder={todolistsIdsSorted}
								handleSetActive={handleSetActive} createNewList={createNewList}
								updateListField={updateListField}
								listActive={listActive}
							/>
							:
							<></>
					}
				</WSidebar>
			</WLSide>
			<WLMain id='mainlist'>
				{
					activeList ? 
							<div id='workspace' className="container-secondary">
								<MainContents
									addItem={addItem} deleteItem={deleteItem}
									editItem={editItem} reorderItem={reorderItem}
									setShowDelete={setShowDelete}
									activeList={activeList} closeList={closeList}
									undo={tpsUndo} redo={tpsRedo}
									canUndo={props.tps.hasTransactionToUndo()}
									canRedo={props.tps.hasTransactionToRedo()}
									sortList={updateSortedList}
								/>
							</div>
						:
							<div id='workspace' className="container-secondary" />
				}

			</WLMain> */}
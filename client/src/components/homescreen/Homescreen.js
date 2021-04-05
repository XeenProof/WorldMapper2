import React, { useState, useEffect } 	from 'react';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import MainContents 					from '../main/MainContents';
import SidebarContents 					from '../sidebar/SidebarContents';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import { GET_DB_TODOS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateListField_Transaction, 
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction,
	UpdateList_Transaction } 				from '../../utils/jsTPS';
import WInput from 'wt-frontend/build/components/winput/WInput';
const ObjectId = require('mongoose').Types.ObjectId;


const Homescreen = (props) => {
	//let shortcuts;
	//useEffect(document.addEventListener('keypress', shortcuts));
	// useEffect(() => {
	// 	document.addEventListener('keydown', shortcuts);
	// 	return () => {document.removeEventListener('keydown', shortcuts)}
	// });

	useEffect(() => {
		document.addEventListener('keydown', shortcuts);
		return () => {document.removeEventListener('keydown', shortcuts)}
	});

	let todolists 							= [];
	let todolistsIds                        = [];
	let todolistsIdsSorted                  = [];
	const [activeList, setActiveList] 		= useState({});
	const [listActive, toggleListActive] 	= useState(false);
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);

	const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS);
	const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD);
	const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD);
	const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);
	const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM);
	const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM);
	const [SortList] 			    = useMutation(mutations.SORT_LIST);

	

	

	//gets the date
	//const test = new Date().toISOString();
	//console.log(test);


	

	// useEffect function
	// document.removeEventListener('keydown', shortcuts);
	

	//shortcuts came from here

	const makeComparator = (criteria, invert) => {
		let multi = invert? -1:1;
		return function (item1, item2){
			let value1 = item1[criteria];
			let value2 = item2[criteria];
			if (value1 < value2) {
				return -1*multi;
			  }
			  else if (value1 === value2) {
				return 0;
			  }
			  else {
				return 1*multi;
			  }
		}
	}

	const sortList = (ids, source, comparator) => {
		let info = source;
		let idSet = ids;
		for(let i = 0; i < ids.length-1; i++){
			for(let j = i + 1; j < ids.length; j++){
				let itemi = info.find(e => e._id.toString() === idSet[i]);
				let itemj = info.find(e => e._id.toString() === idSet[j]);
				let result = comparator(itemi, itemj)
				if (result == 1){
					let temp = idSet[i];
					idSet[i] = idSet[j];
					idSet[j] = temp;
				}
			}
		}
		return idSet;
	}

	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		todolists = data.getAllTodos; 
		todolistsIds = todolists.map(x => x._id.toString());
		const listComparator = makeComparator('last_opened', true);
		todolistsIdsSorted = sortList(todolistsIds, todolists, listComparator);
	}

	const auth = props.user === null ? false : true;
	//getting active list
	const refetchTodos = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			todolists = data.getAllTodos;
			if (activeList._id) {
				let tempID = activeList._id;
				let list = todolists.find(list => list._id === tempID);

				setActiveList(list);
				toggleListActive(true);
			}
		}
	}

	let shortcuts = (event) => {
		//console.log(event);
		if(showCreate || showDelete || showLogin){
			return;
		}
		if(event.ctrlKey && event.code == 'KeyZ'){
		  console.log("Undo: triggered");
		  tpsUndo();
		}
		if(event.ctrlKey && event.code == 'KeyY'){
		  console.log("Redo: triggered");
		  tpsRedo();
		}
	}


	const tpsUndo = async () => {
		if (props.tps.hasTransactionToUndo()){
			const retVal = await props.tps.undoTransaction();
			refetchTodos(refetch);
			return retVal;
		}
	}

	const tpsRedo = async () => {
		if (props.tps.hasTransactionToRedo()){
			const retVal = await props.tps.doTransaction();
			refetchTodos(refetch);
			return retVal;
		}
	}


	// Creates a default item and passes it to the backend resolver.
	// The return id is assigned to the item, and the item is appended
	//  to the local cache copy of the active todolist. 
	const addItem = async () => {
		let list = activeList;
		const items = list.items;
		let idList = items.map(x => x.id);
		const lastID = (idList.length == 0)? 0: Math.max(...idList)+1;
		console.log(lastID);
		const newItem = {
			_id: 'temp',
			id: lastID,
			description: 'No Description',
			due_date: 'No Date',
			assigned_to: props.user.firstName,
			completed: false
		};
		let opcode = 1;
		let index = items.length;
		console.log(index);
		let itemID = newItem._id;
		let listID = activeList._id;
		let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, index, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};


	const deleteItem = async (item) => {
		let listID = activeList._id;
		let itemID = item._id;
		let opcode = 0;
		let itemToDelete = {
			_id: item._id,
			id: item.id,
			description: item.description,
			due_date: item.due_date,
			assigned_to: item.assigned_to,
			completed: item.completed
		}
		let index = activeList.items.indexOf(item);
		console.log(index);
		let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, index, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const editItem = async (itemID, field, value, prev) => {
		let flag = 0;
		if (field === 'completed') flag = 1;
		let listID = activeList._id;
		let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const reorderItem = async (itemID, dir) => {
		let listID = activeList._id;
		let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const createNewList = async () => {
		let idList = todolists.map(x => x.id);
		const id = (idList.length == 0)? 0: Math.max(...idList) + 1;
		let list = {
			_id: 'temp',
			id: id,
			name: 'Untitled',
			owner: props.user._id,
			last_opened: '',
			items: []
			
		}
		const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
		if (data){
			const { addTodolist } = data;
			list._id = addTodolist;
			setActiveList(list);
			toggleListActive(true);
			refetch();
		}
	};

	const deleteList = async (_id) => {
		props.tps.clearAllTransactions();
		DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
		refetch();
		setActiveList({});
		toggleListActive(false);
	};

	const updateListField = async (_id, field, value, prev) => {
		let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};
	
	const updateSortedList = async (field) => {
		let listId = activeList._id;

		let todoList = activeList.items;
		let unsortedIds = todoList.map(x => x._id.toString());
		let unsortedIds2 = todoList.map(x => x._id.toString());
		
		let comparator = makeComparator(field, false);
		let sortedIds = sortList(unsortedIds2, activeList.items, comparator);
		if(compareList(sortedIds, unsortedIds)){
			sortedIds.reverse();
		}

		let transaction = new UpdateList_Transaction(listId, unsortedIds, sortedIds, SortList);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const compareList = (list1, list2) => {
		if (list1.length != list2.length){
			return false;
		}
		for(let i = 0; i < list1.length; i++){
			if(list1[i] !== list2[i]){
				return false;
			}
		}
		return true;
	}

	const handleSetActive = async (id) => {
		console.log(id);
		props.tps.clearAllTransactions();
		const todo = todolists.find(todo => todo.id == id || todo._id == id);

		//console.log(todo._id);
		let _id = todo._id;
		const { data } = await UpdateTodolistField({ variables: { _id: _id, field: 'last_opened', value: new Date().toISOString() }});
		setActiveList(todo);
		toggleListActive(true);
		refetch();
		//console.log(activeList.id);
	};

	//student made
	const closeList = () => {
		props.tps.clearAllTransactions();
		setActiveList({});
		toggleListActive(false);
		//console.log(activeList);
	}

	
	/*
		Since we only have 3 modals, this sort of hardcoding isnt an issue, if there
		were more it would probably make sense to make a general modal component, and
		a modal manager that handles which to show.
	*/
	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	}

	

	
	//useEffect(document.removeEventListener('keypress', shortcuts), []);

	

	return (//This attaches to the root
		<WLayout id="fullpage" wLayout="header-lside">
			<WLHeader id='header'>
				<WNavbar color="colored">
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
				</WNavbar>
			</WLHeader>

			<WLSide id='left-sidebar' side="left">
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

			</WLMain>
			
			{
				showDelete && (<Delete deleteList={deleteList} activeid={activeList._id} setShowDelete={setShowDelete} />)
			}

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} refetchTodos={refetch}setShowLogin={setShowLogin} />)
			}
			
		</WLayout>
	);
};

export default Homescreen;
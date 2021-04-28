const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 * //gets all the todoLists that belong to the user ID
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
		getAllTodos: async (_, __, { req }) => {//red comes from server-config
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const todolists = await Region.find({owner: _id});
			//console.log(todolists);
			if(todolists) return (todolists);

		},

		/** 
		 * gets all the todoLists that belong to the user ID
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of region objects on success, and an empty array on failure
		**/
		getAllRegions: async (_, __, {req}) => {
			const _id = new ObjectId(req.userId);
			if(!_id) {return([])};
			const regions = await Region.find({owner: _id});
			if(regions) return (regions);
		},
		/** 
		 * //gets a todoList by id
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getTodoById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const todolist = await Region.findOne({_id: objectId});
			if(todolist) return todolist;
			else return ({});
		},
	},
	Mutation: {
					// _id: String!
			// id: Int!
			// name: String!
			// capital: String
			// leader: String
			// owner: String!
			// parent: String!
			// children: [String]
			// landmark: [LandmarkInput]
		/**
		 * 
		 * @param {object} args - a new region 
		 * @returns {string} the objectID of the item or an error message
		 */
		addRegion: async(_, args) => {
			console.log("adding Region");
			const { region } = args;
			const objectId = new ObjectId();
			const { name, capital, leader, owner, parent, children, landmarks} = region;
			const newRegion = new Region({
				_id: objectId,
				name: name,
				capital: capital,
				leader: leader,
				owner: owner,
				parent: parent,
				children: children,
				landmarks: landmarks,
			});
			const updated = newRegion.save();
			if (updated) return objectId;
			else return ("could not add region");
		},

		/** 
		 	@param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteRegion: async(_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},

		/** 
		 	@param 	 {object} args - a todolist id and an empty item object
			@returns {string} the objectID of the item or an error message
		**/
		addItem: async(_, args) => {
			console.log("adding item");
			const { _id, item } = args;
			let { index } = args;
			console.log("adding item search");
			const listId = new ObjectId(_id);
			console.log("adding item end");
			const objectId = new ObjectId();
			
			const found = await Region.findOne({_id: listId});
			//console.log("adding item end");
			if(!found) {
				return ('Todolist not found');
			}
			item._id = objectId;
			let listItems = found.items;
			listItems.splice(index, 0, item);
			//listItems.push(item);
			
			const updated = await Region.updateOne({_id: listId}, { items: listItems });

			if(updated) return (objectId);
			else return ('Could not add item');
		},
		/** 
		 	@param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addTodolist: async (_, args) => {
			const { todolist } = args;
			const objectId = new ObjectId();
			const { id, name, owner, items } = todolist;
			const newList = new Region({
				_id: objectId,
				id: id,
				name: name,
				owner: owner,
				last_opened: new Date().toISOString(),
				items: items,
			});
			const updated = newList.save();
			if(updated) return objectId;
			else return ('Could not add todolist');
		},
		/** 
		 	@param 	 {object} args - a todolist objectID and item objectID
			@returns {array} the updated item array on success or the initial 
							 array on failure
		**/
		deleteItem: async (_, args) => {
			const  { _id, itemId } = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			let listItems = found.items;
			listItems = listItems.filter(item => item._id.toString() !== itemId);
			const updated = await Region.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			else return (found.items);

		},
		/** 
		 	@param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteTodolist: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateTodolistField: async (_, args) => {
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {[field]: value});
			// console.log(field === 'last_opened');
			// if(field == 'last_opened'){
			// 	const reorder = await Todolist.find({owner: _id}).sort({'last_opened', -1});
			// }
			if(updated) return value;
			else return "";
		},
		/** 
			@param	 {object} args - a todolist objectID, an item objectID, field, and
									 update value. Flag is used to interpret the completed 
									 field,as it uses a boolean instead of a string
			@returns {array} the updated item array on success, or the initial item array on failure
		**/
		updateItemField: async (_, args) => {
			const { _id, itemId, field,  flag } = args;
			let { value } = args
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});//finds the list the item belongs in
			let listItems = found.items; // makes a copy of the array in the list
			if(flag === 1) { //for if we are changing status
				if(value === 'complete') { value = true; }
				if(value === 'incomplete') { value = false; }
			}
			listItems.map(item => { //makes the value changes to the item we need it to make
				if(item._id.toString() === itemId) {	
					
					item[field] = value;
				}
			});
			const updated = await Region.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			else return (found.items);
		},
		/**
			@param 	 {object} args - contains list id, item to swap, and swap direction
			@returns {array} the reordered item array on success, or initial ordering on failure
		**/
		reorderItems: async (_, args) => {
			const { _id, itemId, direction } = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			let listItems = found.items;
			const index = listItems.findIndex(item => item._id.toString() === itemId);
			// move selected item visually down the list
			if(direction === 1 && index < listItems.length - 1) {
				let next = listItems[index + 1];
				let current = listItems[index]
				listItems[index + 1] = current;
				listItems[index] = next;
			}
			// move selected item visually up the list
			else if(direction === -1 && index > 0) {
				let prev = listItems[index - 1];
				let current = listItems[index]
				listItems[index - 1] = current;
				listItems[index] = prev;
			}
			const updated = await Region.updateOne({_id: listId}, { items: listItems })
			
			if(updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);

		},

		/**
			@param 	 {object} args - contains list id, and the new itemlist to replace it with
			@returns {array} the reordered item array on success, or initial ordering on failure
		**/
		sortTodoList: async (_, args) => {
			const { _id } = args;
			let { todoIDs } = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			let currentItems = found.items;
			let newList = todoIDs.map(id => currentItems.find(e => e._id == id));
			//console.log(newList);
			const updated = await Region.updateOne({_id: listId}, { items: newList })
			//const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return true;
			else return false;
			//return true;
			//await Todolist.find({}).sort({'last_opened', -1});
		}


	}
}
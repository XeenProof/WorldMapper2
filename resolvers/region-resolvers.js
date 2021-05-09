const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 * gets all the Regions that belong to the user ID
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of region objects on success, and an empty array on failure
		**/
		getAllRegions: async (_, __, {req}) => {
			const _id = new ObjectId(req.userId);
			if(!_id) {return([])};
			const regions = await Region.find({owner: _id});
			if(regions) return (regions);
		}
	},
	Mutation: {

		/**
		 * @param {object} args - an array of new regions 
		 * @returns {string} an array of objectIds
		 */
		addRegion: async(_, args) => {
			console.log("adding Region 2");
			const { region } = args;
			const regionSet = region.map(x => 
				new Region({
					_id: (x._id == 'temp')? new ObjectId(): new ObjectId(x._id),
					name: x.name,
					capital: x.capital,
					leader: x.leader,
					owner: x.owner,
					parent: x.parent,
					last_opened: new Date().toISOString(),
					children: x.children,
					landmarks: x.landmarks,
				})
			);

			const updated = regionSet.map(x => x.save());

			const idSet = regionSet.map(x => x._id.toString());

			for(let i = 0; i < regionSet.length; i++){
				let current = regionSet[i];
				if(current.parent == 'root'){
					continue;
				}
				let objectId = current._id;
				let parentId = new ObjectId(current.parent);
				
				let found = await Region.findOne({_id: parentId});
				if (!found) continue;

				let children = found.children;
				let exist = children.find(x => x == objectId);
		 		if (exist) continue;
				
				children.push(objectId);
		 		await Region.updateOne({_id: parentId}, { children: children });
			}

			if (updated) return idSet;
			else return [];
		},

		/** 
		 	@param 	 {object} args - a region objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteRegion: async(_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const regionToDelete = await Region.findOne({_id: objectId});
			
			let parent = (regionToDelete)? regionToDelete.parent: 'root';
			//deleting self from parent
			if (parent != 'root'){
				const parentId = new ObjectId(parent);
				console.log(parentId);
				const found = await Region.findOne({_id: parentId});
				if (found){
					let children = found.children;
					let newChildren = children.filter(x => x != _id);
					const updated = await Region.updateOne({_id: parentId}, { children: newChildren });
				}
			}
			
			let idSet = [objectId];
			let regionSet = [];
			for(let i = 0; i < idSet.length; i++){
				const find = await Region.findOne({_id: idSet[i]});
				if (!find){continue;}
				regionSet.push(find);
				const childSet = find.children;
				const converted = childSet.map(x => new ObjectId(x));
				idSet = idSet.concat(converted);
			}

			const deleted = await Region.deleteMany({_id: idSet});

			//console.log(deleted);
			if(deleted) return regionSet;
			else return regionSet;
		},

		/** 
		 	@param 	 {object} args - a region objectID, field, and the update value
			@returns {string} value on successful update, empty string on failure
		**/
		updateRegionField: async(_, args) => {
			const { _id, field, value } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {[field]: value});
			if(updated) return value;
			else return "";
		},

		/** 
		 	@param 	 {object} args - a region objectID, field, and the update array
			@returns {string} value on successful update, empty string on failure
		**/
		updateRegionArray: async(_, args) => {
			const { _id, field, array } = args;
			let objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, { [field]: array });
			if(updated) return true;
			else return false;
		},

		changeRegionParent: async(_, args) => {
			const { _id, parentId } = args;
			const objectId = new ObjectId(_id);
			const newParentId = new ObjectId(parentId);

			const newParent = await Region.findOne({_id: newParentId}); //the new parent

			const region = await Region.findOne({_id: objectId}); //the region getting it's parent changed

			if (!region || !newParent){return false;}
			if (region.parent == 'root'){return false;}
			const oldParentId = new ObjectId(region.parent);

			const oldParent = await Region.findOne({_id: oldParentId}); //the old parent

			let oldSiblings = oldParent.children;
			let newSiblings = newParent.children;

			let exist = newSiblings.find(x => x == _id);
			if (!exist) {
				newSiblings.push(_id);
			}
			let updatedOldSiblings = oldSiblings.filter(x => x != _id);

			const oldUpdated = await Region.updateOne({_id: oldParentId}, { children: updatedOldSiblings });
			const newUpdated = await Region.updateOne({_id: newParentId}, { children: newSiblings });
			const regionUpdated = await Region.updateOne({_id: objectId}, { parent: parentId });

			if(regionUpdated) return true;
			else return false;
		}


	}
}
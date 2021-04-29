const { gql } = require('apollo-server');


const typeDefs = gql `
	type Todolist {
		_id: String!
		id: Int!
		name: String!
		owner: String!
		last_opened: String!
		items: [Item]
	}
	type Item {
		_id: String!
		id: Int!
		description: String!
		due_date: String!
		assigned_to: String!
		completed:  Boolean!
	}
	type Region{
		_id: String!
		name: String!
		capital: String
		leader: String
		owner: String!
		parent: String!
		children: [String]
		landmarks: [Landmark]
	}
	type Landmark{
		id: Int!
		landmark: String!
	}
	extend type Query {
		getAllTodos: [Todolist]
		getAllRegions: [Region]
		getTodoById(_id: String!): Todolist 
	}
	extend type Mutation {
		addRegion(region: RegionInput!): String
		deleteRegion(_id: String!): Boolean
		updateRegionField(_id: String!, field: String!, value: String): String

		addItem(item: ItemInput!, _id: String!, index: Int!): String
		addTodolist(todolist: TodoInput!): String
		deleteItem(itemId: String!, _id: String!): [Item]		
		deleteTodolist(_id: String!): Boolean
		updateTodolistField(_id: String!, field: String!, value: String!): String
		updateItemField(itemId: String!, _id: String!, field: String!, value: String!, flag: Int!): [Item]
		reorderItems(itemId: String!, _id: String!, direction: Int!): [Item]
		sortTodoList(_id: String!, todoIDs: [String]!): Boolean
	}
	input RegionInput{
		_id: String!
		name: String!
		capital: String
		leader: String
		owner: String!
		parent: String!
		children: [String]
		landmarks: [LandmarkInput]
	}
	input LandmarkInput{
		id: Int!
		landmark: String!
	}
	input FieldInput {
		_id: String
		field: String
		value: String
	}
	input TodoInput {
		_id: String
		id: Int
		name: String
		owner: String
		last_opened: String
		items: [ItemInput]
	}
	input ItemInput {
		_id: String
		id: Int
		description: String
		due_date: String
		assigned_to: String
		completed:  Boolean
	}
`;

module.exports = { typeDefs: typeDefs }
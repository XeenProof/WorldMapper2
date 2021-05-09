const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region{
		_id: String!
		name: String!
		capital: String
		leader: String
		owner: String!
		parent: String!
		last_opened: String!
		children: [String]
		landmarks: [String]
	}
	extend type Query {
		getAllRegions: [Region]
	}
	extend type Mutation {
		addRegion(region: [RegionInput]): [String]
		deleteRegion(_id: String!): [Region]
		updateRegionField(_id: String!, field: String!, value: String): String
		updateRegionArray(_id: String!, field: String!, array: [String]!): Boolean
		changeRegionParent(_id: String!, parentId: String!): Boolean
	}
	input RegionInput{
		_id: String!
		name: String!
		capital: String
		leader: String
		owner: String!
		parent: String!
		last_opened: String!
		children: [String]
		landmarks: [String]
	}
`;

module.exports = { typeDefs: typeDefs }
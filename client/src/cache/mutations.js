import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			name
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			_id
			email
			name
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const UPDATE = gql`
	mutation Update ($_id: String!, $email: String!, $password: String!, $name: String!){
		update(_id: $_id, email: $email, password: $password, name: $name){
			_id
			email
			name
		}
	}
`;

//export const 

//pulled from resolvers
export const ADD_REGION = gql`
	mutation AddRegion($region: [RegionInput]!){
		addRegion(region: $region)
	}
`;

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!){
		deleteRegion(_id: $_id) {
			_id
			name
			capital
			leader
			owner
			parent
			last_opened
			children
			landmarks
		}
	}
`;

export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField($_id: String!, $field: String!, $value: String!) {
		updateRegionField(_id: $_id, field: $field, value: $value)
	}
`;

export const UPDATE_REGION_ARRAY = gql`
	mutation UpdateRegionArray($_id: String!, $field: String!, $array: [String]!){
		updateRegionArray(_id: $_id, field: $field, array: $array)
	}
`;

export const CHANGE_REGION_PARENT = gql`
	mutation ChangeRegionParent($_id: String!, $parentId: String!){
		changeRegionParent(_id: $_id, parentId: $parentId)
	}
`;
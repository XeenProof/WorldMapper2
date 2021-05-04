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
	mutation AddRegion($region: RegionInput!){
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
			landmarks{
				id
				landmark
			}
		}
	}
`;

export const UPDATE_REGION_FIELD = gql`
mutation UpdateRegionField($_id: String!, $field: String!, $value: String!) {
	updateRegionField(_id: $_id, field: $field, value: $value)
}
`;

//Old Stuff---------------------------------------------------------------------------
export const ADD_ITEM = gql`
	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
		addItem(item: $item, _id: $_id, index: $index)
	}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($itemId: String!, $_id: String!) {
		deleteItem(itemId: $itemId, _id: $_id) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

//Capitalized = graphql query, lowcase = resolver function
export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const REORDER_ITEMS = gql`
	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const ADD_TODOLIST = gql`
	mutation AddTodolist($todolist: TodoInput!) {
		addTodolist(todolist: $todolist) 
	}
`;

export const DELETE_TODOLIST = gql`
	mutation DeleteTodolist($_id: String!) {
		deleteTodolist(_id: $_id)
	}
`;

export const UPDATE_TODOLIST_FIELD = gql`
	mutation UpdateTodolistField($_id: String!, $field: String!, $value: String!) {
		updateTodolistField(_id: $_id, field: $field, value: $value)
	}
`;

export const SORT_LIST = gql`
	mutation SortTodoList($_id: String!, $todoIDs: [String]!) {
		sortTodoList(_id: $_id, todoIDs: $todoIDs)
	}
`;
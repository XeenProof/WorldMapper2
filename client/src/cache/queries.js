import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
		}
	}
`;

export const GET_DB_REGIONS = gql`
	query GetDBRegions{
		getAllRegions{
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

export const GET_DB_TODOS = gql`
	query GetDBTodos {
		getAllTodos {
			_id
			id
			name
			owner
			last_opened
			items {
				_id
				id
				description
				due_date
				assigned_to
				completed
			}
		}
	}
`;

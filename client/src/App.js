import React 			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import Mapscreen 		from './components/mapscreen/Mapscreen';
import Spreadsheet 		from './components/spreadsheet/Spreadsheet';
import Region           from './components/region/Region';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { PromiseProvider } from 'mongoose';
//import { useHistory } from "react-router-dom";
 
const App = () => {

	
	let user = null;
    let transactionStack = new jsTPS();
	
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }

	

	// let history = useHistory();

	// //console.log(history);
	// const changeUrl = () => {
	// 	history.push("/spreadsheet");
	// }

	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/home"} } />
				<Route 
					path="/home" 
					name="home" 
					component={() => 
						<Homescreen tps={transactionStack} fetchUser={refetch} user={user}/>
					} 
				/>
				<Route 
					path="/maps" 
					name="maps" 
					component={() => 
						<Mapscreen tps={transactionStack} fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/spreadsheet" 
					name="spreadsheet" 
					component={() => 
						<Spreadsheet tps={transactionStack} fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/region" 
					name="region" 
					component={() => 
						<Region tps={transactionStack} fetchUser={refetch} user={user} />
					} 
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
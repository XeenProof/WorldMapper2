import React 	from 'react';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import Logo from './Logo';
import Route from './Route';
import NavbarOptions from './NavbarOptions';



const Navbar = (props) => {
    return (<WNavbar color="colored">
			<ul>
			<WNavItem>
				<Logo className='logo' />
			</WNavItem>
				</ul>

			<ul>
			<WNavItem>
				<Route directory={props.directory}/>
			</WNavItem>
				</ul>
			
			<ul>
				<NavbarOptions
					fetchUser={props.fetchUser} auth={props.auth} 
					setShowCreate={props.setShowCreate} setShowLogin={props.setShowLogin}
					refetchTodos={props.refetchTodos} setActiveList={props.setActiveList}
					redirect={props.redirect}
				/>
			</ul>
	</WNavbar>)
}

export default Navbar;
import React 	from 'react';
import { WNavbar, WSidebar, WNavItem, WButton} 	from 'wt-frontend';
import Logo from './Logo';
import Route from './Route';
import NavbarOptions from './NavbarOptions';



const Navbar = (props) => {

    return (<WNavbar color="colored">
			<ul>
			<WNavItem>
				<Logo className='logo' redirect={props.redirect} user={props.user} auth={props.auth}/>
			</WNavItem>
				</ul>

			{/* <ul>
			<WNavItem>
				<WButton onClick={() => props.redirect("home")}>H</WButton>
				<WButton onClick={() => props.redirect("maps")}>M</WButton>
				<WButton onClick={() => props.redirect("spreadsheet")}>S</WButton>
				<WButton onClick={() => props.redirect("region")}>R</WButton>
			</WNavItem>
			</ul> */}
			<ul className='directory-container'>
			<WNavItem>
				<Route directory={props.directory}/>
			</WNavItem>
			</ul>
			
			<ul>
				<NavbarOptions
					fetchUser={props.fetchUser} auth={props.auth} 
					setShowCreate={props.setShowCreate} setShowLogin={props.setShowLogin}
					refetchTodos={props.refetchTodos} setActiveList={props.setActiveList}
					redirect={props.redirect} user={props.user} setShowUpdate={props.setShowUpdate}
				/>
			</ul>
	</WNavbar>)
}

export default Navbar;
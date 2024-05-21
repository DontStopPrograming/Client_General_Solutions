import './Navbar.css';

// using react-router-dom
import { Link } from 'react-router-dom'

//HOOKS
import { useState } from 'react';

// Estructure of @MUI
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// const pages = ['Home', 'Services', 'About', 'Contact']

const pages = [
	{ name: 'Home', href: '/home' },
	{ name: 'Services', href: '/services' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' }
]

export const Navbar = () => {
	const [anchorNav, setAnchorNav] = useState(null)
	const openMenu = (e) => {
		setAnchorNav(e.currentTarget)
	}

	const closeMenu = () => {
		setAnchorNav(null)
	}

	return (
		<>
			<AppBar position="static" className='bar' sx={{ boxSizing: 'border-box', padding: '0', margin: '0', maxWidth: '100%' }}>
				<Toolbar variant="dense">

					<Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						JYM
					</Typography>
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{/* <Button color='inherit'> Home</Button>
						<Button color='inherit'> Features</Button>
						<Button color='inherit'> About</Button>
						<Button color='inherit'> Login</Button> */}
						{pages.map((page, id) => (

							<Link key={id} to={page.href}>
								<Button color='inherit'> {page.name} </Button>
							</Link>

						))}
					</Box>

					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
							<MenuIcon />
						</IconButton>
						<Menu open={Boolean(anchorNav)} onClose={closeMenu} sx={{ display: { xs: 'flex', md: 'none' } }} >

							<MenuItem> Home </MenuItem>
							<MenuItem> Services </MenuItem>
							<MenuItem> About </MenuItem>
							<MenuItem> Contact </MenuItem>

						</Menu>
					</Box>

					<IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ display: { xs: 'flex', md: 'none' } }}>

					</IconButton>

				</Toolbar>
			</AppBar>
		</>
	)
}

import './Navbar.css';

// using react-router-dom
import { Link, useNavigate } from 'react-router-dom'

//HOOKS
import { useState, useEffect } from 'react';

// GSAP
import { gsap } from 'gsap'

// IMG
import imgTest from '../../assets/edificio.png'


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
	const navigate = useNavigate()

	const [anchorNav, setAnchorNav] = useState(null)

	const openMenu = (e) => {
		setAnchorNav(e.currentTarget)
	}

	const closeMenu = () => {
		setAnchorNav(null)
	}

	const handleScroll = (e) => {
		if (e.deltaY > 0 && window.scrollY + window.innerHeight >= document.body.offsetHeight) {
			switch (window.location.pathname) {
				case '/home':
					const tl1 = gsap.timeline();
					tl1.to(['.home', '.bar'], { duration: 0.5, opacity: 0, ease: 'power2.out' })
						// .to('body', { duration: 0.2, background: 'var(--marine)', ease: 'power2.out' })
						.to('body', { duration: 1, zIndex: 9999, backgroundSize: 'cover', backgroundPosition: 'center', ease: 'power2.out' })
						.call(() => {
							navigate('/services');
						})
						.to(['.services', '.bar'], { duration: 0.5, opacity: 1, ease: 'power2.in', y: '0%' });
					break;
				case '/services':
					const tl2 = gsap.timeline();
					tl2.to(['.services', '.bar'], { duration: 0.5, opacity: 0, ease: 'power2.out' })
						.to('body', { duration: 0.2, background: 'var(--marine)', ease: 'power2.out' })
						.call(() => {
							navigate('/about');
						})
						.to(['.about', '.bar'], { duration: 0.5, opacity: 1, ease: 'power2.in', y: '0%' });
					break;
				case '/about':
					const tl3 = gsap.timeline();
					tl3.to(['.about', '.bar'], { duration: 0.5, opacity: 0, ease: 'power2.out' })
						.to('body', { duration: 0.2, background: 'var(--marine)', ease: 'power2.out' })
						.call(() => {
							navigate('/contact');
						})
						.to(['.contact', '.bar'], { duration: 0.5, opacity: 1, ease: 'power2.in', y: '0%' });
					break;
				default:
					break;
			}
		} else if (e.deltaY < 0 && window.scrollY <= 0) {
			switch (window.location.pathname) {
				case '/services':
					const tl4 = gsap.timeline();
					tl4.to(['.services', '.bar'], { duration: 0.5, opacity: 0, ease: 'power2.out' })
						.to('body', { duration: 0.2, background: 'var(--marine)', ease: 'power2.out' })
						.call(() => {
							navigate('/home');
						})
						.to(['.home', '.bar'], { duration: 0.5, opacity: 1, ease: 'power2.in', y: '0%' });
					break;
				case '/about':
					const tl5 = gsap.timeline();
					tl5.to(['.about', '.bar'], { duration: 0.5, opacity: 0, ease: 'power2.out' })
						.to('body', { duration: 0.2, background: 'var(--marine)', ease: 'power2.out' })
						.call(() => {
							navigate('/services');
						})
						.to(['.services', '.bar'], { duration: 0.5, opacity: 1, ease: 'power2.in', y: '0%' });
					break;
				case '/contact':
					const tl6 = gsap.timeline();
					tl6.to(['.contact', '.bar'], { duration: 0.5, opacity: 0, ease: 'power2.out' })
						.to('body', { duration: 0.2, background: 'var(--marine)', ease: 'power2.out' })
						.call(() => {
							navigate('/about');
						})
						.to(['.about', '.bar'], { duration: 0.5, opacity: 1, ease: 'power2.in', y: '0%' });
					break;
				default:
					break;
			}
		}
	};

	useEffect(() => {
		window.addEventListener('wheel', handleScroll)
		return () => {
			window.removeEventListener('wheel', handleScroll)
		}
	}, [handleScroll])


	return (
		<>
			<AppBar position="static" className='bar' sx={{ boxSizing: 'border-box', padding: '0', margin: '0', maxWidth: '100%', background: 'var(--super-dark)' }}>
				<Toolbar variant="dense">

					<Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: 'var(--orange)' } }}>
						JYM
					</Typography>
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{/* <Button color='inherit'> Home</Button>
						<Button color='inherit'> Features</Button>
						<Button color='inherit'> About</Button>
						<Button color='inherit'> Login</Button> */}
						{pages.map((page, id) => (

							<Link key={id} to={page.href} >
								<Button color='inherit'
									sx={{ color: 'var(--orange)' }}
								> {page.name} </Button>
							</Link>

						))}
					</Box>

					<Box sx={{ display: { xs: 'flex', md: 'none', color: 'var(--orange)' } }}>
						<IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
							<MenuIcon />
						</IconButton>
						<Menu open={Boolean(anchorNav)} onClose={closeMenu} sx={{
							display: { xs: 'flex', md: 'none' }
						}} >

							{/* <MenuItem> Home </MenuItem>
							<MenuItem> Services </MenuItem>
							<MenuItem> About </MenuItem>
							<MenuItem> Contact </MenuItem> */}

							{pages.map((page, id) => (
								<Link key={id} to={page.href}>
									<MenuItem onClick={closeMenu} >
										{page.name}
									</MenuItem>
								</Link>
							))}

						</Menu>
					</Box>

					<IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ display: { xs: 'flex', md: 'none' } }}>

					</IconButton>

				</Toolbar>

			</AppBar>

		</>
	)
}


import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const pages = [
	{ name: 'Home', href: '/home' },
	{ name: 'Services', href: '/services' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' }
];

export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [anchorNav, setAnchorNav] = useState(null);
	const [activePath, setActivePath] = useState(location.pathname);

	useEffect(() => {
		setActivePath(location.pathname);
	}, [location.pathname]);

	const openMenu = (e) => {
		setAnchorNav(e.currentTarget);
	};

	const closeMenu = () => {
		setAnchorNav(null);
	};

	const handleScroll = (e) => {
		if (e.deltaY > 0 && window.scrollY + window.innerHeight >= document.body.offsetHeight) {
			transitionPage(window.location.pathname, 'next');
		} else if (e.deltaY < 0 && window.scrollY <= 0) {
			transitionPage(window.location.pathname, 'previous');
		}
	};

	const handleNavClick = (e, href) => {
		if (e) e.preventDefault();
		transitionPage(location.pathname, href);
		closeMenu();
	};

	const transitionPage = (currentPath, action) => {
		const transitions = {
			'/home': { next: '/services', previous: null, element: '.home' },
			'/services': { next: '/about', previous: '/home', element: '.services' },
			'/about': { next: '/contact', previous: '/services', element: '.about' },
			'/contact': { next: null, previous: '/about', element: '.contact' },
		};

		const { next, previous, element } = transitions[currentPath] || {};

		let targetPath = '';
		if (action === 'next') targetPath = next;
		else if (action === 'previous') targetPath = previous;
		else targetPath = action;

		const targetTransition = Object.values(transitions).find(t => t.element.includes(targetPath?.replace('/', '')));

		if (targetPath && targetTransition) {
			const tl = gsap.timeline();

			tl.to([element, '.bar'], { duration: 0.7, opacity: 0, ease: 'power2.out' })
				.to('body', { duration: 0.4, background: 'var(--transition)', ease: 'power2.out' })
				.call(() => {
					setActivePath(targetPath);
					navigate(targetPath);
				})
				.to([targetTransition.element, '.bar'], { duration: 0.1, opacity: 1, ease: 'power2.in', y: '0%' });
		}
	};

	useEffect(() => {
		window.addEventListener('wheel', handleScroll);
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('wheel', handleScroll);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// No renderizar el navbar si estamos en la ruta /home
	if (location.pathname === '/home') {
		return null;
	}

	return (
		<AppBar position="static" className='bar' sx={{ boxSizing: 'border-box', padding: '0', margin: '0', maxWidth: '100%', background: 'var(--super-dark)' }}>
			<Toolbar variant="dense">
				<Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: 'var(--orange)' } }}>
					JYM
				</Typography>
				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					{pages.map((page, id) => (
						<Button key={id} color='inherit' onClick={(e) => handleNavClick(e, page.href)} sx={{ color: activePath === page.href ? 'var(--white)' : 'var(--orange)' }}>
							{page.name}
						</Button>
					))}
				</Box>
				<Box sx={{ display: { xs: 'flex', md: 'none', color: 'var(--orange)' } }}>
					<IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
						<MenuIcon />
					</IconButton>
					<Menu open={Boolean(anchorNav)} onClose={closeMenu} sx={{ display: { xs: 'flex', md: 'none' } }}>
						{pages.map((page, id) => (
							<MenuItem key={id} onClick={(e) => handleNavClick(e, page.href)} sx={{ color: activePath === page.href ? 'var(--white)' : 'var(--orange)' }}>
								{page.name}
							</MenuItem>
						))}
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};



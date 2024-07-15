import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
		e.preventDefault();
		transitionPage(window.location.pathname, href);
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
			if (currentPath === '/home' && targetPath === '/services') {
				tl.to('.imgTest', { duration: 0.5, y: '-100%', ease: 'power2.out' });
			}

			tl.to([element, '.bar'], { duration: 0.5, opacity: 0, ease: 'power2.out' })
				.to('body', { duration: 0.2, background: 'var(--marine)', ease: 'power2.out' })
				.call(() => {
					setActivePath(targetPath);
					navigate(targetPath);
				})
				.to([targetTransition.element, '.bar'], { duration: 0.5, opacity: 1, ease: 'power2.in', y: '0%' });
		}
	};

	useEffect(() => {
		window.addEventListener('wheel', handleScroll);
		return () => {
			window.removeEventListener('wheel', handleScroll);
		};
	}, []);

	return (
		<>
			<AppBar position="static" className='bar' sx={{ boxSizing: 'border-box', padding: '0', margin: '0', maxWidth: '100%', background: 'var(--super-dark)' }}>
				<Toolbar variant="dense">
					<Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: 'var(--orange)' } }}>
						JYM
					</Typography>
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page, id) => (
							<Link key={id} to={page.href} onClick={(e) => handleNavClick(e, page.href)}>
								<Button color='inherit' sx={{ color: activePath === page.href ? 'var(--super-marine)' : 'var(--orange)' }}>
									{page.name}
								</Button>
							</Link>
						))}
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none', color: 'var(--orange)' } }}>
						<IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
							<MenuIcon />
						</IconButton>
						<Menu open={Boolean(anchorNav)} onClose={closeMenu} sx={{ display: { xs: 'flex', md: 'none' } }}>
							{pages.map((page, id) => (
								<Link key={id} to={page.href} onClick={(e) => handleNavClick(e, page.href)}>
									<MenuItem onClick={closeMenu}>
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
	);
};

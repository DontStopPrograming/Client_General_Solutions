import './Home.css';
import '../../../src/index.css'

import architect from '../../assets/architect.png'
import arrow__down from '../../assets/arrow-down.png'

import { useNavigate } from 'react-router-dom';

import { gsap } from 'gsap'
import { useRef, useEffect } from 'react'

export const Home = () => {
	/* Creates an interactive effect on an image element using the GSAP library*/
	const imageRef = useRef(null)

	useEffect(() => {
		const image = imageRef.current;

		const handleMouseMove = (e) => {
			const rect = image.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			gsap.to(image, {
				rotationY: (x - rect.width / 2) / 45,
				rotationX: (y - rect.height / 2) / 45,
				duration: 0,
				ease: "elastic",
			});
		};

		const handleMouseLeave = () => {
			gsap.to(image, {
				rotationY: 0,
				rotationX: 0,
				duration: 0.5,
				ease: "elastic",
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	/* Is a hook that returns a navigate function */
	const navigate = useNavigate()

	const handleClickNext = () => {
		const tl = gsap.timeline()
		tl.to('.home', { duration: 0.5, opacity: 0, ease: 'power2.out' })
			.call(() => {
				navigate('/services')
			})
			.to('.services', { duration: 0.5, opacity: 1, ease: 'power2.in' })
	}

	//a scroll event and triggers a function `handleClickNext`
	const handleScroll = (e) => {
		if (
			e.deltaY > 0 &&
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight <=
			document.documentElement.scrollTop + 1
		) {
			handleClickNext()
		}
	}

	useEffect(() => {
		window.addEventListener('wheel', handleScroll)
		return () => {
			window.removeEventListener('wheel', handleScroll)
		}
	}, [handleScroll])

	//this

	const titleRef = useRef(null)
	const ampRef = useRef(null)

	useEffect(() => {
		const title = titleRef.current

		gsap.fromTo(
			title,
			{
				y: '100',
				scale: 0.5,
				opacity: 0,
			},
			{
				y: '0%',
				scale: 1,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
			}
		)
	}, [])

	// Animation for rotating '&' every 7 seconds
	useEffect(() => {
		const amp = ampRef.current;

		gsap.to(amp, {
			rotationX: 360,
			duration: 2,
			repeat: -1,
			repeatDelay: 5,
			ease: 'none'
		});
	}, []);

	return (
		<>
			<div className='home father'>
				<div className='container__home'>
					<div className='img__home'>
						<img src={architect} alt="engineer" ref={imageRef} />
					</div>

					<div className='title'>
						<div className='title__home' ref={titleRef}>
							<h1> GENERAL <br /> SERVICES <span ref={ampRef}>&</span><br /> SOLUTIONS </h1>
						</div>

						<div className='subtitle__home'>
							<p> EXPERTS IN CIVIL SECURITY </p>
						</div>
					</div>

					<div className='img__home-down'>
						<img src={arrow__down} onClick={handleClickNext} alt="arrow__down" />
					</div>
				</div>
			</div>
		</>
	);
}

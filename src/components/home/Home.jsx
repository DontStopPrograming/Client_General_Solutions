import './Home.css';
import '../../../src/index.css'

import architect from '../../assets/architect.png'
import arrow__down from '../../assets/arrow-down.png'

import { useNavigate } from 'react-router-dom';

import { gsap } from 'gsap'
import { useRef, useEffect } from 'react'

export const Home = () => {
	add

	/* Creates an interactive effect on an image element using the GSAP library*/
	const imageRef = useRef(null)

	useEffect(() => {
		const image = imageRef.current;

		const handleMouseMove = (e) => {
			const rect = image.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			gsap.to(image, {
				rotationY: (x - rect.width / 2) / 30,
				rotationX: (y - rect.height / 2) / 30,
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
		navigate('/services')
	}

	return (
		<>
			<div className='home father'>
				<div className='container__home'>

					<div className='img__home'>
						<img src={architect}
							alt="engineer"
							ref={imageRef}

						/>
					</div>

					<div className='title'>
						<div className='title__home'>
							<h1> GENERAL <br /> SERVICES &<br />  SOLUTIONS </h1>
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
};


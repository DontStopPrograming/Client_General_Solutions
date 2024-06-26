import './Home.css';
import '../../../src/index.css'

import architect from '../../assets/architect.png'
import arrow__down from '../../assets/arrow-down.png'

import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react'

export const Home = () => {

	const navigate = useNavigate()

	const handleClickNext = () => {
		navigate('/services')
	}

	// const handleWheel = (e) => {
	// 	if (e.deltaY > 0) {
	// 		handleClickNext()
	// 	}
	// }

	// useEffect(() => {
	// 	window.addEventListener('wheel', handleWheel)
	// 	return () => {
	// 		window.removeEventListener('wheel', handleWheel)
	// 	}
	// })

	return (
		<>
			<div className='home father'>
				<div className='container__home'>

					<div className='img__home'>
						<img src={architect} alt="engineer" />
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


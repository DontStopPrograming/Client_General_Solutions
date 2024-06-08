import './Home.css';
import '../../../src/index.css'

import architect from '../../assets/architect.png'
import arrow__down from '../../assets/arrow-down.png'

export const Home = () => {
	return (
		<>
			<div className='home father'>
				<div className='container__home'>

					<div className='img__home'>
						<img src={architect} alt="engineer" />
					</div>

					<div className='title'>
						<div className='title__home'>
							<h1> SERVICIOS <br /> Y SOLUCIONES <br /> GENERALES </h1>
						</div>

						<div className='subtitle__home'>
							<p> EXPERTOS EN SEGURIDAD CIVIL </p>
						</div>
					</div>

					<div className='img__home-down'>
						<img src={arrow__down} alt="arrow__down" />
					</div>
				</div>
			</div>
		</>
	);
};


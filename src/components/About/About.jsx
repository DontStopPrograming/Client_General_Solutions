import './About.css';

export const About = () => {
	return (
		<>
			<div className='container__about'>
				<section className='section_one_about'>
					<div className='container_title_about'>

						<div className='title_about'> <span className='title_line'> </span> <h2> ABOUT </h2> <span className='title_line'> </span> </div>

					</div>
					<div className='phrase_about'>
						<p> <span className='phrase_about_years'> 7 </span> Years of market expertise
							Providing swift and efficient licensing consultation solutions
						</p>

						<h1> We're here to ensure you obtain your Operating License and ITSE Certificate hassle-free <br />
							Civil security guaranteed
						</h1>

						<p> 100% Completely dedicated </p>

					</div>
				</section>

				<section className='section_two_about'>
					<div>
						<h2> Expert Preparation of Technical Documentation </h2>
						<p> Professional Technical Inspection by the National Institute of Civil Defense INDECI</p>
					</div>

					<div>
						<h2> Specialty Diagnostic Assessment and Recommendations </h2>
						<p> Physical Implementation in Compliance with National Building Regulations, National Electrical Code, and Standards</p>
					</div>

					<div>
						<h2> Surveying and Updating of Plans </h2>
						<p> Location, Architectural Design, Security Measures, Electrical, and Plumbing Installations </p>
					</div>

					<div>
						<h2> Security Plan Design and Development</h2>
						<p> Risk Assessment, Response Plans, and Contingency Planning </p>
					</div>

				</section>

			</div>
		</>
	);
};


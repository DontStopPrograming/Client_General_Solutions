import { useRef, useEffect, useState } from 'react';
import './About.css';

export const About = () => {
	const cardsRef = useRef([]);
	const containerRef = useRef(null);
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const cardContents = [
		{
			title: "Streamlined Licensing Process",
			content: "Simplify the process, making it quick and efficient. Our consultants collaborate with you to overcome obstacles, ensuring a seamless experience.",
		},
		{
			title: "Civil Security and Protection",
			content: "Prioritize your safety and protection. Our experts work closely with you to ensure a secure and confidential process, giving you peace of mind.",
		},
		{
			title: "Client-Centric Approach",
			content: "Dedicated to your success. Our consultants provide exceptional service to help you achieve your goals. We support you every step, ensuring the best outcome.",
		}
	];

	return (
		<div className='about'>
			<div className='container__about' ref={containerRef}>
				<section className='section_one_about'>
					<div className='container_title_about'>
						<div className='title_about'>
							<span className='title_line'> </span>
							<h2> ABOUT </h2>
							<span className='title_line'> </span>
						</div>
					</div>

					<div className='phrase_about'>
						<p>
							<span className='phrase_about_years'> 7 </span> Years of market expertise <br />
							Providing swift and efficient licensing
						</p>
						<h1>
							We're here to ensure you obtain your Operating License and ITSE Certificate hassle-free <br />
							Civil security guaranteed
						</h1>
						<p> 100% Completely dedicated </p>
						<p> Our team helps businesses obtain necessary licenses and certifications, ensuring safe and efficient operations.</p>
					</div>
				</section>
			</div>

			<section className='section_two_about'>
				{cardContents.map((card, index) => (
					<div
						className='card_about'
						key={index}
						ref={(el) => (cardsRef.current[index] = el)}
					>
						<h2>{card.title}</h2>
						<p>{card.content}</p>
					</div>
				))}
			</section>
		</div>
	);
};

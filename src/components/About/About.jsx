import { useRef, useCallback, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './About.css';

export const About = () => {
	const cardsRef = useRef([]);
	const containerRef = useRef(null);
	const activeCardIndex = useRef(null);
	const isAnimating = useRef(false);
	const animationTimeout = useRef(null);
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
	const [activeImage, setActiveImage] = useState(null);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleMouseEnter = (index) => {
		if (isSmallScreen || isAnimating.current || index === activeCardIndex.current) return;

		const card = cardsRef.current[index];
		activeCardIndex.current = index;
		isAnimating.current = true;

		// Set the active image based on the card
		setActiveImage(cardContents[index].image);

		// Clear any previous deactivation timer
		if (animationTimeout.current) {
			clearTimeout(animationTimeout.current);
			animationTimeout.current = null;
		}

		// Adding the class 'active' to current card and 'inactive' the others
		cardsRef.current.forEach((c, i) => {
			if (i === index) {
				c.classList.add('active');
			} else {
				c.classList.add('inactive');
			}
		});

		if (!isSmallScreen) {
			// Only execute animations if the screen is not small
			gsap.to(card, {
				duration: 0.5,
				scale: 1.2,
				zIndex: 1,
				fontSize: '1.2rem',
				top: '50%',
				left: '50%',
				xPercent: 0,
				yPercent: -40,
				ease: 'power3.out',
				onComplete: () => {
					document.addEventListener('mousemove', handleMouseMove);
				}
			});

			gsap.to(containerRef.current, {
				duration: 0.5,
				opacity: 0,
				ease: 'power3.out'
			});
		}
	};

	const handleMouseLeave = useCallback(() => {
		if (activeCardIndex.current === null) return;

		const activeCard = cardsRef.current[activeCardIndex.current];
		if (activeCard) {
			if (!isSmallScreen) {
				gsap.to(activeCard, {
					duration: 0.5,
					scale: 1,
					zIndex: 0,
					fontSize: '1rem',
					top: '0%',
					left: '0%',
					xPercent: 0,
					yPercent: 0,
					ease: 'power3.out',
					onComplete: () => {
						isAnimating.current = false;
						activeCard.classList.remove('active');
						activeCardIndex.current = null;
						document.removeEventListener('mousemove', handleMouseMove);
					}
				});
			} else {
				isAnimating.current = false;
				activeCard.classList.remove('active');
				activeCardIndex.current = null;
				document.removeEventListener('mousemove', handleMouseMove);
			}
		}

		// Remove the class 'inactive' from all cards
		cardsRef.current.forEach((c) => {
			c.classList.remove('inactive');
		});

		// Quitar la imagen activa
		setActiveImage(null);

		if (!isSmallScreen) {
			gsap.to(containerRef.current, {
				duration: 0.5,
				opacity: 1,
				ease: 'power3.out'
			});
		}
	}, [isSmallScreen]);

	const handleMouseMove = useCallback((event) => {
		const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
		const isHoveredCard = Array.from(cardsRef.current).some((card) => card.contains(hoveredElement));

		// If the mouse is not over the card, initial the template for disabled the animation
		if (!isHoveredCard) {
			if (animationTimeout.current) {
				clearTimeout(animationTimeout.current);
			}
			animationTimeout.current = setTimeout(() => {
				handleMouseLeave();
			}, 2000);
		}
	}, [handleMouseLeave]);

	const cardContents = [
		{
			title: "Streamlined Licensing Process",
			content: "Simplify the process, making it quick and efficient. Our consultants collaborate with you to overcome obstacles, ensuring a seamless experience.",
			image: "../src/assets/licen.png"
		},
		{
			title: "Civil Security and Protection",
			content: "Prioritize your safety and protection. Our experts work closely with you to ensure a secure and confidential process, giving you peace of mind.",
			image: "../src/assets/goou.png"
		},
		{
			title: "Client-Centric Approach",
			content: "Dedicated to your success. Our consultants provide exceptional service to help you achieve your goals. We support you every step, ensuring the best outcome.",
			image: "../src/assets/excepti.png"
		}
	];

	return (
		<>
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
							onMouseEnter={() => handleMouseEnter(index)}
							onMouseLeave={() => handleMouseLeave()}
						>
							<h2>{card.title}</h2>
							<p>{card.content}</p>
						</div>
					))}
				</section>

				{activeImage && (
					<div className='active_image_container'>
						<img src={activeImage} alt="Active Card" />
					</div>
				)}
			</div>
		</>
	);
};

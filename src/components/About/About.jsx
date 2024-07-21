import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import './About.css';

export const About = () => {
	const cardsRef = useRef([]);
	const containerRef = useRef(null);
	const activeCardIndex = useRef(null);
	const isAnimating = useRef(false);
	const animationTimeout = useRef(null);

	const handleMouseEnter = (index) => {
		if (isAnimating.current || index === activeCardIndex.current) return;

		const card = cardsRef.current[index];
		activeCardIndex.current = index;
		isAnimating.current = true;

		// Limpiar cualquier temporizador de desactivación anterior
		if (animationTimeout.current) {
			clearTimeout(animationTimeout.current);
			animationTimeout.current = null;
		}

		// Añadir la clase 'active' al card actual y 'inactive' a los demás
		cardsRef.current.forEach((c, i) => {
			if (i === index) {
				c.classList.add('active');
			} else {
				c.classList.add('inactive');
			}
		});

		gsap.to(card, {
			duration: 0.4, // Ajustar duración para una animación más rápida
			scale: 1.2,
			zIndex: 1,
			fontSize: '1.5rem',
			top: '50%',
			left: '50%',
			xPercent: 0,
			yPercent: -50,
			ease: 'power2.out',
			onComplete: () => {
				document.addEventListener('mousemove', handleMouseMove);
			}
		});

		gsap.to(containerRef.current, {
			duration: 0.4, // Ajustar duración para una animación más rápida
			opacity: 0,
			ease: 'power2.out'
		});
	};

	const handleMouseLeave = useCallback(() => {
		if (activeCardIndex.current === null) return;

		const activeCard = cardsRef.current[activeCardIndex.current];
		if (activeCard) {
			gsap.to(activeCard, {
				duration: 0.4, // Ajustar duración para una animación más rápida
				scale: 1,
				zIndex: 0,
				fontSize: '1rem',
				top: '0%',
				left: '0%',
				xPercent: 0,
				yPercent: 0,
				ease: 'power2.out',
				onComplete: () => {
					isAnimating.current = false;
					activeCard.classList.remove('active');
					activeCardIndex.current = null;
					document.removeEventListener('mousemove', handleMouseMove);
				}
			});
		}

		// Remover la clase 'inactive' de todos los cards
		cardsRef.current.forEach((c) => {
			c.classList.remove('inactive');
		});

		gsap.to(containerRef.current, {
			duration: 0.4, // Ajustar duración para una animación más rápida
			opacity: 1,
			ease: 'power2.out'
		});
	}, []);

	const handleMouseMove = useCallback((event) => {
		const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
		const isHoveredCard = Array.from(cardsRef.current).some((card) => card.contains(hoveredElement));

		// Si el mouse no está sobre un card, iniciar un temporizador para desactivar la animación
		if (!isHoveredCard) {
			if (animationTimeout.current) {
				clearTimeout(animationTimeout.current);
			}
			animationTimeout.current = setTimeout(() => {
				handleMouseLeave();
			}, 1000); // Reducir el tiempo de espera para una respuesta más rápida
		}
	}, [handleMouseLeave]);

	const cardContents = [
		{
			title: "Streamlined Licensing Process",
			content: "Simplify the process, making it quick and efficient. Our consultants collaborate with you to overcome obstacles, ensuring a seamless experience."
		},
		{
			title: "Civil Security and Protection",
			content: "Prioritize your safety and protection. Our experts work closely with you to ensure a secure and confidential process, giving you peace of mind."
		},
		{
			title: "Client-Centric Approach",
			content: "Dedicated to your success. Our consultants provide exceptional service to help you achieve your goals. We support you every step, ensuring the best outcome."
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
								<span className='phrase_about_years'> 7 </span> Years of market expertise
								Providing swift and efficient licensing consultation solutions
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
			</div>
		</>
	);
};

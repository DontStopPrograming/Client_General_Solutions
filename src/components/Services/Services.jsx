import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Services.css';

import professional from '../../assets/professional.jpeg';
import diagnostic from '../../assets/diagnostic.jpeg';
import surveying from '../../assets/surveying.jpeg';
import security from '../../assets/security.jpeg';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const style = {
	position: 'absolute',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)',
	width: '70%',
	height: '70%',
	padding: '20px',
	background: '#010812',
	border: '1px solid #ffffffde',
	display: 'grid',
	gridTemplateAreas: `
    "title image1"
    "description image2"`,
	gridTemplateColumns: '1fr 1fr',
	gridTemplateRows: 'auto auto',
	gap: '10px',
};

const images = [
	{
		label: 'PROFESSIONALS',
		imgPath: professional,
		modalContent: {
			title: 'Expert Preparation of Technical Documentation',
			description: 'Professional Technical Inspection by the National Institute of Civil Defense INDECI. Professional technical inspections are conducted by the National Institute of Civil Defense (INDECI). This process involves meticulous preparation of technical documents, ensuring that every aspect of the inspection adheres to national safety and compliance standards. Detailed reports and documentation are produced to certify that all safety protocols and regulations are thoroughly met, providing a reliable and professional validation of the facilitys preparedness and structural integrity.',
			images: [professional, professional],
		}
	},
	{
		label: 'DIAGNOSTIC',
		imgPath: diagnostic,
		modalContent: {
			title: 'Specialty Diagnostic Assessment and Recommendations',
			description: 'Physical Implementation in Compliance with National Building Regulations. In this phase, detailed physical implementation is carried out, strictly adhering to national building regulations and the electrical code. Each aspect of the installations is evaluated to ensure compliance with the highest standards of quality and safety. Recommendations are based on specialized diagnostics, ensuring that all improvements and updates not only meet regulations but also optimize performance and safety of the facilities. This comprehensive approach guarantees that all systems function harmoniously and efficiently.',
			images: [diagnostic, diagnostic],
		}
	},
	{
		label: 'INSTALLATIONS',
		imgPath: surveying,
		modalContent: {
			title: 'Surveying and Updating of Plans',
			description: 'Location, Architectural Design, Security Measures. A comprehensive site survey is conducted, considering every detail of the location and existing architectural design. This analysis includes a complete review of implemented security measures as well as electrical and plumbing installations. Updating the plans ensures that all structures and systems comply with current regulations and optimizes their functionality. This process ensures that the facilities are prepared for any inspection and operate efficiently and safely.',
			images: [surveying, surveying],
		}
	},
	{
		label: 'SECURITY',
		imgPath: security,
		modalContent: {
			title: 'Security Plan Design and Development',
			description: 'Risk Assessment, Response Plans, and Contingency Planning. Risk assessment begins with a thorough analysis of all potential threats and vulnerabilities present. Using this information, tailored response strategies are developed for each identified risk. Additionally, specific contingency plans are created for various emergency situations, ensuring comprehensive preparedness. This process not only aims to protect physical and human assets but also ensures operational continuity in any eventuality.',
			images: [security, security],
		}
	},
];

export const Services = () => {
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = images.length;
	const [open, setOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
	const handleStepChange = (step) => setActiveStep(step);

	const handleImageClick = (image) => {
		setSelectedImage(image);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	return (
		<>
			<div className='services father'>
				<div className='container__services'>
					<div className='title_services'> <h2>SERVICES</h2> </div>

					<div className='carousel_services'>
						<Box sx={{ maxWidth: 400, flexGrow: 1 }}>
							<Paper
								square
								elevation={0}
								sx={{
									display: 'flex',
									alignItems: 'center',
									height: 60,
									pl: 2,
									bgcolor: 'black',
									color: '#ff914d',
									border: '1px solid #213547',
								}}
							>
								<Typography>{images[activeStep].label}</Typography>
							</Paper>
							<AutoPlaySwipeableViews
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={activeStep}
								onChangeIndex={handleStepChange}
								enableMouseEvents
							>
								{images.map((step, index) => (
									<div key={step.label}>
										{Math.abs(activeStep - index) <= 2 ? (
											<Box
												component="img"
												sx={{

													display: 'block',
													maxWidth: '100%',
													overflow: 'hidden',
													width: '100%',
													height: '330px',
													cursor: 'pointer',

												}}
												src={step.imgPath}
												alt={step.label}
												onClick={() => handleImageClick(step)}
											/>
										) : null}
									</div>
								))}
							</AutoPlaySwipeableViews>
							<MobileStepper
								steps={maxSteps}
								position="static"
								activeStep={activeStep}
								nextButton={
									<Button
										size="small"
										onClick={handleNext}
										disabled={activeStep === maxSteps - 1}
										sx={{
											color: '#ff914d',

										}}
									>
										Next
										{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
									</Button>
								}
								backButton={
									<Button size="small" onClick={handleBack} disabled={activeStep === 0}
										sx={{ color: '#ff914d' }}>
										{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
										Back
									</Button>
								}
							/>
						</Box>
					</div>

					<div className='modal_services'>
						<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							open={open}
							onClose={handleClose}
							closeAfterTransition
							slots={{ backdrop: Backdrop }}
							slotProps={{ backdrop: { timeout: 800 } }}


						>
							<Fade in={open}>
								<Box sx={style}>
									<Typography id="transition-modal-title" variant="h6" component="h2" sx={{ color: '#ffffffde', gridArea: 'title', padding: '50px', fontSize: '1.5rem' }}>
										{selectedImage?.modalContent?.title}
									</Typography>
									<Box sx={{
										gridArea: 'image1',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',


									}}>
										<img
											src={selectedImage?.modalContent?.images[0]}
											alt="Modal Image 1"
											style={{
												width: '300px',
												height: '200px',
												borderRadius: '20px',
											}}
										/>
									</Box>
									<Typography id="transition-modal-description" sx={{ color: '#ffffffde', gridArea: 'description', padding: '50px', mt: 1, fontSize: '1rem' }}>
										{selectedImage?.modalContent?.description}
									</Typography>
									<Box sx={{ gridArea: 'image2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<img
											src={selectedImage?.modalContent?.images[1]}
											alt="Modal Image 2"
											style={{
												width: '300px',
												height: '200px',
												borderRadius: '20px',
											}}
										/>
									</Box>
								</Box>
							</Fade>
						</Modal>
					</div>

					<div className='phrase_services'>
						<h1>Your safety is <br /> our top priority</h1>
					</div>
				</div>
			</div>
		</>
	);
};

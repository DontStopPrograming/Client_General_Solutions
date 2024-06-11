import { useState } from 'react'
import './Services.css';

import professional from '../../assets/professional.jpeg'
import diagnostic from '../../assets/diagnostic.jpeg'
import surveying from '../../assets/surveying.jpeg'
import security from '../../assets/security.jpeg'

/* These import statements are importing various components and utilities from Material-UI and
react-swipeable-views libraries. Here is a breakdown of what each import is doing: */
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

/* These import statements are importing components from the Material-UI library. Here is a breakdown
of what each component does: */
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Padding } from '@mui/icons-material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 300,
	height: 200,
	bgcolor: '#010812',
	color: '#ffffffde',
	// bgcolor: 'background.paper',
	border: '2px solid #ff914d',
	boxShadow: 24,
	p: 4,
};

/* The `images` constant is an array of objects that contains information about different images. Each
object in the array represents a specific image and includes the following properties: */
const images = [
	{
		label: 'PROFESSIONALS',
		imgPath:
			professional,
		modalContent: {
			title: 'Expert Preparation of Technical Documentation',
			description: 'Professional Technical Inspection by the National Institute of Civil Defense INDECI',

		}
	},
	{
		label: 'DIAGNOSTIC',
		imgPath:
			diagnostic,
		modalContent: {
			title: 'Specialty Diagnostic Assessment and Recommendations',
			description: 'Physical Implementation in Compliance with National Building Regulations, National Electrical Code, and Standards',

		}
	},
	{
		label: 'INSTALLATIONS',
		imgPath:
			surveying,
		modalContent: {
			title: 'Surveying and Updating of Plans',
			description: 'Location, Architectural Design, Security Measures, Electrical, and Plumbing Installations',

		}
	},
	{
		label: 'SECURITY',
		imgPath:
			security,
		modalContent: {
			title: 'Security Plan Design and Development',
			description: 'Risk Assessment, Response Plans, and Contingency Planning',

		}
	},
];

export const Services = () => {

	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = images.length;

	const [open, setOpen] = useState(false)
	const [selectedImage, setSelectedImage] = useState(null)

	/**
	 * The handleNext function increases the active step by 1 in a React component.
	 */
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	/**
	 * The function `handleBack` decreases the value of `activeStep` by 1.
	 */
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	/**
	 * The handleStepChange function sets the active step to the specified step.
	 */
	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	/**
	 * The function `handleImageClick` sets the selected image and opens a modal.
	 */
	const handleImageClick = (image) => {
		setSelectedImage(image)
		setOpen(true)
	}

	/**
	 * The `handleClose` function sets the `open` state to `false`.
	 */
	const handleClose = () => {
		setOpen(false)
	}

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
									height: 50,
									pl: 2,
									bgcolor: 'black',
									color: '#ff914d',
									border: '1px solid #ff914d',
									// bgcolor: 'background.default',
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
													height: 'auto',
													display: 'block',
													maxWidth: '100%',
													overflow: 'hidden',
													width: '100%',
													height: '300px',
													cursor: 'pointer'
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
										{theme.direction === 'rtl' ? (
											<KeyboardArrowLeft />
										) : (
											<KeyboardArrowRight />
										)}
									</Button>
								}
								backButton={
									<Button size="small" onClick={handleBack} disabled={activeStep === 0}
										sx={{
											color: '#ff914d',
										}}>
										{theme.direction === 'rtl' ? (
											<KeyboardArrowRight />
										) : (
											<KeyboardArrowLeft />
										)}
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
							slotProps={{
								backdrop: {
									timeout: 500,
								},
							}}

						>

							<Fade in={open}>
								<Box sx={style}>
									<Typography id="transition-modal-title" variant="h6" component="h2">
										{selectedImage?.modalContent?.title}
									</Typography>
									<Typography id="transition-modal-description" sx={{ mt: 2 }}>
										{selectedImage?.modalContent?.description}
									</Typography>
									<Typography id="transition-modal-image" sx={{ mt: 2 }}>
										<img
										// src={selectedImage?.modalContent?.imgPath}
										// alt={selectedImage?.label}

										/>
									</Typography>
								</Box>
							</Fade>

						</Modal>
					</div>

					<div className='phrase_services'>
						<h1> Your safety is <br /> our top priority </h1>
					</div>

				</div>
			</div>
		</>
	)
}


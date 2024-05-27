import { useState } from 'react'
import './Services.css';

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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

/* The `images` constant is an array of objects that contains information about different images. Each
object in the array represents a specific image and includes the following properties: */
const images = [
	{
		label: 'San Francisco – Oakland Bay Bridge, United States',
		imgPath:
			'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
		modalContent: {
			title: 'San Francisco – Oakland Bay Bridge',
			description: 'This is the description for the San Francisco – Oakland Bay Bridge image.',
			imgPath:
				'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
		}
	},
	{
		label: 'Bird',
		imgPath:
			'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
		modalContent: {
			title: 'Bird',
			description: 'This is the description for the Bird image.',
			imgPath:
				'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
		}
	},
	{
		label: 'Bali, Indonesia',
		imgPath:
			'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
		modalContent: {
			title: 'Bali, Indonesia',
			description: 'This is the description for the Bali, Indonesia image.',
			imgPath:
				'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
		}
	},
	{
		label: 'Goč, Serbia',
		imgPath:
			'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
		modalContent: {
			title: 'Goč, Serbia',
			description: 'This is the description for the Goč, Serbia image.',
			imgPath:
				'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
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
			<div className='container__services'>
				<div className='title-services'> <h1>SERVICES</h1> </div>

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
								bgcolor: 'background.default',
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
								<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
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
									<img src={selectedImage?.modalContent?.imgPath} alt={selectedImage?.label} />
								</Typography>
							</Box>
						</Fade>

					</Modal>
				</div>

			</div>
		</>
	)
}


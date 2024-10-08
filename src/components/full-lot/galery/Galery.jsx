import { useRef, useState } from 'react';
import PanZoom from 'react-easy-panzoom';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';

import { IS_PRO } from '../../../app.constants';
import { usePlayer } from '../../../hooks/usePlayer';

import styles from './Galery.module.scss';

// const Galery = ({ lot }) => {
// 	const { isFullScreen } = useSelector(state => state.fullScreen);
// 	const {
// 		activeFullScreen,
// 		disableFullScreen,
// 		isPlaying,
// 		setIsPlaying,
// 		togglePlay,
// 	} = usePlayer();
// 	const videoRef = useRef();
// 	const [currentImageIndex, setCurrentImageIndex] = useState(0);

// 	const totalImages = lot.image.length;

// 	// Функция для смены изображения
// 	const handleImageChange = direction => {
// 		setCurrentImageIndex(prevIndex => {
// 			if (direction === 'next') {
// 				return prevIndex === totalImages - 1 ? 0 : prevIndex + 1;
// 			} else {
// 				return prevIndex === 0 ? totalImages - 1 : prevIndex - 1;
// 			}
// 		});
// 	};

// 	// Обработчики свайпов
// 	const handlers = useSwipeable({
// 		onSwipedLeft: () => handleImageChange('next'),
// 		onSwipedRight: () => handleImageChange('prev'),
// 	});

// 	return (
// 		<div
// 			className={isFullScreen ? styles.fullScreenSlider : styles.block__slider}
// 			onClick={() => {
// 				if (IS_PRO && !isFullScreen) {
// 					activeFullScreen();
// 				}
// 			}}
// 			{...handlers}
// 		>
// 			{isFullScreen && (
// 				<button
// 					className={styles.exit__fullScreen}
// 					onClick={() => {
// 						disableFullScreen();
// 						setIsPlaying(false);
// 					}}
// 				>
// 					<img src='/images/icons/buttons/close.svg' alt='Close' />
// 				</button>
// 			)}
// 			{lot.image[currentImageIndex].includes('.mp4') ? (
// 				<div className={styles.videoWrapper}>
// 					{/* Видео с кастомной кнопкой воспроизведения */}
// 					<video
// 						className={styles.fullScreenImage}
// 						ref={videoRef}
// 						onClick={() => togglePlay(videoRef)}
// 						onPlay={() => setIsPlaying(true)}
// 						onPause={() => setIsPlaying(false)}
// 						autoPlay={false}
// 						poster={lot.image[0]} // Превью для видео
// 					>
// 						<source src={lot.image[currentImageIndex]} type='video/mp4' />
// 						Your browser does not support the video tag.
// 					</video>
// 					{!isPlaying && IS_PRO && isFullScreen && (
// 						<div
// 							className={styles.playButtonOverlay}
// 							onClick={() => togglePlay(videoRef)}
// 						>
// 							<img
// 								src='/images/icons/buttons/play_video.svg'
// 								alt='Play video'
// 							/>
// 						</div>
// 					)}
// 				</div>
// 			) : (
// 				// <img
// 				// 	className={
// 				// 		!isFullScreen ? styles.image__slider : styles.fullScreenImage
// 				// 	}
// 				// 	src={lot.image[currentImageIndex]}
// 				// 	alt={`Image ${currentImageIndex + 1}`}
// 				// />
// 				// Добавляем компонент для зуммирования изображения
// 				<PinchZoomPan
// 					doubleTapZoom={2}
// 					minScale={1}
// 					maxScale={4}
// 					className={
// 						isFullScreen ? styles.fullScreenImage : styles.image__slider
// 					}
// 				>
// 					<img
// 						className={
// 							isFullScreen ? styles.fullScreenImage : styles.image__slider
// 						}
// 						src={lot.image[currentImageIndex]}
// 						alt={`Image ${currentImageIndex + 1}`}
// 					/>
// 				</PinchZoomPan>
// 			)}

// 			{isFullScreen && (
// 				<div className={styles.thumbnailSlider}>
// 					{lot.image.map((img, index) => (
// 						<div
// 							key={index}
// 							className={`${styles.container__image} ${
// 								currentImageIndex === index ? styles.activeThumbnail : ''
// 							}`}
// 							onClick={() => setCurrentImageIndex(index)}
// 						>
// 							<img
// 								className={styles.thumbnailImage}
// 								src={img.includes('.mp4') ? lot.image[0] : img}
// 								alt={`Thumbnail ${index + 1}`}
// 							/>
// 							{!isPlaying && IS_PRO && isFullScreen && img.includes('.mp4') && (
// 								<div
// 									className={styles.playButtonOverlay}
// 									style={{
// 										width: 'calc(20/412*100vw)',
// 										height: 'calc(20/412*100vw)',
// 									}}
// 								>
// 									<img
// 										src='/images/icons/buttons/play_video.svg'
// 										alt='Play video'
// 										style={{
// 											width: 'calc(20/412*100vw)',
// 											height: 'calc(20/412*100vw)',
// 										}}
// 									/>
// 								</div>
// 							)}
// 						</div>
// 					))}
// 				</div>
// 			)}
// 			<p
// 				className={styles.number__image}
// 				style={isFullScreen ? { display: 'none' } : {}}
// 			>
// 				{currentImageIndex + 1}/{totalImages}
// 			</p>
// 		</div>
// 	);
// };

const Galery = ({ lot }) => {
	const { isFullScreen } = useSelector(state => state.fullScreen);
	const {
		activeFullScreen,
		disableFullScreen,
		isPlaying,
		setIsPlaying,
		togglePlay,
	} = usePlayer();
	const videoRef = useRef();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const totalImages = lot.image.length;

	// Функция для смены изображения
	const handleImageChange = direction => {
		setCurrentImageIndex(prevIndex => {
			if (direction === 'next') {
				return prevIndex === totalImages - 1 ? 0 : prevIndex + 1;
			} else {
				return prevIndex === 0 ? totalImages - 1 : prevIndex - 1;
			}
		});
	};

	// Обработчики свайпов
	const handlers = useSwipeable({
		onSwipedLeft: () => handleImageChange('next'),
		onSwipedRight: () => handleImageChange('prev'),
		delta: 100, // Увеличиваем минимальное расстояние для распознавания свайпа
	});

	const preventPan = () => true; // Всегда предотвращает панорамирование

	return (
		<div
			className={isFullScreen ? styles.fullScreenSlider : styles.block__slider}
			onClick={() => {
				if (IS_PRO && !isFullScreen) {
					activeFullScreen();
				}
			}}
			{...handlers}
		>
			{isFullScreen && (
				<button
					className={styles.exit__fullScreen}
					onClick={() => {
						disableFullScreen();
						setIsPlaying(false);
					}}
				>
					<img src='/images/icons/buttons/close.svg' alt='Close' />
				</button>
			)}
			{lot.image[currentImageIndex].includes('.mp4') ? (
				<div className={styles.videoWrapper}>
					{/* Видео с кастомной кнопкой воспроизведения */}
					<video
						className={styles.fullScreenImage}
						ref={videoRef}
						onClick={() => togglePlay(videoRef)}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
						autoPlay={false}
						poster={lot.image[0]} // Превью для видео
					>
						<source src={lot.image[currentImageIndex]} type='video/mp4' />
						Your browser does not support the video tag.
					</video>
					{!isPlaying && IS_PRO && isFullScreen && (
						<div
							className={styles.playButtonOverlay}
							onClick={() => togglePlay(videoRef)}
						>
							<img
								src='/images/icons/buttons/play_video.svg'
								alt='Play video'
							/>
						</div>
					)}
				</div>
			) : isFullScreen ? (
				<PanZoom
					zoomSpeed={1.2}
					minZoom={1}
					maxZoom={3}
					preventPan={preventPan}
				>
					<img
						className={
							isFullScreen ? styles.fullScreenImage : styles.image__slider
						}
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							zIndex: '100',
							width: 'calc(412/412*100vw)',
							height: 'calc(812/412*100vw)',
							transform: 'translateY(-50%)',
						}}
						src={lot.image[currentImageIndex]}
						alt={`Image ${currentImageIndex + 1}`}
					/>
				</PanZoom>
			) : (
				<img
					className={
						isFullScreen ? styles.fullScreenImage : styles.image__slider
					}
					src={lot.image[currentImageIndex]}
					alt={`Image ${currentImageIndex + 1}`}
				/>
			)}

			{isFullScreen && (
				<div className={styles.thumbnailSlider}>
					{lot.image.map((img, index) => (
						<div
							key={index}
							className={`${styles.container__image} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
							onClick={() => setCurrentImageIndex(index)}
						>
							<img
								className={styles.thumbnailImage}
								src={img.includes('.mp4') ? lot.image[0] : img}
								alt={`Thumbnail ${index + 1}`}
							/>
							{!isPlaying && IS_PRO && isFullScreen && img.includes('.mp4') && (
								<div
									className={styles.playButtonOverlay}
									style={{
										width: 'calc(20/412*100vw)',
										height: 'calc(20/412*100vw)',
									}}
								>
									<img
										src='/images/icons/buttons/play_video.svg'
										alt='Play video'
										style={{
											width: 'calc(20/412*100vw)',
											height: 'calc(20/412*100vw)',
										}}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			)}
			<p
				className={styles.number__image}
				style={isFullScreen ? { display: 'none' } : {}}
			>
				{currentImageIndex + 1}/{totalImages}
			</p>
		</div>
	);
};

export default Galery;

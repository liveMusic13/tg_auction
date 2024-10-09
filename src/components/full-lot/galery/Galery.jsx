import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';

import { IS_PRO } from '../../../app.constants';
import { usePlayer } from '../../../hooks/usePlayer';

import styles from './Galery.module.scss';

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
	const [scale, setScale] = useState(1); // Начальное значение для масштаба
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

	// Функция для изменения масштаба в реальном времени
	const handleZoomDuringSwipe = deltaY => {
		setScale(prevScale => {
			const newScale = prevScale - deltaY / 500; // Регулируем масштаб на основе свайпа
			return Math.max(1, Math.min(newScale, 3)); // Ограничение масштаба от 1 до 3
		});
	};

	// Обработчик для двойного клика, увеличивает до половины максимального масштаба
	const handleDoubleClick = () => {
		console.log('Double click detected!'); // Для отладки
		setScale(prevScale => (prevScale === 1.5 ? 1 : 1.5)); // Зум наполовину или сброс
	};

	// Обработчики свайпов с зумом в реальном времени
	const handlers = useSwipeable({
		onSwipedLeft: () => handleImageChange('next'),
		onSwipedRight: () => handleImageChange('prev'),
		// onSwiping: eventData => {
		// 	// Определяем, если свайп вверх/вниз и изменяем масштаб
		// 	if (eventData.dir === 'Up' || eventData.dir === 'Down') {
		// 		handleZoomDuringSwipe(eventData.deltaY);
		// 	}
		// },
		delta: 50, // Чувствительность к свайпу
	});

	const handlerZoom = useSwipeable({
		onSwiping: eventData => {
			// Определяем, если свайп вверх/вниз и изменяем масштаб
			if (eventData.dir === 'Up' || eventData.dir === 'Down') {
				handleZoomDuringSwipe(eventData.deltaY);
			}
		},
		delta: 50, // Чувствительность к свайпу
	});

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
				<div
					style={{
						overflow: 'hidden',
						transform: `scale(${scale})`,
						transition: 'transform 0.1s ease-in-out',
					}}
					onDoubleClick={handleDoubleClick} // Обрабатываем двойной клик
				>
					<img
						className={styles.fullScreenImage}
						src={lot.image[currentImageIndex]}
						alt={`Image ${currentImageIndex + 1}`}
						style={{
							transform: `scale(${scale})`, // Применяем масштабирование
							transition: 'transform 0.1s ease-in-out', // Плавная анимация изменения масштаба
						}}
						// onDoubleClick={handleDoubleClick} // Обрабатываем двойной клик
						{...handlerZoom}
					/>
				</div>
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

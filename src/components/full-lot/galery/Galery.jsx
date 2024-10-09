import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';

import { IS_PRO } from '../../../app.constants';
import { usePlayer } from '../../../hooks/usePlayer';
import { useZoom } from '../../../hooks/useZoom';

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
// 	const [scale, setScale] = useState(1); // Начальное значение для масштаба
// 	const [startDistance, setStartDistance] = useState(null); // Дистанция между пальцами в момент начала
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

// 	// // Функция для изменения масштаба в реальном времени
// 	// const handleZoomDuringSwipe = deltaY => {
// 	// 	setScale(prevScale => {
// 	// 		const newScale = prevScale - deltaY / 500; // Регулируем масштаб на основе свайпа
// 	// 		return Math.max(1, Math.min(newScale, 3)); // Ограничение масштаба от 1 до 3
// 	// 	});
// 	// };

// 	// Обработчик для двойного клика, увеличивает до половины максимального масштаба
// 	const handleDoubleClick = () => {
// 		console.log('Double click detected!'); // Для отладки
// 		setScale(prevScale => (prevScale === 1.5 ? 1 : 1.5)); // Зум наполовину или сброс
// 	};

// 	// Вычисление расстояния между двумя пальцами
// 	const getDistance = (touch1, touch2) => {
// 		const deltaX = touch1.clientX - touch2.clientX;
// 		const deltaY = touch1.clientY - touch2.clientY;
// 		return Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Расстояние по теореме Пифагора
// 	};

// 	const handleTouchStart = e => {
// 		if (e.touches.length === 2) {
// 			// Если есть два касания, запоминаем начальное расстояние между пальцами
// 			const distance = getDistance(e.touches[0], e.touches[1]);
// 			setStartDistance(distance);
// 		}
// 	};
// 	const handleTouchMove = e => {
// 		if (e.touches.length === 2 && startDistance) {
// 			// Если есть два касания и мы начали отслеживание зума
// 			const newDistance = getDistance(e.touches[0], e.touches[1]);
// 			const scaleChange = newDistance / startDistance; // Соотношение новых и старых координат

// 			setScale(prevScale => {
// 				const newScale = prevScale * scaleChange; // Обновляем масштаб на основе разницы
// 				return Math.max(1, Math.min(newScale, 3)); // Ограничение масштаба от 1 до 3
// 			});

// 			setStartDistance(newDistance); // Обновляем дистанцию для следующего расчета
// 		}
// 	};
// 	const handleTouchEnd = () => {
// 		// Сброс при завершении касания
// 		setStartDistance(null);
// 	};

// 	// Обработчики свайпов с зумом в реальном времени
// 	const handlers = useSwipeable({
// 		onSwipedLeft: () => handleImageChange('next'),
// 		onSwipedRight: () => handleImageChange('prev'),
// 		// onSwiping: eventData => {
// 		// 	// Определяем, если свайп вверх/вниз и изменяем масштаб
// 		// 	if (eventData.dir === 'Up' || eventData.dir === 'Down') {
// 		// 		handleZoomDuringSwipe(eventData.deltaY);
// 		// 	}
// 		// },
// 		delta: 50, // Чувствительность к свайпу
// 	});

// 	// const handlerZoom = useSwipeable({
// 	// 	onSwiping: eventData => {
// 	// 		// Определяем, если свайп вверх/вниз и изменяем масштаб
// 	// 		if (eventData.dir === 'Up' || eventData.dir === 'Down') {
// 	// 			handleZoomDuringSwipe(eventData.deltaY);
// 	// 		}
// 	// 	},
// 	// 	delta: 50, // Чувствительность к свайпу
// 	// });

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
// 			) : isFullScreen ? (
// 				<div
// 					style={{
// 						transform: `scale(${scale})`,
// 					}}
// 					className={styles.block__image_fullscreen}
// 					onDoubleClick={handleDoubleClick} // Обрабатываем двойной клик
// 				>
// 					<img
// 						className={styles.fullScreenImage}
// 						src={lot.image[currentImageIndex]}
// 						alt={`Image ${currentImageIndex + 1}`}
// 						style={{
// 							transform: `scale(${scale})`, // Применяем масштабирование
// 							transition: 'transform 0.1s ease-in-out', // Плавная анимация изменения масштаба
// 						}}
// 						// onDoubleClick={handleDoubleClick} // Обрабатываем двойной клик
// 						// {...handlerZoom}
// 						onTouchStart={handleTouchStart} // Начало касания
// 						onTouchMove={handleTouchMove} // Движение пальцев
// 						onTouchEnd={handleTouchEnd} // Конец касания
// 					/>
// 				</div>
// 			) : (
// 				<img
// 					className={
// 						isFullScreen ? styles.fullScreenImage : styles.image__slider
// 					}
// 					src={lot.image[currentImageIndex]}
// 					alt={`Image ${currentImageIndex + 1}`}
// 				/>
// 			)}

// 			{isFullScreen && (
// 				<div className={styles.thumbnailSlider}>
// 					{lot.image.map((img, index) => (
// 						<div
// 							key={index}
// 							className={`${styles.container__image} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
// 							onClick={() => setCurrentImageIndex(index)}
// 						>
// 							<img
// 								className={styles.thumbnailImage}
// 								src={img.includes('.mp4') ? lot.image[0] : img}
// 								alt={`Thumbnail ${index + 1}`}
// 							/>
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
	// const [startDistance, setStartDistance] = useState(null); // Дистанция между пальцами в момент начала
	const totalImages = lot.image.length;
	const {
		currentImageIndex,
		handleDoubleClick,
		handleImageChange,
		handleTouchEnd,
		handleTouchMove,
		handleTouchStart,
		isSwipeDisabled,
		resetPosition,
		scale,
		position,
		setCurrentImageIndex,
	} = useZoom(totalImages);

	useEffect(() => {
		if (scale === 1) resetPosition();
	}, [scale]);

	// Обработчики свайпов с зумом в реальном времени
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (scale === 1 || !isSwipeDisabled) handleImageChange('next');
		},
		onSwipedRight: () => {
			if (scale === 1 || !isSwipeDisabled) handleImageChange('prev');
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
						transform: `scale(${scale})`,
					}}
					className={styles.block__image_fullscreen}
					onDoubleClick={handleDoubleClick} // Обрабатываем двойной клик
					onTouchStart={handleTouchStart} // Начало касания
					onTouchMove={handleTouchMove} // Движение пальцев
					onTouchEnd={handleTouchEnd} // Конец касания
				>
					<img
						className={styles.fullScreenImage}
						src={lot.image[currentImageIndex]}
						alt={`Image ${currentImageIndex + 1}`}
						style={{
							transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
							transition: 'transform 0.1s ease-in-out', // Плавная анимация изменения масштаба
						}}
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

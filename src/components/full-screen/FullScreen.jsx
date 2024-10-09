import { useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useZoom } from '../../hooks/useZoom';

import styles from './FullScreen.module.scss';

// const FullScreen = ({ disableFullScreen, images }) => {
// 	const [currentImageIndex, setCurrentImageIndex] = useState(0);
// 	const [scale, setScale] = useState(1); // Начальное значение для масштаба
// 	const totalImages = images.length;
// 	// Обработчик для двойного клика, увеличивает до половины максимального масштаба
// 	const handleDoubleClick = () => {
// 		console.log('Double click detected!'); // Для отладки
// 		setScale(prevScale => (prevScale === 1.5 ? 1 : 1.5)); // Зум наполовину или сброс
// 	};
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

// 	// Функция для изменения масштаба в реальном времени
// 	const handleZoomDuringSwipe = deltaY => {
// 		setScale(prevScale => {
// 			const newScale = prevScale - deltaY / 500; // Регулируем масштаб на основе свайпа
// 			return Math.max(1, Math.min(newScale, 3)); // Ограничение масштаба от 1 до 3
// 		});
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

// 	const handlerZoom = useSwipeable({
// 		onSwiping: eventData => {
// 			// Определяем, если свайп вверх/вниз и изменяем масштаб
// 			if (eventData.dir === 'Up' || eventData.dir === 'Down') {
// 				handleZoomDuringSwipe(eventData.deltaY);
// 			}
// 		},
// 		delta: 50, // Чувствительность к свайпу
// 	});

// 	return (
// 		<div className={styles.fullScreenSlider} {...handlers}>
// 			<button
// 				className={styles.exit__fullScreen}
// 				onClick={() => disableFullScreen()}
// 			>
// 				<img src='/images/icons/buttons/close.svg' alt='Close' />
// 			</button>
// 			<div
// 				style={{
// 					overflow: 'hidden',
// 					transform: `scale(${scale})`,
// 					transition: 'transform 0.1s ease-in-out',
// 				}}
// 				onDoubleClick={handleDoubleClick} // Обрабатываем двойной клик

// 			>
// 				<img
// 					className={styles.fullScreenImage}
// 					src={images[currentImageIndex]}
// 					alt={`Image ${currentImageIndex + 1}`}
// 					style={{
// 						transform: `scale(${scale})`, // Применяем масштабирование
// 						transition: 'transform 0.1s ease-in-out', // Плавная анимация изменения масштаба
// 					}}
// 					{...handlerZoom}
// 				/>
// 			</div>
// 			<div className={styles.thumbnailSlider}>
// 				{images.map((img, index) => (
// 					<div
// 						key={index}
// 						className={`${styles.container__image} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
// 						onClick={() => setCurrentImageIndex(index)}
// 					>
// 						<img
// 							className={styles.thumbnailImage}
// 							src={img}
// 							alt={`Thumbnail ${index + 1}`}
// 						/>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

const FullScreen = ({ disableFullScreen, images }) => {
	const totalImages = images.length;
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
		setScale,
	} = useZoom(totalImages);

	useEffect(() => {
		if (scale === 1) resetPosition();
	}, [scale]);

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
		<div className={styles.fullScreenSlider} {...handlers}>
			<button
				className={styles.exit__fullScreen}
				onClick={() => disableFullScreen()}
			>
				<img src='/images/icons/buttons/close.svg' alt='Close' />
			</button>
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
					src={images[currentImageIndex]}
					alt={`Image ${currentImageIndex + 1}`}
					style={{
						transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
						transition: 'transform 0.1s ease-in-out', // Плавная анимация изменения масштаба
					}}
				/>
			</div>
			<div className={styles.thumbnailSlider}>
				{images.map((img, index) => (
					<div
						key={index}
						className={`${styles.container__image} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
						onClick={() => {
							setCurrentImageIndex(index);
							setScale(1);
							resetPosition();
						}}
					>
						<img
							className={styles.thumbnailImage}
							src={img}
							alt={`Thumbnail ${index + 1}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default FullScreen;

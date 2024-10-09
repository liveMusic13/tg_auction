import { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

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
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [scale, setScale] = useState(1); // Начальное значение для масштаба
	const [startDistance, setStartDistance] = useState(null); // Дистанция между пальцами в момент начала
	const [position, setPosition] = useState({ x: 0, y: 0 }); // Начальное положение изображения
	const [startPos, setStartPos] = useState(null); // Начальные координаты касания для передвижения картинки
	const [isSwipeDisabled, setIsSwipeDisabled] = useState(false); // Состояние для блокировки свайпа
	const totalImages = images.length;
	// Обработчик для двойного клика, увеличивает до половины максимального масштаба
	const handleDoubleClick = () => {
		setScale(prevScale => (prevScale === 1.5 ? 1 : 1.5)); // Зум наполовину или сброс
		setPosition({ x: 0, y: 0 });
	};
	// Функция для смены изображения
	const handleImageChange = direction => {
		setCurrentImageIndex(prevIndex => {
			if (direction === 'next') {
				return prevIndex === totalImages - 1 ? 0 : prevIndex + 1;
			} else {
				return prevIndex === 0 ? totalImages - 1 : prevIndex - 1;
			}
		});
		setScale(1); // Сбрасываем масштаб при смене изображения
	};

	// Вычисление расстояния между двумя пальцами
	const getDistance = (touch1, touch2) => {
		const deltaX = touch1.clientX - touch2.clientX;
		const deltaY = touch1.clientY - touch2.clientY;
		return Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Расстояние по теореме Пифагора
	};

	const handleTouchStart = e => {
		if (e.touches.length === 2) {
			// Если есть два касания, запоминаем начальное расстояние между пальцами
			const distance = getDistance(e.touches[0], e.touches[1]);
			setStartDistance(distance);
		} else if (e.touches.length === 1 && scale > 1) {
			// Начинаем отслеживание перемещения при увеличенном изображении
			setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
		}
	};
	const handleTouchMove = e => {
		if (e.touches.length === 2 && startDistance) {
			// Если есть два касания и мы начали отслеживание зума
			const newDistance = getDistance(e.touches[0], e.touches[1]);
			const scaleChange = newDistance / startDistance; // Соотношение новых и старых координат

			setScale(prevScale => {
				const newScale = prevScale * scaleChange; // Обновляем масштаб на основе разницы
				return Math.max(1, Math.min(newScale, 3)); // Ограничение масштаба от 1 до 3
			});

			setStartDistance(newDistance); // Обновляем дистанцию для следующего расчета
		} else if (e.touches.length === 1 && startPos && scale > 1) {
			// Перемещаем изображение при зуме
			const deltaX = e.touches[0].clientX - startPos.x;
			const deltaY = e.touches[0].clientY - startPos.y;

			setPosition(prevPosition => {
				const newPosX = prevPosition.x + deltaX;
				const newPosY = prevPosition.y + deltaY;

				// Проверяем видимость краёв картинки
				checkImageBounds(newPosX);

				return {
					x: newPosX,
					y: newPosY,
				};
			});

			setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
		}
	};
	const handleTouchEnd = () => {
		// Сброс при завершении касания
		setStartDistance(null);
		setStartPos(null);
	};

	const imageRef = useRef(null);
	// Функция для проверки видимости краёв картинки по оси X
	const checkImageBounds = posX => {
		if (!imageRef.current) return;

		const imageWidth = imageRef.current.clientWidth * scale;
		const screenWidth = window.innerWidth;

		// Если картинка выходит за пределы экрана по оси X, отключаем свайп
		if (
			imageWidth > screenWidth &&
			(posX > 0 || posX < screenWidth - imageWidth)
		) {
			setIsSwipeDisabled(true);
		} else {
			setIsSwipeDisabled(false);
		}
	};

	// // Обработчики свайпов с зумом в реальном времени
	// const handlers = useSwipeable({
	// 	onSwipedLeft: () => handleImageChange('next'),
	// 	onSwipedRight: () => handleImageChange('prev'),
	// 	delta: 50, // Чувствительность к свайпу
	// });
	// Обработчики свайпов с условием для зума
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
			>
				<img
					ref={imageRef}
					className={styles.fullScreenImage}
					src={images[currentImageIndex]}
					alt={`Image ${currentImageIndex + 1}`}
					style={{
						transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
						transition: 'transform 0.1s ease-in-out', // Плавная анимация изменения масштаба
					}}
					onTouchStart={handleTouchStart} // Начало касания
					onTouchMove={handleTouchMove} // Движение пальцев
					onTouchEnd={handleTouchEnd} // Конец касания
				/>
			</div>
			<div className={styles.thumbnailSlider}>
				{images.map((img, index) => (
					<div
						key={index}
						className={`${styles.container__image} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
						onClick={() => setCurrentImageIndex(index)}
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

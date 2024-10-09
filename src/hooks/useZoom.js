import { useState } from 'react';

export const useZoom = ({ totalImages }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [scale, setScale] = useState(1); // Начальное значение для масштаба
	const [startDistance, setStartDistance] = useState(null); // Дистанция между пальцами в момент начала
	const [position, setPosition] = useState({ x: 0, y: 0 }); // Начальное положение изображения
	const [startPos, setStartPos] = useState(null); // Начальные координаты касания для передвижения картинки
	const [isSwipeDisabled, setIsSwipeDisabled] = useState(false); // Состояние для блокировки свайпа

	const resetPosition = () => {
		setPosition({ x: 0, y: 0 });
	};

	const handleDoubleClick = () => {
		setScale(prevScale => (prevScale === 1.5 ? 1 : 1.5)); // Зум наполовину или сброс
		resetPosition();
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
		resetPosition();
	};

	// Ограничение смещения по оси X
	const calculateBoundedPositionX = (newPosX, scale) => {
		const screenWidth = window.innerWidth;
		const imageWidth = screenWidth * scale;

		if (imageWidth > screenWidth) {
			const maxOffsetX = (imageWidth - screenWidth) / 2; // Максимальное смещение
			return Math.min(Math.max(newPosX, -maxOffsetX), maxOffsetX); // Ограничиваем смещение
		} else {
			return 0; // Центрируем, если картинка меньше экрана
		}
	};

	// Ограничение смещения по оси Y
	const calculateBoundedPositionY = (newPosY, scale) => {
		const screenHeight = window.innerHeight;
		const imageHeight = screenHeight * scale;

		if (imageHeight > screenHeight) {
			const maxOffsetY = (imageHeight - screenHeight) / 2;
			return Math.min(Math.max(newPosY, -maxOffsetY), maxOffsetY);
		} else {
			return 0; // Центрируем, если картинка меньше экрана
		}
	};

	// Вычисление расстояния между двумя пальцами
	const getDistance = (touch1, touch2) => {
		const deltaX = touch1.clientX - touch2.clientX;
		const deltaY = touch1.clientY - touch2.clientY;
		return Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Расстояние по теореме Пифагора
	};

	// Обработчик для начала касания
	const handleTouchStart = e => {
		if (e.touches.length === 2) {
			// Если есть два касания, запоминаем начальное расстояние между пальцами
			const distance = getDistance(e.touches[0], e.touches[1]);
			setStartDistance(distance);
		} else if (e.touches.length === 1 && scale > 1) {
			// Начинаем отслеживание перемещения при увеличенном изображении
			setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
			setIsSwipeDisabled(true); // Отключаем свайп при увеличении
		}
	};
	const handleTouchMove = e => {
		if (e.touches.length === 2 && startDistance) {
			const newDistance = getDistance(e.touches[0], e.touches[1]);
			const scaleChange = newDistance / startDistance;

			setScale(prevScale => {
				const newScale = prevScale * scaleChange;
				return Math.max(1, Math.min(newScale, 3)); // Ограничиваем масштаб
			});

			setStartDistance(newDistance);
		} else if (e.touches.length === 1 && startPos && scale > 1) {
			const deltaX = e.touches[0].clientX - startPos.x;
			const deltaY = e.touches[0].clientY - startPos.y;

			setPosition(prevPosition => {
				const newPosX = calculateBoundedPositionX(
					prevPosition.x + deltaX,
					scale,
				);
				const newPosY = calculateBoundedPositionY(
					prevPosition.y + deltaY,
					scale,
				);
				return { x: newPosX, y: newPosY };
			});

			setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
			////////
			const screenWidth = window.innerWidth;
			const imageWidth = screenWidth * scale;
			const maxOffsetX = (imageWidth - screenWidth) / 2;

			// Проверяем, достигло ли изображение края экрана
			if (position.x === maxOffsetX || position.x === -maxOffsetX) {
				setIsSwipeDisabled(false); // Включаем свайп, если картинка достигла края
			} else {
				setIsSwipeDisabled(true); // Иначе блокируем свайп
			}
			/////////////
		}
	};
	// Обработчик для завершения касания
	const handleTouchEnd = () => {
		setStartDistance(null);
		setStartPos(null);
		if (scale === 1) {
			setIsSwipeDisabled(false); // Включаем свайп, если масштаб равен 1
		}
	};

	return {
		resetPosition,
		handleDoubleClick,
		handleTouchEnd,
		handleTouchMove,
		handleTouchStart,
		handleImageChange,
		isSwipeDisabled,
		currentImageIndex,
		scale,
		position,
		setCurrentImageIndex,
		setScale,
	};
};

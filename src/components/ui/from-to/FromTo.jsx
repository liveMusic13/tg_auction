import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from './FromTo.module.scss';

const FromTo = ({ data, setValue }) => {
	const { max, min, step = 1 } = data;

	const [startValue, setStartValue] = useState('от');
	const [endValue, setEndValue] = useState('до');

	// Флаги для отслеживания первого свайпа
	const [isStartSwiped, setIsStartSwiped] = useState(false);
	const [isEndSwiped, setIsEndSwiped] = useState(false);

	// Получение следующего или предыдущего значения с зацикливанием
	const getNextValue = (currentValue, direction, type) => {
		const isStart = type === 'start';
		const label = isStart ? 'от' : 'до';

		// Если текущие значения - это строки "от" или "до"
		if (currentValue === label) {
			return direction === 'up' ? min : max;
		}

		// Если текущее значение - минимальное или максимальное число
		if (direction === 'up') {
			return currentValue === max ? label : currentValue + step;
		} else {
			return currentValue === min ? label : currentValue - step;
		}
	};

	// Обработка свайпов для стартового значения
	const handleSwipeStart = direction => {
		setIsStartSwiped(true); // Свайп был выполнен
		const newValue = getNextValue(startValue, direction, 'start');
		setStartValue(newValue);
		setValue(prev => ({ ...prev, start: newValue })); // Обновляем значение в родительском компоненте
	};

	// Обработка свайпов для конечного значения
	const handleSwipeEnd = direction => {
		setIsEndSwiped(true); // Свайп был выполнен
		const newValue = getNextValue(endValue, direction, 'end');
		setEndValue(newValue);
		setValue(prev => ({ ...prev, end: newValue })); // Обновляем значение в родительском компоненте
	};

	const handlersStart = useSwipeable({
		onSwipedUp: () => handleSwipeStart('up'),
		onSwipedDown: () => handleSwipeStart('down'),
		swipeDuration: 500, // длительность свайпа в миллисекундах
		preventDefaultTouchmoveEvent: true, // предотвращает скролл страницы при свайпе
	});

	const handlersEnd = useSwipeable({
		onSwipedUp: () => handleSwipeEnd('up'),
		onSwipedDown: () => handleSwipeEnd('down'),
		swipeDuration: 500,
		preventDefaultTouchmoveEvent: true,
	});

	return (
		<div className={styles.rangeContainer}>
			<div {...handlersStart} className={styles.swipeable}>
				<div className={styles.nextValue}>
					{isStartSwiped ? getNextValue(startValue, 'down', 'start') : max}
				</div>
				<div className={styles.currentValue}>
					{isStartSwiped ? startValue : 'от'}
				</div>
				<div className={styles.nextValue}>
					{isStartSwiped ? getNextValue(startValue, 'up', 'start') : min}
				</div>
			</div>

			<div {...handlersEnd} className={styles.swipeable}>
				<div className={styles.nextValue}>
					{isEndSwiped ? getNextValue(endValue, 'down', 'end') : max}
				</div>
				<div className={styles.currentValue}>
					{isEndSwiped ? endValue : 'до'}
				</div>
				<div className={styles.nextValue}>
					{isEndSwiped ? getNextValue(endValue, 'up', 'end') : min}
				</div>
			</div>
		</div>
	);
};

export default FromTo;

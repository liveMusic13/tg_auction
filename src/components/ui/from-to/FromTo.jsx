import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from './FromTo.module.scss';

// const FromTo = ({ data, setValue }) => {
// 	const { max, min, step = 1 } = data;

// 	const [startValue, setStartValue] = useState('от');
// 	const [endValue, setEndValue] = useState('до');

// 	// Флаги для отслеживания первого свайпа
// 	const [isStartSwiped, setIsStartSwiped] = useState(false);
// 	const [isEndSwiped, setIsEndSwiped] = useState(false);

// 	// Получение следующего или предыдущего значения с зацикливанием
// 	const getNextValue = (currentValue, direction, type) => {
// 		const isStart = type === 'start';
// 		const label = isStart ? 'от' : 'до';

// 		// Если текущие значения - это строки "от" или "до"
// 		if (currentValue === label) {
// 			return direction === 'up' ? min : max;
// 		}

// 		// Если текущее значение - минимальное или максимальное число
// 		if (direction === 'up') {
// 			return currentValue === max ? label : currentValue + step;
// 		} else {
// 			return currentValue === min ? label : currentValue - step;
// 		}
// 	};

// 	// Обработка свайпов для стартового значения
// 	const handleSwipeStart = direction => {
// 		setIsStartSwiped(true); // Свайп был выполнен
// 		const newValue = getNextValue(startValue, direction, 'start');
// 		setStartValue(newValue);
// 		setValue(prev => ({ ...prev, start: newValue })); // Обновляем значение в родительском компоненте
// 	};

// 	// Обработка свайпов для конечного значения
// 	const handleSwipeEnd = direction => {
// 		setIsEndSwiped(true); // Свайп был выполнен
// 		const newValue = getNextValue(endValue, direction, 'end');
// 		setEndValue(newValue);
// 		setValue(prev => ({ ...prev, end: newValue })); // Обновляем значение в родительском компоненте
// 	};

// 	const handlersStart = useSwipeable({
// 		onSwipedUp: () => handleSwipeStart('up'),
// 		onSwipedDown: () => handleSwipeStart('down'),
// 		swipeDuration: 500, // длительность свайпа в миллисекундах
// 		preventDefaultTouchmoveEvent: true, // предотвращает скролл страницы при свайпе
// 	});

// 	const handlersEnd = useSwipeable({
// 		onSwipedUp: () => handleSwipeEnd('up'),
// 		onSwipedDown: () => handleSwipeEnd('down'),
// 		swipeDuration: 500,
// 		preventDefaultTouchmoveEvent: true,
// 	});

// 	return (
// 		<div className={styles.rangeContainer}>
// 			<div {...handlersStart} className={styles.swipeable}>
// 				<div className={styles.nextValue}>
// 					{isStartSwiped ? getNextValue(startValue, 'down', 'start') : max}
// 				</div>
// 				<div className={styles.currentValue}>
// 					{isStartSwiped ? startValue : 'от'}
// 				</div>
// 				<div className={styles.nextValue}>
// 					{isStartSwiped ? getNextValue(startValue, 'up', 'start') : min}
// 				</div>
// 			</div>

// 			<div {...handlersEnd} className={styles.swipeable}>
// 				<div className={styles.nextValue}>
// 					{isEndSwiped ? getNextValue(endValue, 'down', 'end') : max}
// 				</div>
// 				<div className={styles.currentValue}>
// 					{isEndSwiped ? endValue : 'до'}
// 				</div>
// 				<div className={styles.nextValue}>
// 					{isEndSwiped ? getNextValue(endValue, 'up', 'end') : min}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const FromTo = ({ data, setValue }) => {
// 	const { max, min, step = 1 } = data;
// 	const [startValue, setStartValue] = useState(min);
// 	const [endValue, setEndValue] = useState(max);
// 	const [isStartSwiped, setIsStartSwiped] = useState(false);
// 	const [isEndSwiped, setIsEndSwiped] = useState(false);

// 	const getNextValue = (currentValue, deltaY, type) => {
// 		const isStart = type === 'start';
// 		const label = isStart ? 'от' : 'до';
// 		const change = Math.round(deltaY / 10) * step; // Изменение значения в зависимости от длины свайпа

// 		if (currentValue === label) {
// 			return deltaY > 0 ? min : max;
// 		}

// 		let newValue = currentValue + change;
// 		if (newValue > max) newValue = max;
// 		if (newValue < min) newValue = min;

// 		if (isStart && newValue > endValue) newValue = endValue;
// 		if (!isStart && newValue < startValue) newValue = startValue;

// 		return newValue;
// 	};

// 	const handleSwipeStart = eventData => {
// 		setIsStartSwiped(true);
// 		const newValue = getNextValue(startValue, eventData.deltaY, 'start');
// 		setStartValue(newValue);
// 		setValue(prev => ({ ...prev, start: newValue }));
// 	};

// 	const handleSwipeEnd = eventData => {
// 		setIsEndSwiped(true);
// 		const newValue = getNextValue(endValue, eventData.deltaY, 'end');
// 		setEndValue(newValue);
// 		setValue(prev => ({ ...prev, end: newValue }));
// 	};

// 	const handlersStart = useSwipeable({
// 		onSwiped: handleSwipeStart,
// 		preventDefaultTouchmoveEvent: true,
// 	});
// 	const handlersEnd = useSwipeable({
// 		onSwiped: handleSwipeEnd,
// 		preventDefaultTouchmoveEvent: true,
// 	});

// 	return (
// 		<div className={styles.rangeContainer}>
// 			<div {...handlersStart} className={styles.swipeable}>
// 				<div className={styles.nextValue}>
// 					{isStartSwiped ? getNextValue(startValue, -10, 'start') : max}
// 				</div>
// 				<div className={styles.currentValue}>
// 					{isStartSwiped ? startValue : 'от'}
// 				</div>
// 				<div className={styles.nextValue}>
// 					{isStartSwiped ? getNextValue(startValue, 10, 'start') : min}
// 				</div>
// 			</div>
// 			<div {...handlersEnd} className={styles.swipeable}>
// 				<div className={styles.nextValue}>
// 					{isEndSwiped ? getNextValue(endValue, -10, 'end') : max}
// 				</div>
// 				<div className={styles.currentValue}>
// 					{isEndSwiped ? endValue : 'до'}
// 				</div>
// 				<div className={styles.nextValue}>
// 					{isEndSwiped ? getNextValue(endValue, 10, 'end') : min}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const FromTo = ({ data, setValue }) => {
// 	const { max, min, step = 1 } = data;
// 	const [startValue, setStartValue] = useState('от');
// 	const [endValue, setEndValue] = useState('до');
// 	const [isStartSwiped, setIsStartSwiped] = useState(false);
// 	const [isEndSwiped, setIsEndSwiped] = useState(false);

// 	const getNextValue = (currentValue, deltaY, type) => {
// 		const isStart = type === 'start';
// 		const label = isStart ? 'от' : 'до';
// 		const change = Math.round(deltaY / 50) * step; // Уменьшили коэффициент изменения

// 		if (currentValue === label) {
// 			return deltaY < 0 ? min : max;
// 		}

// 		let newValue = currentValue + change;
// 		if (newValue > max) newValue = max;
// 		if (newValue < min) newValue = min;

// 		if (isStart && newValue > endValue) newValue = endValue;
// 		if (!isStart && newValue < startValue) newValue = startValue;

// 		return newValue;
// 	};

// 	const handleSwipeStart = eventData => {
// 		setIsStartSwiped(true);
// 		const newValue = getNextValue(
// 			startValue === 'от' ? min : startValue,
// 			-eventData.deltaY,
// 			'start',
// 		);
// 		setStartValue(newValue);
// 		setValue(prev => ({ ...prev, start: newValue }));
// 	};

// 	const handleSwipeEnd = eventData => {
// 		setIsEndSwiped(true);
// 		const newValue = getNextValue(
// 			endValue === 'до' ? max : endValue,
// 			-eventData.deltaY,
// 			'end',
// 		);
// 		setEndValue(newValue);
// 		setValue(prev => ({ ...prev, end: newValue }));
// 	};

// 	const handlersStart = useSwipeable({
// 		onSwiped: handleSwipeStart,
// 		preventDefaultTouchmoveEvent: true,
// 	});
// 	const handlersEnd = useSwipeable({
// 		onSwiped: handleSwipeEnd,
// 		preventDefaultTouchmoveEvent: true,
// 	});

// 	return (
// 		<div className={styles.rangeContainer}>
// 			<div {...handlersStart} className={styles.swipeable}>
// 				<div className={styles.nextValue}>
// 					{isStartSwiped
// 						? getNextValue(startValue === 'от' ? min : startValue, 50, 'start')
// 						: max}
// 				</div>
// 				<div className={styles.currentValue}>
// 					{isStartSwiped ? startValue : 'от'}
// 				</div>
// 				<div className={styles.nextValue}>
// 					{isStartSwiped
// 						? getNextValue(startValue === 'от' ? min : startValue, -50, 'start')
// 						: min}
// 				</div>
// 			</div>
// 			<div {...handlersEnd} className={styles.swipeable}>
// 				<div className={styles.nextValue}>
// 					{isEndSwiped
// 						? getNextValue(endValue === 'до' ? max : endValue, 50, 'end')
// 						: max}
// 				</div>
// 				<div className={styles.currentValue}>
// 					{isEndSwiped ? endValue : 'до'}
// 				</div>
// 				<div className={styles.nextValue}>
// 					{isEndSwiped
// 						? getNextValue(endValue === 'до' ? max : endValue, -50, 'end')
// 						: min}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

const FromTo = ({ data, setValue }) => {
	const { max, min, step = 1 } = data;
	const [startValue, setStartValue] = useState('от');
	const [endValue, setEndValue] = useState('до');
	const [isStartSwiped, setIsStartSwiped] = useState(false);
	const [isEndSwiped, setIsEndSwiped] = useState(false);

	const getNextValue = (currentValue, deltaY, type) => {
		const isStart = type === 'start';
		const label = isStart ? 'от' : 'до';
		const change = Math.round(deltaY / 50) * step; // Уменьшили коэффициент изменения

		if (currentValue === label) {
			return deltaY < 0 ? min : max;
		}

		let newValue = currentValue + change;
		if (newValue > max) newValue = max;
		if (newValue < min) newValue = min;

		if (isStart && newValue > endValue) newValue = endValue;
		if (!isStart && newValue < startValue) newValue = startValue;

		return newValue;
	};

	const handleSwipeStart = eventData => {
		setIsStartSwiped(true);
		const newValue = getNextValue(
			startValue === 'от' ? min : startValue,
			-eventData.deltaY,
			'start',
		);
		setStartValue(newValue);
		setValue(prev => ({ ...prev, start: newValue }));
	};

	const handleSwipeEnd = eventData => {
		setIsEndSwiped(true);
		const newValue = getNextValue(
			endValue === 'до' ? max : endValue,
			-eventData.deltaY,
			'end',
		);
		setEndValue(newValue);
		setValue(prev => ({ ...prev, end: newValue }));
	};

	const handlersStart = useSwipeable({
		onSwiped: handleSwipeStart,
		preventDefaultTouchmoveEvent: true,
	});
	const handlersEnd = useSwipeable({
		onSwiped: handleSwipeEnd,
		preventDefaultTouchmoveEvent: true,
	});

	return (
		<div className={styles.rangeContainer}>
			<div {...handlersStart} className={styles.swipeable}>
				<div
					className={styles.nextValue}
					style={
						startValue === 'от' || startValue === min ? { opacity: 0 } : {}
					}
				>
					{isStartSwiped
						? getNextValue(startValue === 'от' ? min : startValue, -50, 'start')
						: max}
				</div>
				<div className={styles.currentValue}>
					{isStartSwiped ? startValue : 'от'}
				</div>
				<div className={styles.nextValue}>
					{isStartSwiped
						? getNextValue(startValue === 'от' ? min : startValue, 50, 'start')
						: min}
				</div>
			</div>
			<div {...handlersEnd} className={styles.swipeable}>
				<div className={styles.nextValue}>
					{isEndSwiped
						? getNextValue(endValue === 'до' ? max : endValue, -50, 'end')
						: max}
				</div>
				<div className={styles.currentValue}>
					{isEndSwiped ? endValue : 'до'}
				</div>
				<div
					className={styles.nextValue}
					style={endValue === 'до' || endValue === max ? { opacity: 0 } : {}}
				>
					{isEndSwiped
						? getNextValue(endValue === 'до' ? max : endValue, 50, 'end')
						: min}
				</div>
			</div>
		</div>
	);
};

export default FromTo;

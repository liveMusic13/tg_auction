import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from './FromTo.module.scss';

// const FromTo = ({ data, setValue }) => {
// 	const { max, min, step = 1 } = data;
// 	const [startValue, setStartValue] = useState('от');
// 	const [endValue, setEndValue] = useState('до');
// 	const [isStartSwiped, setIsStartSwiped] = useState(false);
// 	const [isEndSwiped, setIsEndSwiped] = useState(false);

// 	const getNextValue = (currentValue, deltaY, type) => {
// 		const isStart = type === 'start';
// 		const label = isStart ? 'от' : 'до';
// 		const change = Math.round(deltaY / 50) * step;

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

// 	const handleSwipingStart = eventData => {
// 		const newValue = getNextValue(
// 			startValue === 'от' ? min : startValue,
// 			-eventData.deltaY,
// 			'start',
// 		);
// 		setStartValue(newValue);
// 		setValue(prev => ({ ...prev, start: newValue }));
// 	};

// 	const handleSwipingEnd = eventData => {
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
// 		onSwiping: handleSwipingStart, // обновляем значения в процессе свайпа
// 		preventDefaultTouchmoveEvent: true,
// 	});

// 	const handlersEnd = useSwipeable({
// 		onSwiped: handleSwipeEnd,
// 		onSwiping: handleSwipingEnd, // обновляем значения в процессе свайпа
// 		preventDefaultTouchmoveEvent: true,
// 	});

// 	return (
// 		<div className={styles.rangeContainer}>
// 			<div {...handlersStart} className={styles.swipeable}>
// 				<div
// 					className={styles.nextValue}
// 					style={
// 						startValue === 'от' || startValue === min ? { opacity: 0 } : {}
// 					}
// 				>
// 					{getNextValue(startValue === 'от' ? min : startValue, -50, 'start')}
// 				</div>
// 				<div className={styles.currentValue}>{startValue}</div>
// 				<div
// 					className={styles.nextValue}
// 					// style={startValue !== max ? { opacity: 0 } : {}}
// 				>
// 					{getNextValue(startValue === 'от' ? min : startValue, 50, 'start')}
// 				</div>
// 			</div>
// 			<div {...handlersEnd} className={styles.swipeable}>
// 				<div
// 					className={styles.nextValue}
// 					// style={endValue !== min ? { opacity: 0 } : {}}
// 				>
// 					{getNextValue(endValue === 'до' ? max : endValue, -50, 'end')}
// 				</div>
// 				<div className={styles.currentValue}>{endValue}</div>
// 				<div
// 					className={styles.nextValue}
// 					style={endValue === 'до' || endValue === max ? { opacity: 0 } : {}}
// 				>
// 					{getNextValue(endValue === 'до' ? max : endValue, 50, 'end')}
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
		const change = Math.round(deltaY / 50) * step;

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

	const handleSwipingStart = eventData => {
		const newValue = getNextValue(
			startValue === 'от' ? min : startValue,
			-eventData.deltaY,
			'start',
		);
		setStartValue(newValue);
		setValue(prev => ({ ...prev, start: newValue }));
	};

	const handleSwipingEnd = eventData => {
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
		onSwiping: handleSwipingStart, // обновляем значения в процессе свайпа
		preventDefaultTouchmoveEvent: true,
	});

	const handlersEnd = useSwipeable({
		onSwiped: handleSwipeEnd,
		onSwiping: handleSwipingEnd, // обновляем значения в процессе свайпа
		preventDefaultTouchmoveEvent: true,
	});

	// Добавляем useEffect для блокировки скроллинга
	useEffect(() => {
		const handleTouchMove = e => {
			// Отключаем скроллинг, если свайп происходит внутри компонента
			if (e.target.closest('.rangeContainer')) {
				e.preventDefault();
			}
		};

		// Добавляем обработчик
		document.addEventListener('touchmove', handleTouchMove, { passive: false });

		// Убираем обработчик при размонтировании компонента
		return () => {
			document.removeEventListener('touchmove', handleTouchMove);
		};
	}, []);

	return (
		<div className={styles.rangeContainer}>
			<div {...handlersStart} className={styles.swipeable}>
				<div
					className={styles.nextValue}
					style={
						startValue === 'от' || startValue === min ? { opacity: 0 } : {}
					}
				>
					{getNextValue(startValue === 'от' ? min : startValue, -50, 'start')}
				</div>
				<div className={styles.currentValue}>{startValue}</div>
				<div className={styles.nextValue}>
					{getNextValue(startValue === 'от' ? min : startValue, 50, 'start')}
				</div>
			</div>
			<div {...handlersEnd} className={styles.swipeable}>
				<div className={styles.nextValue}>
					{getNextValue(endValue === 'до' ? max : endValue, -50, 'end')}
				</div>
				<div className={styles.currentValue}>{endValue}</div>
				<div
					className={styles.nextValue}
					style={endValue === 'до' || endValue === max ? { opacity: 0 } : {}}
				>
					{getNextValue(endValue === 'до' ? max : endValue, 50, 'end')}
				</div>
			</div>
		</div>
	);
};

export default FromTo;

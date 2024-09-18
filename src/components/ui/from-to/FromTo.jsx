import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from './FromTo.module.scss';

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

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

import { colors } from '../../../app.constants';

import styles from './Range.module.scss';

// const Range = ({ setValue }) => {
// 	const [values, setValues] = useState([0, 50000]);

// 	const handleSliderChange = newValues => {
// 		setValues(newValues);
// 		setValue(newValues);
// 	};

// 	return (
// 		<div className={styles.rangeSliderContainer}>
// 			<div className={styles.rangeValues}>
// 				<span>от {values[0].toLocaleString()}</span>
// 				<span>до {values[1].toLocaleString()}</span>
// 			</div>
// 			<Slider
// 				range
// 				min={0}
// 				max={50000}
// 				step={10}
// 				value={values}
// 				onChange={handleSliderChange}
// 				styles={{
// 					rail: {
// 						backgroundColor: colors.color_light_blue,
// 						height: 'calc(2/412*100vw)',
// 					},
// 					track: {
// 						backgroundColor: colors.color_blue,
// 						height: 'calc(2/412*100vw)',
// 					},
// 					handle: {
// 						backgroundColor: colors.color_blue,
// 						height: 'calc(12/412*100vw)',
// 						width: 'calc(12/412*100vw)',
// 						opacity: 1,
// 						border: 'none',
// 					},
// 				}}
// 			/>
// 		</div>
// 	);
// };

const Range = ({ setValue }) => {
	const [values, setValues] = useState([0, 50000]);

	const handleSliderChange = newValues => {
		setValues(newValues);
		setValue(newValues);
	};

	const handleInputChange = (index, newValue) => {
		const newValues = [...values];
		newValues[index] = Math.max(0, Math.min(50000, Number(newValue))); // ограничение диапазона
		setValues(newValues);
		setValue(newValues);
	};

	return (
		<div className={styles.rangeSliderContainer}>
			<div className={styles.rangeValues}>
				<div className={styles.block__input}>
					<span>от</span>
					<input
						className={styles.input}
						type='number'
						value={values[0]}
						min={0}
						max={50000}
						onChange={e => handleInputChange(0, e.target.value)}
					/>
				</div>
				<div className={styles.block__input}>
					<span>до</span>
					<input
						className={styles.input}
						type='number'
						value={values[1]}
						min={0}
						max={50000}
						onChange={e => handleInputChange(1, e.target.value)}
					/>
				</div>
			</div>
			<Slider
				range
				min={0}
				max={50000}
				step={10}
				value={values}
				onChange={handleSliderChange}
				styles={{
					rail: {
						backgroundColor: colors.color_light_blue,
						height: 'calc(2/412*100vw)',
					},
					track: {
						backgroundColor: colors.color_blue,
						height: 'calc(2/412*100vw)',
					},
					handle: {
						backgroundColor: colors.color_blue,
						height: 'calc(12/412*100vw)',
						width: 'calc(12/412*100vw)',
						opacity: 1,
						border: 'none',
					},
				}}
			/>
		</div>
	);
};

export default Range;

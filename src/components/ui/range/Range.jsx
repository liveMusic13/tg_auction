import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRef, useState } from 'react';

import { colors } from '../../../app.constants';

import styles from './Range.module.scss';

const Range = ({ setValue }) => {
	const [values, setValues] = useState([0, 50000]);

	const minRef = useRef();
	const maxRef = useRef();

	const handleSliderChange = newValues => {
		setValues(newValues);
		setValue(newValues);
	};

	// const handleInputChange = (index, newValue) => {
	// 	const newValues = [...values];
	// 	newValues[index] = Math.max(0, Math.min(50000, Number(newValue))); // ограничение диапазона
	// 	setValues(newValues);
	// 	setValue(newValues);
	// };

	const handleInputChange = (index, newValue) => {
		const newValues = [...values];
		newValues[index] =
			newValue === '' ? '' : Math.max(0, Math.min(50000, Number(newValue)));
		setValues(newValues);
		setValue(newValues);
	};

	const handleBlockClick = input => {
		if (input === 'min') {
			minRef.current.focus();
		} else {
			maxRef.current.focus();
		}
	};

	// // Если фокус на инпуте и значение 0, очищаем его
	// const handleFocus = index => {
	// 	if (values[index] === 0) {
	// 		const newValues = [...values];
	// 		newValues[index] = ''; // Очищаем значение, чтобы начать ввод
	// 		setValues(newValues);
	// 	}
	// };

	const handleFocus = index => {
		if (values[index] === 0) {
			const newValues = [...values];
			newValues[index] = ''; // Очищаем значение, чтобы начать ввод
			setValues(newValues);
		}
	};

	return (
		<div className={styles.rangeSliderContainer}>
			<div className={styles.rangeValues}>
				<div
					className={styles.block__input}
					onClick={() => handleBlockClick('min')}
				>
					<span>от</span>
					<input
						ref={minRef}
						className={styles.input}
						type='number'
						value={values[0]}
						min={0}
						max={50000}
						onChange={e => handleInputChange(0, e.target.value)}
						onBlur={() => handleInputChange(0, values[0] || 0)} // Возвращаем 0, если поле пустое
						onFocus={() => handleFocus(0)} // Очищаем 0 при фокусе
					/>
				</div>
				<div
					className={styles.block__input}
					onClick={() => handleBlockClick('max')}
				>
					<span>до</span>
					{/* <input
						ref={maxRef}
						className={styles.input}
						type='number'
						value={values[1]}
						min={0}
						max={50000}
						onChange={e => handleInputChange(1, e.target.value)}
						onBlur={() => handleInputChange(1, values[1] || 0)} // Возвращаем 0, если поле пустое
						onFocus={() => handleFocus(1)} // Очищаем 0 при фокусе
					/> */}
					<input
						ref={maxRef}
						className={styles.input}
						type='number'
						value={values[1] === '' ? '' : values[1]} // Показываем пустое значение, если пользователь стер все цифры
						min={0}
						max={50000}
						onChange={e => handleInputChange(1, e.target.value)}
						onBlur={() =>
							handleInputChange(1, values[1] === '' ? 0 : values[1])
						} // Если поле пустое, возвращаем 0 при блюре
						onFocus={() => handleFocus(1)} // Очищаем поле, если значение 0
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

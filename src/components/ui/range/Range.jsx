import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRef, useState } from 'react';

import { colors } from '../../../app.constants';

import styles from './Range.module.scss';

// const Range = ({ setValue }) => {
// 	const [values, setValues] = useState([0, 50000]);

// 	const minRef = useRef();
// 	const maxRef = useRef();

// 	const handleSliderChange = newValues => {
// 		setValues(newValues);
// 		setValue(newValues);
// 	};

// 	// const handleInputChange = (index, newValue) => {
// 	// 	const newValues = [...values];
// 	// 	newValues[index] = Math.max(0, Math.min(50000, Number(newValue))); // ограничение диапазона
// 	// 	setValues(newValues);
// 	// 	setValue(newValues);
// 	// };

// 	const handleInputChange = (index, newValue) => {
// 		const newValues = [...values];
// 		newValues[index] =
// 			newValue === '' ? '' : Math.max(0, Math.min(50000, Number(newValue)));
// 		setValues(newValues);
// 		setValue(newValues);
// 	};

// 	const handleBlockClick = input => {
// 		if (input === 'min') {
// 			minRef.current.focus();
// 		} else {
// 			maxRef.current.focus();
// 		}
// 	};

// 	// // Если фокус на инпуте и значение 0, очищаем его
// 	// const handleFocus = index => {
// 	// 	if (values[index] === 0) {
// 	// 		const newValues = [...values];
// 	// 		newValues[index] = ''; // Очищаем значение, чтобы начать ввод
// 	// 		setValues(newValues);
// 	// 	}
// 	// };

// 	const handleFocus = index => {
// 		if (values[index] === 0) {
// 			const newValues = [...values];
// 			newValues[index] = ''; // Очищаем значение, чтобы начать ввод
// 			setValues(newValues);
// 		}
// 	};

// 	return (
// 		<div className={styles.rangeSliderContainer}>
// 			<div className={styles.rangeValues}>
// 				<div
// 					className={styles.block__input}
// 					onClick={() => handleBlockClick('min')}
// 				>
// 					<span>от</span>
// 					<input
// 						ref={minRef}
// 						className={styles.input}
// 						type='number'
// 						value={values[0]}
// 						min={0}
// 						max={50000}
// 						onChange={e => handleInputChange(0, e.target.value)}
// 						onBlur={() => handleInputChange(0, values[0] || 0)} // Возвращаем 0, если поле пустое
// 						onFocus={() => handleFocus(0)} // Очищаем 0 при фокусе
// 					/>
// 				</div>
// 				<div
// 					className={styles.block__input}
// 					onClick={() => handleBlockClick('max')}
// 				>
// 					<span>до</span>
// 					<input
// 						ref={maxRef}
// 						className={styles.input}
// 						type='number'
// 						value={values[1] === '' ? '' : values[1]} // Показываем пустое значение, если пользователь стер все цифры
// 						min={0}
// 						max={50000}
// 						onChange={e => handleInputChange(1, e.target.value)}
// 						onBlur={() =>
// 							handleInputChange(1, values[1] === '' ? 0 : values[1])
// 						} // Если поле пустое, возвращаем 0 при блюре
// 						onFocus={() => handleFocus(1)} // Очищаем поле, если значение 0
// 					/>
// 				</div>
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

const Range = ({ setValue, price }) => {
	const checkValues = price[0] !== undefined ? price : [0, 500];
	const [values, setValues] = useState(checkValues);

	const minRef = useRef();
	const maxRef = useRef();

	// Обработчик изменения значений через Slider
	const handleSliderChange = newValues => {
		setValues(newValues);
	};

	// Обработчик для завершения изменения через Slider (отправка корректных значений)
	const handleSliderChangeEnd = newValues => {
		// Убедимся, что минимальное значение не превышает максимального
		const correctedValues = [
			Math.min(newValues[0], newValues[1]), // Минимум не больше максимума
			Math.max(newValues[0], newValues[1]), // Максимум не меньше минимума
		];
		setValues(correctedValues);
		setValue(correctedValues); // Сохраняем финальные корректные значения
	};

	// Обработчик изменения значений в input
	const handleInputChange = (index, newValue) => {
		let newValues = [...values];
		newValues[index] =
			newValue === '' ? '' : Math.max(0, Math.min(50000, Number(newValue)));
		setValues(newValues); // Изменяем значения, но пока не проверяем
	};

	// Обработчик завершения изменения в input (например, при блюре)
	const handleInputBlur = () => {
		// Проверяем, чтобы минимальное значение не превышало максимального
		const correctedValues = [
			Math.min(values[0], values[1]), // Минимум не больше максимума
			Math.max(values[0], values[1]), // Максимум не меньше минимума
		];
		setValues(correctedValues); // Обновляем значения с учетом проверок
		setValue(correctedValues); // Сохраняем финальные корректные значения
	};

	// Обработчик клика по блоку (для фокуса на input)
	const handleBlockClick = input => {
		if (input === 'min') {
			minRef.current.focus();
		} else {
			maxRef.current.focus();
		}
	};

	// Очищаем input при фокусе, если значение 0
	const handleFocus = index => {
		if (values[index] === 0) {
			const newValues = [...values];
			newValues[index] = ''; // Очищаем значение
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
						onBlur={handleInputBlur} // Проверяем значения на корректность при блюре
						onFocus={() => handleFocus(0)} // Очищаем 0 при фокусе
					/>
				</div>
				<div
					className={styles.block__input}
					onClick={() => handleBlockClick('max')}
				>
					<span>до</span>
					<input
						ref={maxRef}
						className={styles.input}
						type='number'
						value={values[1] === '' ? '' : values[1]} // Показываем пустое значение, если стерли
						min={0}
						max={50000}
						onChange={e => handleInputChange(1, e.target.value)}
						onBlur={handleInputBlur} // Проверяем значения на корректность при блюре
						onFocus={() => handleFocus(1)} // Очищаем поле при фокусе
					/>
				</div>
			</div>
			<Slider
				range
				min={0}
				max={50000}
				step={10}
				value={values}
				onChange={handleSliderChange} // Изменение без проверки
				onAfterChange={handleSliderChangeEnd} // Проверка значений при завершении изменения
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

import { useEffect, useRef, useState } from 'react';

import { colors } from '../../../app.constants';

import styles from './Select.module.scss';

// const Select = ({ label, options, placeholder, onChange }) => {
// 	const [isFocused, setIsFocused] = useState(false);
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [selectedOption, setSelectedOption] = useState(null);
// 	const selectRef = useRef(null);
// 	const [width, setWidth] = useState(0);

// 	useEffect(() => {
// 		if (selectRef.current) {
// 			const elementWidth = selectRef.current.getBoundingClientRect().width;
// 			setWidth(elementWidth);
// 			// Альтернативный метод: selectRef.current.offsetWidth
// 		}
// 	}, []);

// 	const toggleOpen = () => {
// 		setIsOpen(!isOpen);
// 		setIsFocused(!isOpen); // Устанавливаем фокус при открытии
// 	};

// 	const handleSelectOption = option => {
// 		setSelectedOption(option);
// 		setIsOpen(false);
// 		setIsFocused(false); // Убираем фокус при выборе опции
// 	};

// 	return (
// 		<div className={styles.block__select}>
// 			<div
// 				className={`${styles.block__targetSelect} ${isFocused ? styles.focusedSelect : ''}`}
// 				onClick={toggleOpen}
// 				ref={selectRef}
// 			>
// 				<p
// 					className={`${styles.label} ${isFocused ? styles.focusedLabel : ''}`}
// 				>
// 					{label}
// 				</p>
// 				<p
// 					className={styles.target}
// 					style={selectedOption ? {} : { color: colors.color_grey }}
// 				>
// 					{selectedOption ? selectedOption : placeholder}
// 				</p>
// 				<img
// 					src='/images/icons/arrow_bottom.svg'
// 					alt='arrow'
// 					className={styles.image}
// 				/>
// 			</div>
// 			{isOpen && (
// 				<ul className={styles.block__options} style={{ width: width }}>
// 					{options.map((option, index) => (
// 						<li
// 							key={index}
// 							className={styles.option}
// 							onClick={() => handleSelectOption(option)}
// 						>
// 							{option}
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

const Select = ({ label, options, placeholder, onChange }) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const selectRef = useRef(null);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		if (selectRef.current) {
			const elementWidth = selectRef.current.getBoundingClientRect().width;
			setWidth(elementWidth);
		}
	}, []);

	// Функция для закрытия селекта по клику вне его
	const handleClickOutside = event => {
		if (selectRef.current && !selectRef.current.contains(event.target)) {
			setIsOpen(false);
			setIsFocused(false); // Убираем фокус при клике вне селекта
		}
	};

	// Добавляем слушатель клика вне селекта при открытии
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		// Очищаем слушатель при размонтировании компонента
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
		setIsFocused(!isOpen); // Устанавливаем фокус при открытии
	};

	const handleSelectOption = option => {
		setSelectedOption(option);
		setIsOpen(false);
		setIsFocused(false); // Убираем фокус при выборе опции

		console.log('onChange', onChange ? true : false);

		if (onChange) onChange(option); // Вызов onChange при выборе опции
	};

	return (
		<div className={styles.block__select}>
			<div
				className={`${styles.block__targetSelect} ${isFocused ? styles.focusedSelect : ''}`}
				onClick={toggleOpen}
				ref={selectRef}
			>
				<p
					className={`${styles.label} ${isFocused ? styles.focusedLabel : ''}`}
				>
					{label}
				</p>
				<p
					className={styles.target}
					style={selectedOption ? {} : { color: colors.color_grey }}
				>
					{selectedOption ? selectedOption : placeholder}
				</p>
				<img
					src='/images/icons/arrow_bottom.svg'
					alt='arrow'
					className={styles.image}
				/>
			</div>
			{isOpen && (
				<ul className={styles.block__options} style={{ width: width }}>
					{options.map((option, index) => (
						<li
							key={index}
							className={styles.option}
							onClick={() => handleSelectOption(option)}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Select;

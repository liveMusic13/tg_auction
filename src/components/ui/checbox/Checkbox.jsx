import { useEffect, useState } from 'react';

import styles from './Checkbox.module.scss';

const Checkbox = ({ options, setValue }) => {
	// Стейт для отслеживания выбранных опций
	const [selectedOptions, setSelectedOptions] = useState([]);

	// // Функция для переключения состояния чекбокса
	// const toggleOption = option => {
	// 	if (selectedOptions.includes(option)) {
	// 		// Убираем элемент из выбранных
	// 		setSelectedOptions(selectedOptions.filter(item => item !== option));
	// 		setValue(selectedOptions.filter(item => item !== option));
	// 	} else {
	// 		// Добавляем элемент в выбранные
	// 		setSelectedOptions([...selectedOptions, option]);
	// 		setValue([...selectedOptions, option]);
	// 	}
	// };

	// Функция для переключения состояния чекбокса
	const toggleOption = option => {
		if (option === 'Все') {
			// Если выбрано "Все", то отмечаем все чекбоксы
			if (selectedOptions.includes('Все')) {
				setSelectedOptions([]);
				setValue([]);
			} else {
				setSelectedOptions(options);
				setValue(options);
			}
		} else {
			if (selectedOptions.includes(option)) {
				const newSelected = selectedOptions.filter(item => item !== option);
				setSelectedOptions(newSelected);
				setValue(newSelected);
			} else {
				const newSelected = [...selectedOptions, option];
				setSelectedOptions(newSelected);
				setValue(newSelected);
			}
		}
	};

	// Автоматически отмечаем "Все", если выбраны все остальные опции
	useEffect(() => {
		if (
			selectedOptions.length === options.length - 1 &&
			!selectedOptions.includes('Все')
		) {
			setSelectedOptions([...selectedOptions, 'Все']);
			setValue([...selectedOptions, 'Все']);
		}
	}, [selectedOptions, options, setValue]);

	return (
		<div className={styles.checkboxContainer}>
			{options.map(option => (
				<div
					key={option}
					className={styles.checkboxItem}
					onClick={() => toggleOption(option)}
				>
					<span className={styles.label}>{option}</span>
					<img
						src={
							selectedOptions.includes(option)
								? '/images/icons/checkbox_active.svg'
								: '/images/icons/checkbox.svg'
						}
						alt={option}
						className={styles.checkboxIcon}
					/>
				</div>
			))}
		</div>
	);
};

export default Checkbox;

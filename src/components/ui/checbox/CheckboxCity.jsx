import { useEffect, useState } from 'react';

import styles from './Checkbox.module.scss';

// const CheckboxCity = ({ options, setValue }) => {
// 	// Стейт для отслеживания выбранных опций
// 	const [selectedOptions, setSelectedOptions] = useState([]);

// 	// Функция для переключения состояния чекбокса
// 	const toggleOption = (option, subOptions = []) => {
// 		if (option === 'Все') {
// 			// Если выбрано "Все", то отмечаем все чекбоксы
// 			if (selectedOptions.includes('Все')) {
// 				setSelectedOptions([]);
// 				setValue([]);
// 			} else {
// 				const allOptions = options.flatMap(opt =>
// 					opt.subOptions ? [opt.option, ...opt.subOptions] : opt.option,
// 				);
// 				setSelectedOptions(allOptions);
// 				setValue(allOptions);
// 			}
// 		} else {
// 			let newSelected;
// 			// Если у опции есть подопции (города для региона)
// 			if (subOptions.length > 0) {
// 				if (selectedOptions.includes(option)) {
// 					// Если регион уже выбран, то убираем его и его дочерние элементы
// 					newSelected = selectedOptions.filter(
// 						item => item !== option && !subOptions.includes(item),
// 					);
// 				} else {
// 					// Если регион не выбран, добавляем его и его дочерние элементы
// 					newSelected = [...selectedOptions, option, ...subOptions];
// 				}
// 			} else {
// 				// Если это обычная опция без дочерних
// 				if (selectedOptions.includes(option)) {
// 					newSelected = selectedOptions.filter(item => item !== option);
// 				} else {
// 					newSelected = [...selectedOptions, option];
// 				}
// 			}
// 			setSelectedOptions(newSelected);
// 			setValue(newSelected);
// 		}
// 	};

// 	// Автоматически отмечаем "Все", если выбраны все остальные опции
// 	useEffect(() => {
// 		const flatOptions = options.flatMap(opt =>
// 			opt.subOptions ? [opt.option, ...opt.subOptions] : opt.option,
// 		);
// 		if (
// 			selectedOptions.length === flatOptions.length - 1 &&
// 			!selectedOptions.includes('Все')
// 		) {
// 			setSelectedOptions([...selectedOptions, 'Все']);
// 			setValue([...selectedOptions, 'Все']);
// 		}
// 	}, [selectedOptions, options, setValue]);

// 	return (
// 		<div className={styles.checkboxContainer}>
// 			{options.map(opt => (
// 				<div key={opt.option} className={styles.checkboxItem}>
// 					<div onClick={() => toggleOption(opt.option, opt.subOptions || [])}>
// 						<span className={styles.label}>{opt.option}</span>
// 						<img
// 							src={
// 								selectedOptions.includes(opt.option)
// 									? '/images/icons/checkbox_active.svg'
// 									: '/images/icons/checkbox.svg'
// 							}
// 							alt={opt.option}
// 							className={styles.checkboxIcon}
// 						/>
// 					</div>
// 					{/* Если есть дочерние опции, то отображаем их */}
// 					{opt.subOptions && opt.subOptions.length > 0 && (
// 						<div className={styles.subOptions}>
// 							{opt.subOptions.map(subOption => (
// 								<div
// 									key={subOption}
// 									className={styles.checkboxItem}
// 									onClick={() => toggleOption(subOption)}
// 								>
// 									<span className={styles.label}>{subOption}</span>
// 									<img
// 										src={
// 											selectedOptions.includes(subOption)
// 												? '/images/icons/checkbox_active.svg'
// 												: '/images/icons/checkbox.svg'
// 										}
// 										alt={subOption}
// 										className={styles.checkboxIcon}
// 									/>
// 								</div>
// 							))}
// 						</div>
// 					)}
// 				</div>
// 			))}
// 		</div>
// 	);
// };

const CheckboxCity = ({ options, setValue }) => {
	// Стейт для отслеживания выбранных опций
	const [selectedOptions, setSelectedOptions] = useState([]);
	// Стейт для отслеживания открытых регионов
	const [openRegions, setOpenRegions] = useState([]);

	// Функция для переключения состояния чекбокса
	const toggleOption = (option, subOptions = []) => {
		if (option === 'Все') {
			// Если выбрано "Все", то отмечаем все чекбоксы
			if (selectedOptions.includes('Все')) {
				setSelectedOptions([]);
				setValue([]);
			} else {
				const allOptions = options.flatMap(opt =>
					opt.subOptions ? [opt.option, ...opt.subOptions] : opt.option,
				);
				setSelectedOptions(allOptions);
				setValue(allOptions);
			}
		} else {
			let newSelected;
			// Если у опции есть подопции (города для региона)
			if (subOptions.length > 0) {
				if (selectedOptions.includes(option)) {
					// Если регион уже выбран, то убираем его и его дочерние элементы
					newSelected = selectedOptions.filter(
						item => item !== option && !subOptions.includes(item),
					);
				} else {
					// Если регион не выбран, добавляем его и его дочерние элементы
					newSelected = [...selectedOptions, option, ...subOptions];
				}
			} else {
				// Если это обычная опция без дочерних
				if (selectedOptions.includes(option)) {
					newSelected = selectedOptions.filter(item => item !== option);
				} else {
					newSelected = [...selectedOptions, option];
				}
			}
			setSelectedOptions(newSelected);
			setValue(newSelected);
		}
	};

	// Функция для переключения состояния региона (открыт/закрыт)
	const toggleRegionOpen = region => {
		if (openRegions.includes(region)) {
			setOpenRegions(openRegions.filter(item => item !== region));
		} else {
			setOpenRegions([...openRegions, region]);
		}
	};

	// Автоматически отмечаем "Все", если выбраны все остальные опции
	useEffect(() => {
		const flatOptions = options.flatMap(opt =>
			opt.subOptions ? [opt.option, ...opt.subOptions] : opt.option,
		);
		if (
			selectedOptions.length === flatOptions.length - 1 &&
			!selectedOptions.includes('Все')
		) {
			setSelectedOptions([...selectedOptions, 'Все']);
			setValue([...selectedOptions, 'Все']);
		}
	}, [selectedOptions, options, setValue]);

	return (
		<div className={styles.checkboxContainer}>
			{options.map(opt => (
				<div key={opt.option} className={styles.checkboxItem_city}>
					<div className={styles.regionHeader}>
						{/* Кнопка для открытия/закрытия подопций */}
						{opt.subOptions && opt.subOptions.length > 0 && (
							<button
								className={styles.toggleButton}
								onClick={() => toggleRegionOpen(opt.option)}
							>
								<img
									src='/images/icons/arrow_right.svg'
									alt='arrow'
									style={
										openRegions.includes(opt.option)
											? { transform: 'rotate(90deg)' }
											: {}
									}
								/>
								{/* {openRegions.includes(opt.option) ? '-' : '+'} */}
							</button>
						)}
						{/* Чекбокс для региона */}
						<div
							className={styles.checkboxWithLabel}
							onClick={() => toggleOption(opt.option, opt.subOptions || [])}
						>
							<span className={styles.label}>{opt.option}</span>
							<img
								src={
									selectedOptions.includes(opt.option)
										? '/images/icons/checkbox_active.svg'
										: '/images/icons/checkbox.svg'
								}
								alt={opt.option}
								className={styles.checkboxIcon}
							/>
						</div>
					</div>

					{/* Отображение подопций (городов) при открытом регионе */}
					{openRegions.includes(opt.option) && opt.subOptions && (
						<div className={styles.subOptions}>
							{opt.subOptions.map(subOption => (
								<div
									key={subOption}
									className={styles.checkboxItem}
									onClick={() => toggleOption(subOption)}
								>
									<span className={styles.label}>{subOption}</span>
									<img
										src={
											selectedOptions.includes(subOption)
												? '/images/icons/checkbox_active.svg'
												: '/images/icons/checkbox.svg'
										}
										alt={subOption}
										className={styles.checkboxIcon}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default CheckboxCity;

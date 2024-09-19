import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import ButtonIcon from '@/components/ui/button-icon/ButtonIcon';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import { mockTrade } from '../../../data/mock.data';
import FilterSettings from '../../filter-settings/FilterSettings';
import Sorted from '../../sorted/Sorted';
import Trade from '../../trade/Trade';

import styles from './Traders.module.scss';
import { IS_PRO } from '@/app.constants';
import { settingsNoPro, settingsPro } from '@/data/buttonIcon.data';

// Функция для преобразования строки времени в секунды
const convertTimeToSeconds = timeString => {
	const [hours, minutes, seconds] = timeString
		.replace(/[чмс]/g, '') // Удаляем буквы 'ч', 'м', 'с'
		.split(' ')
		.map(Number);
	return hours * 3600 + minutes * 60 + seconds;
};

// Фильтрация и сортировка по времени
const sortTradesByTime = (trades, isDescending) => {
	return trades.sort((a, b) => {
		const timeA = convertTimeToSeconds(a.descriptionTrade[1]);
		const timeB = convertTimeToSeconds(b.descriptionTrade[1]);
		return isDescending ? timeB - timeA : timeA - timeB;
	});
};

// // Функция для преобразования строки длины в число
// const convertLengthToNumber = lengthString => {
// 	return Number(lengthString.replace('см', '').trim());
// };

// Функция для преобразования строки длины или цены в число
const convertLengthToNumber = str => {
	return Number(str.replace(/(см|₽)/g, '').trim());
};

// Функция для сортировки по длине
const sortTradesByLength = (trades, isDescending, num) => {
	return trades.sort((a, b) => {
		const lengthA = convertLengthToNumber(a.descriptionTrade[num]); // Длина находится в индексе 4
		const lengthB = convertLengthToNumber(b.descriptionTrade[num]);
		return isDescending ? lengthB - lengthA : lengthA - lengthB;
	});
};

//удаление из строки букв и пробелов
function removeSpacesAndLetters(str) {
	return str.replace(/[см\s₽года]/gi, '');
}

const Traders = () => {
	const [sortedTrades, setSortedTrades] = useState(mockTrade);
	const [isPopup, setIsPopup] = useState(false);
	const [isPopupFilter, setIsPopupFilter] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState(0);
	const [isLikeFilterActive, setIsLikeFilterActive] = useState(false); // Фильтр по id
	const [isWithMeFilterActive, setIsWithMeFilterActive] = useState(false); // Фильтр по id
	const [viewParams, setViewParams] = useState(false);
	// Инициализируем фильтры с "Все"
	const [activeTradeFilters, setActiveTradeFilters] = useState(['Все']);
	const [activeStatusFilters, setActiveStatusFilters] = useState(['Все']);

	const blockSettingsRef = useRef(null);
	const layoutRef = useRef(null);
	const [isVisibleRef, setIsVisibleRef] = useState(true);
	const [scrollDirection, setScrollDirection] = useState(null); // Отслеживаем направление скролла
	const [lastScrollTop, setLastScrollTop] = useState(0); // Предыдущее положение скролла
	const [countParams, setCountParams] = useState(0);

	////
	const [price, setPrice] = useState('');
	const [long, setLong] = useState('');
	const [natural, setNatural] = useState([]);
	const [color, setColor] = useState([]);
	const [type, setType] = useState([]);
	const [age, setAge] = useState('');
	const [weight, setWeight] = useState('');
	const [country, setCountry] = useState([]);
	const [city, setCity] = useState([]);
	const objState = {
		price,
		long,
		natural,
		color,
		type,
		age,
		weight,
		country,
		city,
	};
	const objFunc = {
		setPrice,
		setLong,
		setNatural,
		setColor,
		setType,
		setAge,
		setWeight,
		setCountry,
		setCity,
	};
	////

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisibleRef(entry.isIntersecting);
			},
			{
				root: null, // viewport
				rootMargin: '0px',
				threshold: 0.1, // 10% видимости
			},
		);

		if (blockSettingsRef.current) {
			observer.observe(blockSettingsRef.current);
		}

		return () => {
			if (blockSettingsRef.current) {
				observer.unobserve(blockSettingsRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollTop = layoutRef.current.scrollTop; // Используем scrollTop для элемента layout
			if (currentScrollTop > lastScrollTop) {
				setScrollDirection('down');
			} else if (currentScrollTop < lastScrollTop) {
				setScrollDirection('up');
			}
			setLastScrollTop(currentScrollTop);
		};

		if (layoutRef.current) {
			layoutRef.current.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (layoutRef.current) {
				layoutRef.current.removeEventListener('scroll', handleScroll);
			}
		};
	}, [lastScrollTop]);

	// Получаем массив id из состояния Redux
	const { arrLikes } = useSelector(state => state.likes);
	const { arrWithMe } = useSelector(state => state.withMe);

	const _onSorted = () => {
		setIsPopup(!isPopup);
	};

	const _onParams = () => {
		setViewParams(true);
	};

	const toggleLikeFilter = () => {
		setIsLikeFilterActive(prev => !prev); // Переключаем фильтр
	};

	const toggleWithMeFilter = () => {
		setIsWithMeFilterActive(prev => !prev); // Переключаем фильтр
	};

	// Основная логика сортировки
	useEffect(() => {
		let trades = [...mockTrade];

		// Применение фильтра сортировки
		if (selectedFilter === 0) {
			trades = [...mockTrade];
		} else if (selectedFilter === 1) {
			trades = sortTradesByLength(trades, false, 0);
		} else if (selectedFilter === 2) {
			trades = sortTradesByLength(trades, true, 0);
		} else if (selectedFilter === 3) {
			trades = sortTradesByTime(trades, true);
		} else if (selectedFilter === 4) {
			trades = sortTradesByTime(trades, false);
		} else if (selectedFilter === 5) {
			trades = sortTradesByLength(trades, false, 4);
		} else if (selectedFilter === 6) {
			trades = sortTradesByLength(trades, true, 4);
		}

		// Фильтрация по выбранным типам торгов, если не активен фильтр "Все"
		if (activeTradeFilters.length > 0 && !activeTradeFilters.includes('Все')) {
			trades = trades.filter(trade =>
				activeTradeFilters.includes(trade.descriptionTrade[2]),
			);
		}

		// Фильтрация по выбранным статусам торгов, если не активен фильтр "Все"
		if (
			activeStatusFilters.length > 0 &&
			!activeStatusFilters.includes('Все')
		) {
			trades = trades.filter(trade =>
				activeStatusFilters.includes(trade.descriptionTrade[3]),
			);
			console.log(trades);
		}

		// Применение других фильтров (например, по id)
		if (isLikeFilterActive) {
			trades = trades.filter(trade => arrLikes.includes(trade.id));
		}

		// Применение других фильтров (например, по id)
		if (isWithMeFilterActive) {
			trades = trades.filter(trade => arrWithMe.includes(trade.id));
		}

		if (IS_PRO) {
			// Фильтрация по цене, если цена задана
			if (price && price.length === 2) {
				trades = trades.filter(
					trade =>
						Number(removeSpacesAndLetters(trade.descriptionTrade[0])) >=
							price[0] &&
						Number(removeSpacesAndLetters(trade.descriptionTrade[0])) <=
							price[1],
				);
			}

			// Фильтрация по длине, если длина задана
			if (long && long.start !== undefined && long.end !== undefined) {
				trades = trades.filter(
					trade =>
						Number(removeSpacesAndLetters(trade.descriptionTrade[4])) >=
							long.start &&
						Number(removeSpacesAndLetters(trade.descriptionTrade[4])) <=
							long.end,
				);
			}

			// Фильтрация по натуральности, если выбрано что-то в массиве natural
			if (natural.length > 0) {
				trades = trades.filter(trade => natural.includes(trade.natural_color));
			}

			// Фильтрация по цвету, если выбрано что-то в массиве color
			if (color.length > 0) {
				trades = trades.filter(trade => color.includes(trade.color));
			}

			// Фильтрация по типу, если выбрано что-то в массиве type
			if (type.length > 0) {
				trades = trades.filter(trade => type.includes(trade.type));
			}

			// Фильтрация по возрасту, если возраст задан
			if (age && age.start !== undefined && age.end !== undefined) {
				trades = trades.filter(
					trade =>
						Number(removeSpacesAndLetters(trade.age)) >= age.start &&
						Number(removeSpacesAndLetters(trade.age)) <= age.end,
				);
			}

			// Фильтрация по весу, если вес задан
			if (weight && weight.start !== undefined && weight.end !== undefined) {
				trades = trades.filter(
					trade =>
						Number(removeSpacesAndLetters(trade.descriptionTrade[5])) >=
							weight.start &&
						Number(removeSpacesAndLetters(trade.descriptionTrade[5])) <=
							weight.end,
				);
			}

			// Фильтрация по стране, если выбрано что-то в массиве country
			if (country.length > 0) {
				trades = trades.filter(trade =>
					country.includes(trade.descriptionTrade[6]),
				);
			}

			// Фильтрация по городу, если выбрано что-то в массиве city
			if (city.length > 0) {
				trades = trades.filter(trade =>
					city.includes(trade.descriptionTrade[7]),
				);
			}
		}

		setSortedTrades(trades);
	}, [
		activeTradeFilters,
		activeStatusFilters,
		selectedFilter,
		isLikeFilterActive,
		isWithMeFilterActive,
		arrLikes,
		price,
		long,
		natural,
		color,
		type,
		age,
		weight,
		country,
		city,
	]);

	//Подсчет фильтров
	useEffect(() => {
		const countActiveFilters = () => {
			let count = 0;

			// Проверка на активность фильтров
			if (price && price.length === 2) count++;
			if (long && long.start !== undefined && long.end !== undefined) count++;
			if (natural.length > 0) count++;
			if (color.length > 0) count++;
			if (type.length > 0) count++;
			if (age && age.start !== undefined && age.end !== undefined) count++;
			if (weight && weight.start !== undefined && weight.end !== undefined)
				count++;
			if (country.length > 0) count++;
			if (city.length > 0) count++;

			return count;
		};

		// Обновляем количество активных фильтров
		const activeFiltersCount = countActiveFilters();
		setCountParams(activeFiltersCount);
	}, [price, long, natural, color, type, age, weight, country, city]);

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
				overflowY: isPopup || isPopupFilter ? 'hidden' : 'auto',
			}}
			ref={layoutRef}
		>
			{isPopup && (
				<div
					className={styles.block__opacity}
					onClick={() => {
						setIsPopupFilter(false);
						setIsPopup(false);
					}}
				></div>
			)}
			<Header />
			{viewParams ? (
				<FilterSettings
					setViewParams={setViewParams}
					setActiveTradeFilters={setActiveTradeFilters}
					setActiveStatusFilters={setActiveStatusFilters}
					activeTradeFilters={activeTradeFilters}
					activeStatusFilters={activeStatusFilters}
					setIsPopupFilter={setIsPopupFilter}
					isPopupFilter={isPopupFilter}
					objState={objState}
					objFunc={objFunc}
				/>
			) : (
				<>
					<Navbar
						style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
					/>

					{IS_PRO ? (
						<div
							className={`${styles.block__settings} ${styles.pro}`}
							ref={blockSettingsRef}
						>
							<ButtonIcon
								data={settingsPro[0]}
								onClick={settingsPro[0].id === 0 ? _onParams : null}
							/>
							<div className={styles.center}>
								<ButtonIcon
									data={settingsPro[1]}
									onClick={toggleWithMeFilter}
									isActive={isWithMeFilterActive}
									isLike={true}
									style={
										isWithMeFilterActive
											? { backgroundColor: colors.color_blue }
											: {}
									}
								/>
								<ButtonIcon
									onClick={toggleLikeFilter}
									data={settingsPro[2]}
									isActive={isLikeFilterActive}
									isLike={true}
									style={
										isLikeFilterActive
											? { backgroundColor: colors.color_blue }
											: {}
									}
								/>
								{/* Включение/выключение фильтрации по id */}
							</div>
							<ButtonIcon onClick={_onSorted} data={settingsPro[3]} />
						</div>
					) : (
						<div className={`${styles.block__settings} ${styles.no_pro}`}>
							{settingsNoPro.map(button => (
								<ButtonIcon
									onClick={button.id === 1 ? _onSorted : undefined}
									key={button.id}
									data={button}
								/>
							))}
						</div>
					)}

					{sortedTrades.map(trade => (
						<Trade key={trade.id} data={trade} />
					))}

					{isPopup && (
						<Sorted
							onClick={_onSorted}
							selectedFilter={selectedFilter}
							setSelectedFilter={setSelectedFilter}
						/>
					)}
				</>
			)}

			{!isVisibleRef && IS_PRO && !viewParams && scrollDirection === 'up' && (
				<div className={styles.block__buttons_param}>
					<button className={styles.one} onClick={_onParams}>
						Параметры
					</button>
					<button className={styles.two}>{countParams}</button>
				</div>
			)}

			<InterfaceApp />
		</Layout>
	);
};

// const Traders = () => {
// 	// const [sortedTrades, setSortedTrades] = useState(mockTrade);
// 	let sortedTrades = mockTrade;
// 	const [isPopup, setIsPopup] = useState(false);
// 	const [isPopupFilter, setIsPopupFilter] = useState(false);
// 	const [selectedFilter, setSelectedFilter] = useState(0);
// 	const [isLikeFilterActive, setIsLikeFilterActive] = useState(false); // Фильтр по id
// 	const [viewParams, setViewParams] = useState(false);
// 	// Инициализируем фильтры с "Все"
// 	const [activeTradeFilters, setActiveTradeFilters] = useState(['Все']);
// 	const [activeStatusFilters, setActiveStatusFilters] = useState(['Все']);

// 	const blockSettingsRef = useRef(null);
// 	const layoutRef = useRef(null);
// 	const [isVisibleRef, setIsVisibleRef] = useState(true);
// 	const [scrollDirection, setScrollDirection] = useState(null); // Отслеживаем направление скролла
// 	const [lastScrollTop, setLastScrollTop] = useState(0); // Предыдущее положение скролла
// 	const [countParams, setCountParams] = useState(0);

// 	////
// 	const [price, setPrice] = useState('');
// 	const [long, setLong] = useState('');
// 	const [natural, setNatural] = useState([]);
// 	const [color, setColor] = useState([]);
// 	const [type, setType] = useState([]);
// 	const [age, setAge] = useState('');
// 	const [weight, setWeight] = useState('');
// 	const [country, setCountry] = useState([]);
// 	const [city, setCity] = useState([]);
// 	const objState = {
// 		price,
// 		long,
// 		natural,
// 		color,
// 		type,
// 		age,
// 		weight,
// 		country,
// 		city,
// 	};
// 	const objFunc = {
// 		setPrice,
// 		setLong,
// 		setNatural,
// 		setColor,
// 		setType,
// 		setAge,
// 		setWeight,
// 		setCountry,
// 		setCity,
// 	};
// 	////

// 	useEffect(() => {
// 		const observer = new IntersectionObserver(
// 			([entry]) => {
// 				setIsVisibleRef(entry.isIntersecting);
// 			},
// 			{
// 				root: null, // viewport
// 				rootMargin: '0px',
// 				threshold: 0.1, // 10% видимости
// 			},
// 		);

// 		if (blockSettingsRef.current) {
// 			observer.observe(blockSettingsRef.current);
// 		}

// 		return () => {
// 			if (blockSettingsRef.current) {
// 				observer.unobserve(blockSettingsRef.current);
// 			}
// 		};
// 	}, []);

// 	useEffect(() => {
// 		const handleScroll = () => {
// 			const currentScrollTop = layoutRef.current.scrollTop; // Используем scrollTop для элемента layout
// 			if (currentScrollTop > lastScrollTop) {
// 				setScrollDirection('down');
// 			} else if (currentScrollTop < lastScrollTop) {
// 				setScrollDirection('up');
// 			}
// 			setLastScrollTop(currentScrollTop);
// 		};

// 		if (layoutRef.current) {
// 			layoutRef.current.addEventListener('scroll', handleScroll);
// 		}

// 		return () => {
// 			if (layoutRef.current) {
// 				layoutRef.current.removeEventListener('scroll', handleScroll);
// 			}
// 		};
// 	}, [lastScrollTop]);

// 	// Получаем массив id из состояния Redux
// 	const { arrLikes } = useSelector(state => state.likes);

// 	const _onSorted = () => {
// 		setIsPopup(!isPopup);
// 	};

// 	const _onParams = () => {
// 		setViewParams(true);
// 	};

// 	const toggleLikeFilter = () => {
// 		setIsLikeFilterActive(prev => !prev); // Переключаем фильтр
// 	};

// 	// Основная логика сортировки
// 	useEffect(() => {
// 		let trades = [...mockTrade];

// 		// Фильтрация по выбранным типам торгов, если не активен фильтр "Все"
// 		if (activeTradeFilters.length > 0 && !activeTradeFilters.includes('Все')) {
// 			trades = trades.filter(trade =>
// 				activeTradeFilters.includes(trade.descriptionTrade[2]),
// 			);
// 			console.log(trades);
// 		}

// 		// Фильтрация по выбранным статусам торгов, если не активен фильтр "Все"
// 		if (
// 			activeStatusFilters.length > 0 &&
// 			!activeStatusFilters.includes('Все')
// 		) {
// 			trades = trades.filter(trade =>
// 				activeStatusFilters.includes(trade.descriptionTrade[3]),
// 			);
// 			console.log(trades);
// 		}

// 		// Применение других фильтров (например, по id)
// 		if (isLikeFilterActive) {
// 			trades = trades.filter(trade => arrLikes.includes(trade.id));
// 		}

// 		if (IS_PRO) {
// 			// Фильтрация по цене, если цена задана
// 			if (price && price.length === 2) {
// 				trades = trades.filter(
// 					trade =>
// 						Number(removeSpacesAndLetters(trade.descriptionTrade[0])) >=
// 							price[0] &&
// 						Number(removeSpacesAndLetters(trade.descriptionTrade[0])) <=
// 							price[1],
// 				);
// 			}

// 			// Фильтрация по длине, если длина задана
// 			if (long && long.start !== undefined && long.end !== undefined) {
// 				trades = trades.filter(
// 					trade =>
// 						Number(removeSpacesAndLetters(trade.descriptionTrade[4])) >=
// 							long.start &&
// 						Number(removeSpacesAndLetters(trade.descriptionTrade[4])) <=
// 							long.end,
// 				);
// 			}

// 			// Фильтрация по натуральности, если выбрано что-то в массиве natural
// 			if (natural.length > 0) {
// 				trades = trades.filter(trade => natural.includes(trade.natural_color));
// 			}

// 			// Фильтрация по цвету, если выбрано что-то в массиве color
// 			if (color.length > 0) {
// 				trades = trades.filter(trade => color.includes(trade.color));
// 			}

// 			// Фильтрация по типу, если выбрано что-то в массиве type
// 			if (type.length > 0) {
// 				trades = trades.filter(trade => type.includes(trade.type));
// 			}

// 			// Фильтрация по возрасту, если возраст задан
// 			if (age && age.start !== undefined && age.end !== undefined) {
// 				trades = trades.filter(
// 					trade =>
// 						Number(removeSpacesAndLetters(trade.age)) >= age.start &&
// 						Number(removeSpacesAndLetters(trade.age)) <= age.end,
// 				);
// 			}

// 			// Фильтрация по весу, если вес задан
// 			if (weight && weight.start !== undefined && weight.end !== undefined) {
// 				trades = trades.filter(
// 					trade =>
// 						Number(removeSpacesAndLetters(trade.descriptionTrade[5])) >=
// 							weight.start &&
// 						Number(removeSpacesAndLetters(trade.descriptionTrade[5])) <=
// 							weight.end,
// 				);
// 			}

// 			// Фильтрация по стране, если выбрано что-то в массиве country
// 			if (country.length > 0) {
// 				trades = trades.filter(trade =>
// 					country.includes(trade.descriptionTrade[6]),
// 				);
// 			}

// 			// Фильтрация по городу, если выбрано что-то в массиве city
// 			if (city.length > 0) {
// 				trades = trades.filter(trade =>
// 					city.includes(trade.descriptionTrade[7]),
// 				);
// 			}
// 		}

// 		// Применение фильтра сортировки
// 		if (selectedFilter === 0) {
// 			trades = [...mockTrade];
// 		} else if (selectedFilter === 1) {
// 			trades = sortTradesByLength(trades, false, 0);
// 		} else if (selectedFilter === 2) {
// 			trades = sortTradesByLength(trades, true, 0);
// 		} else if (selectedFilter === 3) {
// 			trades = sortTradesByTime(trades, true);
// 		} else if (selectedFilter === 4) {
// 			trades = sortTradesByTime(trades, false);
// 		} else if (selectedFilter === 5) {
// 			trades = sortTradesByLength(trades, false, 4);
// 		} else if (selectedFilter === 6) {
// 			trades = sortTradesByLength(trades, true, 4);
// 		}
// 		console.log('Before setting sortedTrades:', trades);
// 		// setSortedTrades(trades);
// 		sortedTrades = [...trades];
// 		console.log('After setting sortedTrades:', trades);
// 	}, [
// 		activeTradeFilters,
// 		activeStatusFilters,
// 		selectedFilter,
// 		isLikeFilterActive,
// 		arrLikes,
// 		price,
// 		long,
// 		natural,
// 		color,
// 		type,
// 		age,
// 		weight,
// 		country,
// 		city,
// 	]);

// 	//Подсчет фильтров
// 	useEffect(() => {
// 		const countActiveFilters = () => {
// 			let count = 0;

// 			// Проверка на активность фильтров
// 			if (price && price.length === 2) count++;
// 			if (long && long.start !== undefined && long.end !== undefined) count++;
// 			if (natural.length > 0) count++;
// 			if (color.length > 0) count++;
// 			if (type.length > 0) count++;
// 			if (age && age.start !== undefined && age.end !== undefined) count++;
// 			if (weight && weight.start !== undefined && weight.end !== undefined)
// 				count++;
// 			if (country.length > 0) count++;
// 			if (city.length > 0) count++;

// 			return count;
// 		};

// 		// Обновляем количество активных фильтров
// 		const activeFiltersCount = countActiveFilters();
// 		setCountParams(activeFiltersCount);
// 	}, [price, long, natural, color, type, age, weight, country, city]);

// 	useEffect(() => {
// 		console.log('Updated sortedTrades:', sortedTrades);
// 		// console.log(activeTradeFilters, activeStatusFilters, sortedTrades);
// 	}, [activeTradeFilters, activeStatusFilters, sortedTrades]);

// 	return (
// 		<Layout
// 			style={{
// 				gap: 'calc(16/412*100vw)',
// 				overflowY: isPopup || isPopupFilter ? 'hidden' : 'auto',
// 			}}
// 			ref={layoutRef}
// 		>
// 			{isPopup && (
// 				<div
// 					className={styles.block__opacity}
// 					onClick={() => {
// 						setIsPopupFilter(false);
// 						setIsPopup(false);
// 					}}
// 				></div>
// 			)}
// 			<Header />
// 			{viewParams ? (
// 				<FilterSettings
// 					setViewParams={setViewParams}
// 					setActiveTradeFilters={setActiveTradeFilters}
// 					setActiveStatusFilters={setActiveStatusFilters}
// 					activeTradeFilters={activeTradeFilters}
// 					activeStatusFilters={activeStatusFilters}
// 					setIsPopupFilter={setIsPopupFilter}
// 					isPopupFilter={isPopupFilter}
// 					objState={objState}
// 					objFunc={objFunc}
// 				/>
// 			) : (
// 				<>
// 					<Navbar
// 						style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
// 					/>

// 					{IS_PRO ? (
// 						<div
// 							className={`${styles.block__settings} ${styles.pro}`}
// 							ref={blockSettingsRef}
// 						>
// 							<ButtonIcon
// 								data={settingsPro[0]}
// 								onClick={settingsPro[0].id === 0 ? _onParams : null}
// 							/>
// 							<div className={styles.center}>
// 								<ButtonIcon data={settingsPro[1]} />
// 								<ButtonIcon
// 									onClick={toggleLikeFilter}
// 									data={settingsPro[2]}
// 									isActive={isLikeFilterActive}
// 									isLike={true}
// 									style={
// 										isLikeFilterActive
// 											? { backgroundColor: colors.color_blue }
// 											: {}
// 									}
// 								/>
// 								{/* Включение/выключение фильтрации по id */}
// 							</div>
// 							<ButtonIcon onClick={_onSorted} data={settingsPro[3]} />
// 						</div>
// 					) : (
// 						<div className={`${styles.block__settings} ${styles.no_pro}`}>
// 							{settingsNoPro.map(button => (
// 								<ButtonIcon
// 									onClick={button.id === 1 ? _onSorted : undefined}
// 									key={button.id}
// 									data={button}
// 								/>
// 							))}
// 						</div>
// 					)}

// 					{sortedTrades.map(trade => (
// 						<Trade key={trade.id} data={trade} />
// 					))}

// 					{isPopup && (
// 						<Sorted
// 							onClick={_onSorted}
// 							selectedFilter={selectedFilter}
// 							setSelectedFilter={setSelectedFilter}
// 						/>
// 					)}
// 				</>
// 			)}

// 			{!isVisibleRef && IS_PRO && !viewParams && scrollDirection === 'up' && (
// 				<div className={styles.block__buttons_param}>
// 					<button className={styles.one} onClick={_onParams}>
// 						Параметры
// 					</button>
// 					<button className={styles.two}>{countParams}</button>
// 				</div>
// 			)}

// 			<InterfaceApp />
// 		</Layout>
// 	);
// };

export default Traders;

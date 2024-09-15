import { useEffect, useState } from 'react';

import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';

import { colors } from '../../app.constants';
import {
	arrOtherFilter,
	arrStatus,
	arrTrades,
} from '../../data/filterSettings.data';
import PopupFilter from '../popups/popup-filter/PopupFilter';
import ButtonIcon from '../ui/button-icon/ButtonIcon';

import styles from './FilterSettings.module.scss';

const FilterSettings = ({
	setViewParams,
	setActiveTradeFilters,
	setActiveStatusFilters,
	activeTradeFilters,
	activeStatusFilters,
	isPopupFilter,
	setIsPopupFilter,
	objFunc,
	objState,
}) => {
	// const [price, setPrice] = useState('');
	// const [long, setLong] = useState('');
	// const [natural, setNatural] = useState([]);
	// const [color, setColor] = useState([]);
	// const [type, setType] = useState([]);
	// const [age, setAge] = useState('');
	// const [weight, setWeight] = useState('');
	// const [country, setCountry] = useState([]);
	// const [city, setCity] = useState([]);

	// const objFunc = {
	// 	setPrice,
	// 	setLong,
	// 	setNatural,
	// 	setColor,
	// 	setType,
	// 	setAge,
	// 	setWeight,
	// 	setCountry,
	// 	setCity,
	// };

	const { price, long, natural, color, type, age, weight, country, city } =
		objState;
	const {
		setPrice,
		setLong,
		setNatural,
		setColor,
		setType,
		setAge,
		setWeight,
		setCountry,
		setCity,
	} = objFunc;

	useEffect(() => {
		console.log(price, long, natural, color, type, age, weight, country, city);
	}, [price, long, natural, color, type, age, weight, country, city]);

	const [button, setButton] = useState('');
	// Функция для переключения фильтров по типу торгов
	const toggleTradeFilter = filter => {
		if (filter === 'Все') {
			// Если нажата кнопка "Все", сбрасываем все остальные фильтры и включаем "Все"
			setActiveTradeFilters(['Все']);
		} else {
			setActiveTradeFilters(prev => {
				// Если включен фильтр "Все", убираем его
				if (prev.includes('Все')) return [filter];

				// Если фильтр уже активен, удаляем его, иначе добавляем
				return prev.includes(filter)
					? prev.filter(f => f !== filter)
					: [...prev, filter];
			});
		}
	};

	// Функция для переключения фильтров по статусу
	const toggleStatusFilter = filter => {
		if (filter === 'Все') {
			// Если нажата кнопка "Все", сбрасываем все остальные фильтры и включаем "Все"
			setActiveStatusFilters(['Все']);
		} else {
			setActiveStatusFilters(prev => {
				// Если включен фильтр "Все", убираем его
				if (prev.includes('Все')) return [filter];

				// Если фильтр уже активен, удаляем его, иначе добавляем
				return prev.includes(filter)
					? prev.filter(f => f !== filter)
					: [...prev, filter];
			});
		}
	};

	const _onClickPopup = but => {
		setButton(but);
		setIsPopupFilter(true);
	};

	const onClear = id => {
		if (id === 0) {
			setPrice('');
		} else if (id === 1) {
			setLong('');
		} else if (id === 2) {
			setNatural([]);
		} else if (id === 3) {
			setColor([]);
		} else if (id === 4) {
			setType([]);
		} else if (id === 5) {
			setAge('');
		} else if (id === 6) {
			setWeight('');
		} else if (id === 7) {
			setCountry([]);
		} else if (id === 8) {
			setCity([]);
		}
	};

	return (
		<div
			className={styles.wrapper_filter}
			style={isPopupFilter ? { overflow: 'hidden' } : {}}
		>
			{isPopupFilter && (
				<div
					className={styles.block__opacity}
					onClick={() => {
						setIsPopupFilter(false);
						// setIsPopup(false);
					}}
				></div>
			)}
			<div className={styles.block__title}>
				<h2 className={styles.title}>Параметры</h2>
				<button
					className={styles.button__exit}
					onClick={() => setViewParams(false)}
				>
					<img src='/images/icons/plus.svg' alt='back' />
				</button>
			</div>
			<div className={styles.block__trades}>
				<h3 className={styles.title__buttons}>Тип торгов</h3>
				<div className={styles.block__buttons}>
					{arrTrades.map(el => (
						<Button
							key={el}
							style={{
								width: 'auto',
								backgroundColor: activeTradeFilters.includes(el)
									? colors.color_blue
									: colors.color_light_blue,
								color: activeTradeFilters.includes(el)
									? colors.color_white
									: colors.color_blue,
								fontSize: '0.938rem',
							}}
							onClick={() => toggleTradeFilter(el)} // Переключаем фильтр
						>
							{el}
						</Button>
					))}
				</div>
			</div>
			<div className={styles.block__status}>
				<h3 className={styles.title__buttons}>Статус торгов</h3>
				<div className={styles.block__buttons}>
					{arrStatus.map(el => (
						<Button
							key={el}
							style={{
								width: 'auto',
								backgroundColor: activeStatusFilters.includes(el)
									? colors.color_blue
									: colors.color_light_blue,
								color: activeStatusFilters.includes(el)
									? colors.color_white
									: colors.color_blue,
								fontSize: '0.938rem',
							}}
							onClick={() => toggleStatusFilter(el)} // Переключаем фильтр
						>
							{el}
						</Button>
					))}
				</div>
			</div>

			{arrOtherFilter.map(filter => {
				const exclude = 'Все';
				const text =
					filter.id === 0
						? `от ${price[0]} до ${price[1]}`
						: filter.id === 1
							? `от ${long.start} до ${long.end}`
							: filter.id === 2
								? natural.join(', ')
								: filter.id === 3
									? color.join(', ')
									: filter.id === 4
										? type.join(', ')
										: filter.id === 5
											? `от ${age.start} до ${age.end}`
											: filter.id === 6
												? `от ${weight.start} до ${weight.end}`
												: filter.id === 7
													? country.filter(item => item !== exclude).join(', ')
													: city.filter(item => item !== exclude).join(', ');

				const isPrice = price !== '' && filter.id === 0;
				const isAddLong = long !== '' && filter.id === 1;
				const isAddNatural = natural.length !== 0 && filter.id === 2;
				const isAddColor = color.length !== 0 && filter.id === 3;
				const isAddType = type.length !== 0 && filter.id === 4;
				const isAddAge = age !== '' && filter.id === 5;
				const isWeight = weight !== '' && filter.id === 6;
				const isAddCountry = country.length !== 0 && filter.id === 7;
				const isAddCity = city.length !== 0 && filter.id === 8;

				const isView =
					isAddLong ||
					isAddAge ||
					isWeight ||
					isPrice ||
					isAddNatural ||
					isAddColor ||
					isAddType ||
					isAddCountry ||
					isAddCity;

				return (
					<div key={filter.id} className={styles.block__filter}>
						<h4
							className={
								isView
									? `${styles.filter__title} ${styles.add_value}`
									: `${styles.filter__title}`
							}
							onClick={() => _onClickPopup(filter.title)}
						>
							{filter.title}
						</h4>
						{isView && <p className={styles.filter__text}>{text}</p>}
						{isView && (
							<ButtonIcon
								style={{
									backgroundColor: 'transparent',
									position: 'absolute',
									right: '0px',
									top: '50%',
									transform: 'translateY(-50%)',
								}}
								styleImg={{
									width: 'calc(8/412*100vw)',
									height: 'calc(8/412*100vw)',
								}}
								data={{
									src: '/images/icons/exit.svg',
									src_active: '/images/icons/exit.svg',
								}}
								onClick={() => onClear(filter.id)}
							/>
						)}
					</div>
				);
			})}

			{isPopupFilter && (
				<PopupFilter
					setIsPopupFilter={setIsPopupFilter}
					button={button}
					objFunc={objFunc}
				/>
			)}

			<Button style={{ marginTop: 'calc(70/412*100vw)' }}>
				Показать результаты
			</Button>

			<InterfaceApp />
		</div>
	);
};

export default FilterSettings;

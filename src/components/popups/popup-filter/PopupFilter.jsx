import { useState } from 'react';

import {
	options_city,
	options_color,
	options_country,
	options_type,
} from '../../../data/filterSettings.data';
import ButtonIcon from '../../ui/button-icon/ButtonIcon';
import Checkbox from '../../ui/checbox/Checkbox';
import CheckboxCity from '../../ui/checbox/CheckboxCity';
import FromTo from '../../ui/from-to/FromTo';
import Range from '../../ui/range/Range';

import styles from './PopupFilter.module.scss';

// const PopupFilter = ({ setIsPopupFilter, button, objFunc }) => {
// 	const {
// 		setPrice,
// 		setLong,
// 		setNatural,
// 		setColor,
// 		setType,
// 		setAge,
// 		setWeight,
// 		setCountry,
// 		setCity,
// 	} = objFunc;

// 	const [isMoscowRegionOpen, setIsMoscowRegionOpen] = useState(false);
// 	const [isBryanskRegionOpen, setIsBryanskRegionOpen] = useState(false);

// 	const isLong = button === 'Длина';
// 	const isPrice = button === 'Цена';
// 	const isNatural_color = button === 'Натуральный цвет';
// 	const isColor = button === 'Текущий цвет';
// 	const isType = button === 'Тип';
// 	const isAge = button === 'Возраст донора';
// 	const isWeight = button === 'Вес';
// 	const isCountry = button === 'Страна';
// 	const isCity = button === 'Город';

// 	const title = isLong
// 		? 'Длина, см'
// 		: isPrice
// 			? 'Цена, ₽'
// 			: isNatural_color
// 				? 'Натуральный цвет'
// 				: isColor
// 					? 'Текущий цвет'
// 					: isType
// 						? 'Тип волос'
// 						: isAge
// 							? 'Возраст донора , лет'
// 							: isWeight
// 								? 'Вес , гр'
// 								: button;

// 	const option_checkbox =
// 		isNatural_color || isColor
// 			? options_color
// 			: isType
// 				? options_type
// 				: isCountry
// 					? options_country
// 					: options_city;

// 	const set_value = isLong ? setLong : isWeight ? setWeight : setAge;
// 	const set_value_checkbox = isNatural_color
// 		? setNatural
// 		: isColor
// 			? setColor
// 			: isType
// 				? setType
// 				: isCountry
// 					? setCountry
// 					: setCity;

// 	const options = [
// 		{ option: 'Все' },
// 		{ option: 'Московская область', subOptions: ['Москва', 'Подольск'] },
// 		{
// 			option: 'Брянская область',
// 			subOptions: ['Брянск', 'Клинцы', 'Новозыбков'],
// 		},
// 	];

// 	return (
// 		<div className={styles.block__popup}>
// 			<div className={styles.block__title}>
// 				<h2 className={styles.title}>{title}</h2>
// 				<ButtonIcon
// 					data={{ src: '/images/icons/exit.svg' }}
// 					onClick={() => setIsPopupFilter(false)}
// 					style={{
// 						backgroundColor: 'transparent',
// 					}}
// 					styleImg={{
// 						width: 'calc(14/412*100vw)',
// 						height: 'calc(14/412*100vw)',
// 					}}
// 				/>
// 			</div>

// 			{(isLong || isAge || isWeight) && (
// 				<FromTo
// 					data={
// 						isAge
// 							? {
// 									min: 6,
// 									max: 70,
// 								}
// 							: isWeight
// 								? {
// 										min: 10,
// 										max: 1000,
// 									}
// 								: {
// 										min: 10,
// 										max: 120,
// 									}
// 					}
// 					setValue={set_value}
// 				/>
// 			)}
// 			{isPrice && <Range setValue={setPrice} />}
// 			{(isNatural_color || isColor || isType || isCountry) && (
// 				<Checkbox options={option_checkbox} setValue={set_value_checkbox} />
// 			)}

// 			{isCity && (
// 				<>
// 					<Checkbox
// 						options={[option_checkbox[0]]}
// 						setValue={set_value_checkbox}
// 					/>

// 					{/* Московская область
// 					<div onClick={() => setIsMoscowRegionOpen(!isMoscowRegionOpen)}>
// 						<h4>Московская область</h4>
// 					</div>
// 					{isMoscowRegionOpen && (
// 						<Checkbox
// 							options={[option_checkbox[1], option_checkbox[2]]}
// 							setValue={set_value_checkbox}
// 						/>
// 					)} */}
// 					{/* Московская область */}
// 					<div onClick={() => setIsMoscowRegionOpen(!isMoscowRegionOpen)}>
// 						<Checkbox
// 							// options={['Московская область']}
// 							options={options}
// 							setValue={set_value_checkbox}
// 						/>
// 					</div>
// 					{isMoscowRegionOpen && (
// 						<Checkbox
// 							options={[option_checkbox[1], option_checkbox[2]]}
// 							setValue={set_value_checkbox}
// 						/>
// 					)}

// 					{/* Брянская область */}
// 					<div onClick={() => setIsBryanskRegionOpen(!isBryanskRegionOpen)}>
// 						<h4>Брянская область</h4>
// 					</div>
// 					{isBryanskRegionOpen && (
// 						<Checkbox
// 							options={[
// 								option_checkbox[3],
// 								option_checkbox[4],
// 								option_checkbox[5],
// 							]}
// 							setValue={set_value_checkbox}
// 						/>
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };

const PopupFilter = ({ setIsPopupFilter, button, objFunc, objState }) => {
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
	const { price } = objState;

	const [isMoscowRegionOpen, setIsMoscowRegionOpen] = useState(false);
	const [isBryanskRegionOpen, setIsBryanskRegionOpen] = useState(false);

	const isLong = button === 'Длина';
	const isPrice = button === 'Цена';
	const isNatural_color = button === 'Натуральный цвет';
	const isColor = button === 'Текущий цвет';
	const isType = button === 'Тип';
	const isAge = button === 'Возраст донора';
	const isWeight = button === 'Вес';
	const isCountry = button === 'Страна';
	const isCity = button === 'Город';

	const title = isLong
		? 'Длина, см'
		: isPrice
			? 'Цена, ₽'
			: isNatural_color
				? 'Натуральный цвет'
				: isColor
					? 'Текущий цвет'
					: isType
						? 'Тип волос'
						: isAge
							? 'Возраст донора , лет'
							: isWeight
								? 'Вес , гр'
								: button;

	const option_checkbox =
		isNatural_color || isColor
			? options_color
			: isType
				? options_type
				: isCountry
					? options_country
					: options_city;

	const set_value = isLong ? setLong : isWeight ? setWeight : setAge;
	const set_value_checkbox = isNatural_color
		? setNatural
		: isColor
			? setColor
			: isType
				? setType
				: isCountry
					? setCountry
					: setCity;

	const options = [
		{ option: 'Все' },
		{ option: 'Московская область', subOptions: ['Москва', 'Подольск'] },
		{
			option: 'Брянская область',
			subOptions: ['Брянск', 'Клинцы', 'Новозыбков'],
		},
	];

	return (
		<div className={styles.block__popup}>
			<div className={styles.block__title}>
				<h2 className={styles.title}>{title}</h2>
				<ButtonIcon
					data={{ src: '/images/icons/exit.svg' }}
					onClick={() => setIsPopupFilter(false)}
					style={{
						backgroundColor: 'transparent',
					}}
					styleImg={{
						width: 'calc(14/412*100vw)',
						height: 'calc(14/412*100vw)',
					}}
				/>
			</div>

			{(isLong || isAge || isWeight) && (
				<FromTo
					data={
						isAge
							? {
									min: 6,
									max: 70,
								}
							: isWeight
								? {
										min: 10,
										max: 1000,
									}
								: {
										min: 10,
										max: 120,
									}
					}
					setValue={set_value}
				/>
			)}
			{isPrice && <Range setValue={setPrice} price={price} />}
			{(isNatural_color || isColor || isType || isCountry) && (
				<Checkbox options={option_checkbox} setValue={set_value_checkbox} />
			)}

			{isCity && (
				<>
					<CheckboxCity options={options} setValue={set_value_checkbox} />
				</>
			)}
		</div>
	);
};

export default PopupFilter;

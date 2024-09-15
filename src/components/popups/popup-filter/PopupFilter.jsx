import {
	options_city,
	options_color,
	options_country,
	options_type,
} from '../../../data/filterSettings.data';
import ButtonIcon from '../../ui/button-icon/ButtonIcon';
import Checkbox from '../../ui/checbox/Checkbox';
import FromTo from '../../ui/from-to/FromTo';
import Range from '../../ui/range/Range';

import styles from './PopupFilter.module.scss';

const PopupFilter = ({ setIsPopupFilter, button, objFunc }) => {
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
							? 'Возраст донора , см'
							: isWeight
								? 'Вес , г'
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
					data={{
						min: 10,
						max: 120,
					}}
					setValue={set_value}
				/>
			)}
			{isPrice && <Range setValue={setPrice} />}
			{(isNatural_color || isColor || isType || isCountry || isCity) && (
				<Checkbox options={option_checkbox} setValue={set_value_checkbox} />
			)}
		</div>
	);
};

export default PopupFilter;

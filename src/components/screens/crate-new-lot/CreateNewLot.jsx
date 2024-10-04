import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import PopupTraders from '../../popups/popup-traders/PopupTraders';
import FilesAttachment from '../../ui/files-attachment/FilesAttachment';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import Textarea from '../../ui/textarea/Textarea';

import styles from './CreateNewLot.module.scss';

// const CreateNewLot = () => {
// 	const { pathname } = useLocation();
// 	const isAuction = pathname === '/lots/auction/create-new-lot';

// 	// Состояния для валидации
// 	const [isLengthValid, setIsLengthValid] = useState(true);
// 	const [isAgeValid, setIsAgeValid] = useState(true);
// 	const [isWeightValid, setIsWeightValid] = useState(true);
// 	const [isPriceValid, setIsPriceValid] = useState(true);

// 	// Функция для валидации длины (от 35 до 150)
// 	const validateLength = value => {
// 		const numValue = Number(value); // Преобразуем строку в число
// 		return /^\d+$/.test(value) && numValue >= 35 && numValue <= 150;
// 	};

// 	// Функция для валидации возраста (от 6 до 75)
// 	const validateAge = value => {
// 		const numValue = Number(value); // Преобразуем строку в число
// 		return /^\d+$/.test(value) && numValue >= 6 && numValue <= 75;
// 	};

// 	// Общая функция для обработки изменений и валидации
// 	const handleInputChange = (e, validateFunc, setValidation) => {
// 		const { value } = e.target;
// 		setValidation(validateFunc(value));
// 	};

// 	return (
// 		<Layout
// 			style={{
// 				gap: 'calc(16/412*100vw)',
// 				paddingBottom: isAuction ? 'calc(200/412*100vw)' : undefined,
// 			}}
// 		>
// 			<Navbar
// 				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
// 			/>
// 			<FilesAttachment />
// 			<Input
// 				placeholder='Введите длину (см)'
// 				label={isLengthValid ? 'Длина' : 'Длина должна быть от 35 до 150 см'}
// 				inputType='tel'
// 				onChange={e => handleInputChange(e, validateLength, setIsLengthValid)}
// 				styleInput={{
// 					borderColor: isLengthValid ? '' : colors.color_red_hight, // Если не валидно, красная граница
// 				}}
// 				styleLabel={{ color: isLengthValid ? '' : colors.color_red_hight }}
// 			/>
// 			<Select
// 				label='Натуральный цвет'
// 				placeholder='Выберите цвет'
// 				options={['Брюнет', 'Шатен', 'Рыжий', 'Русый', 'Блондин', 'Седой']}
// 			/>
// 			<Select
// 				label='Текущий цвет'
// 				placeholder='Выберите цвет'
// 				options={['Брюнет', 'Шатен', 'Рыжий', 'Русый', 'Блондин', 'Седой']}
// 			/>
// 			<Select
// 				label='Тип'
// 				placeholder='Выберите тип'
// 				options={['Прямые', 'Вьющиеся', 'Волнистые', 'Мелкие кудри']}
// 			/>
// 			<Input
// 				placeholder='Введите возраст'
// 				inputType='tel'
// 				label={
// 					isAgeValid ? 'Возраст донора' : 'Возраст должен быть от 6 до 75 лет'
// 				}
// 				onChange={e => handleInputChange(e, validateAge, setIsAgeValid)}
// 				styleInput={{
// 					borderColor: isAgeValid ? '' : colors.color_red_hight, // Если не валидно, красная граница
// 				}}
// 				styleLabel={{ color: isAgeValid ? '' : colors.color_red_hight }}
// 			/>
// 			{isAuction && (
// 				<Input
// 					placeholder='Введите вес (граммы)'
// 					label={
// 						isWeightValid ? 'Вес' : 'Введите вес в граммах, используя цифры '
// 					}
// 					inputType='tel'
// 					onChange={e => handleInputChange(e, setIsWeightValid)}
// 					styleInput={{
// 						borderColor: isWeightValid ? '' : colors.color_red_hight, // Если не валидно, красная граница
// 					}}
// 					styleLabel={{ color: isWeightValid ? '' : colors.color_red_hight }}
// 				/>
// 			)}
// 			<Textarea
// 				placeholder='Придумайте описание для своего лота'
// 				label='Свободное описание'
// 			/>
// 			{isAuction && (
// 				<Input
// 					placeholder='Введите цену (₽)'
// 					label={
// 						isPriceValid
// 							? 'Выкупная цена'
// 							: 'Введите цену в рублях, используя цифры '
// 					}
// 					inputType='tel'
// 					onChange={e => handleInputChange(e, setIsPriceValid)}
// 					styleInput={{
// 						borderColor: isPriceValid ? '' : colors.color_red_hight, // Если не валидно, красная граница
// 					}}
// 					styleLabel={{ color: isPriceValid ? '' : colors.color_red_hight }}
// 				/>
// 			)}
// 			{isAuction && (
// 				<Select
// 					label='Срок аукциона'
// 					placeholder='Выберите срок'
// 					options={[1, 2, 3]}
// 				/>
// 			)}
// 			<Button
// 				style={{
// 					fontWeight: '600',
// 				}}
// 			>
// 				{isAuction ? 'Создать аукцион' : 'Создать запрос предложений'}
// 			</Button>
// 			<InterfaceApp />
// 		</Layout>
// 	);
// };

const CreateNewLot = () => {
	const { pathname } = useLocation();
	const nav = useNavigate();
	const isAuction = pathname === '/lots/auction/create-new-lot';

	// Состояния для отслеживания валидации
	const [isLengthValid, setIsLengthValid] = useState(false); // Пусто изначально
	const [isAgeValid, setIsAgeValid] = useState(false);
	const [isWeightValid, setIsWeightValid] = useState(false);
	const [isPriceValid, setIsPriceValid] = useState(false);
	const [isViewPopup, setIsViewPopup] = useState(false);

	// Состояния для отслеживания значений полей
	const [lengthValue, setLengthValue] = useState('');
	const [ageValue, setAgeValue] = useState('');
	const [weightValue, setWeightValue] = useState('');
	const [priceValue, setPriceValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [naturalColor, setNaturalColor] = useState(null);
	const [currentColor, setCurrentColor] = useState(null);
	const [typeValue, setTypeValue] = useState(null);
	const [auctionTerm, setAuctionTerm] = useState(null);

	const [mediaFileCount, setMediaFileCount] = useState(0);

	// Валидация значений
	const validateLength = value => {
		const numValue = Number(value);
		return /^\d+$/.test(value) && numValue >= 35 && numValue <= 150;
	};

	const validateAge = value => {
		const numValue = Number(value);
		return /^\d+$/.test(value) && numValue >= 6 && numValue <= 75;
	};

	// Общая функция для обработки изменений в input
	const handleInputChange = (e, validateFunc, setValidation, setValue) => {
		const { value } = e.target;
		setValidation(validateFunc(value));
		setValue(value); // Сохраняем значение поля
	};

	// Проверка, все ли поля заполнены
	const isFormValid = () => {
		return (
			isLengthValid &&
			isAgeValid &&
			descriptionValue !== '' &&
			naturalColor &&
			currentColor &&
			typeValue &&
			mediaFileCount > 0 &&
			(isAuction ? isWeightValid && isPriceValid && auctionTerm : true)
		);
	};

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
				paddingBottom: isAuction ? 'calc(200/412*100vw)' : undefined,
			}}
		>
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>
			<FilesAttachment setMediaFileCount={setMediaFileCount} />
			<Input
				placeholder='Введите длину (см)'
				label={isLengthValid ? 'Длина' : 'Длина должна быть от 35 до 150 см'}
				inputType='tel'
				onChange={e =>
					handleInputChange(e, validateLength, setIsLengthValid, setLengthValue)
				}
				styleInput={{
					borderColor: isLengthValid ? '' : colors.color_red_hight,
				}}
				styleLabel={{ color: isLengthValid ? '' : colors.color_red_hight }}
			/>
			<Select
				label='Натуральный цвет'
				placeholder='Выберите цвет'
				options={['Брюнет', 'Шатен', 'Рыжий', 'Русый', 'Блондин', 'Седой']}
				onChange={setNaturalColor}
			/>
			<Select
				label='Текущий цвет'
				placeholder='Выберите цвет'
				options={['Брюнет', 'Шатен', 'Рыжий', 'Русый', 'Блондин', 'Седой']}
				onChange={setCurrentColor}
			/>
			<Select
				label='Тип'
				placeholder='Выберите тип'
				options={['Прямые', 'Вьющиеся', 'Волнистые', 'Мелкие кудри']}
				onChange={setTypeValue}
			/>
			<Input
				placeholder='Введите возраст'
				inputType='tel'
				label={
					isAgeValid ? 'Возраст донора' : 'Возраст должен быть от 6 до 75 лет'
				}
				onChange={e =>
					handleInputChange(e, validateAge, setIsAgeValid, setAgeValue)
				}
				styleInput={{
					borderColor: isAgeValid ? '' : colors.color_red_hight,
				}}
				styleLabel={{ color: isAgeValid ? '' : colors.color_red_hight }}
			/>
			{isAuction && (
				<Input
					placeholder='Введите вес (граммы)'
					label={
						isWeightValid ? 'Вес' : 'Введите вес в граммах, используя цифры '
					}
					inputType='tel'
					onChange={e =>
						handleInputChange(e, () => true, setIsWeightValid, setWeightValue)
					}
					styleInput={{
						borderColor: isWeightValid ? '' : colors.color_red_hight,
					}}
					styleLabel={{ color: isWeightValid ? '' : colors.color_red_hight }}
				/>
			)}
			<Textarea
				placeholder='Придумайте описание для своего лота'
				label='Свободное описание'
				onChange={e => setDescriptionValue(e.target.value)}
			/>
			{isAuction && (
				<Input
					placeholder='Введите цену (₽)'
					label={
						isPriceValid
							? 'Выкупная цена'
							: 'Введите цену в рублях, используя цифры '
					}
					inputType='tel'
					onChange={e =>
						handleInputChange(e, () => true, setIsPriceValid, setPriceValue)
					}
					styleInput={{
						borderColor: isPriceValid ? '' : colors.color_red_hight,
					}}
					styleLabel={{ color: isPriceValid ? '' : colors.color_red_hight }}
				/>
			)}
			{isAuction && (
				<Select
					label='Срок аукциона'
					placeholder='Выберите срок'
					options={[1, 2, 3]}
					onChange={setAuctionTerm}
				/>
			)}
			<Button
				disabled={!isFormValid()} // Отключаем кнопку, если форма не валидна
				style={{ fontWeight: '600' }}
				onClick={() => setIsViewPopup(true)}
			>
				{isAuction ? 'Создать аукцион' : 'Создать запрос предложений'}
			</Button>
			{isViewPopup && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => setIsViewPopup(false)}
					/>
					<PopupTraders
						onClick={() => setIsViewPopup(false)}
						onClickHold={() => {
							if (isAuction) {
								nav('/lots/auction');
							} else {
								nav('/lots/offer');
							}
						}}
						button={'Заморозка'}
						lot={{ descriptionTrade: [0, 1, 2, 'Заморозка'] }}
					/>
				</>
			)}
			<InterfaceApp />
		</Layout>
	);
};

export default CreateNewLot;

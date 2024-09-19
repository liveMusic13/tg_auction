import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import FilesAttachment from '../../ui/files-attachment/FilesAttachment';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import Textarea from '../../ui/textarea/Textarea';

const CreateNewLot = () => {
	const { pathname } = useLocation();
	const isAuction = pathname === '/lots/auction/create-new-lot';

	// Состояния для валидации
	const [isLengthValid, setIsLengthValid] = useState(true);
	const [isAgeValid, setIsAgeValid] = useState(true);
	const [isWeightValid, setIsWeightValid] = useState(true);
	const [isPriceValid, setIsPriceValid] = useState(true);

	// Функция для валидации (допускаются только цифры)
	const validateInput = value => {
		return /^\d*$/.test(value); // Проверяет, что строка состоит только из цифр
	};

	// Функция для обработки изменений и валидации
	const handleInputChange = (e, setValidation) => {
		const { value } = e.target;
		setValidation(validateInput(value));
	};

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
				paddingBottom: isAuction ? 'calc(200/412*100vw)' : undefined,
			}}
		>
			<Header />
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>
			<FilesAttachment />
			<Input
				placeholder='Введите длину (см)'
				label='Длина'
				inputType='tel'
				onChange={e => handleInputChange(e, setIsLengthValid)}
				styleInput={{
					borderColor: isLengthValid ? '' : colors.color_red_hight, // Если не валидно, красная граница
				}}
				styleLabel={{ color: isLengthValid ? '' : colors.color_red_hight }}
			/>
			<Select
				label='Натуральный цвет'
				placeholder='Выберите цвет'
				options={[1, 2, 3]}
			/>
			<Select
				label='Текущий цвет'
				placeholder='Выберите цвет'
				options={[1, 2, 3]}
			/>
			<Select label='Тип' placeholder='Выберите тип' options={[1, 2, 3]} />
			<Input
				placeholder='Введите возраст'
				label='Возраст донора'
				onChange={e => handleInputChange(e, setIsAgeValid)}
				styleInput={{
					borderColor: isAgeValid ? '' : colors.color_red_hight, // Если не валидно, красная граница
				}}
				styleLabel={{ color: isAgeValid ? '' : colors.color_red_hight }}
			/>
			{isAuction && (
				<Input
					placeholder='Введите вес (граммы)'
					label='Вес'
					onChange={e => handleInputChange(e, setIsWeightValid)}
					styleInput={{
						borderColor: isWeightValid ? '' : colors.color_red_hight, // Если не валидно, красная граница
					}}
					styleLabel={{ color: isWeightValid ? '' : colors.color_red_hight }}
				/>
			)}
			<Textarea
				placeholder='Придумайте описание для своего лота'
				label='Свободное описание'
			/>
			{isAuction && (
				<Input
					placeholder='Введите цену (₽)'
					label='Выкупная цена'
					onChange={e => handleInputChange(e, setIsPriceValid)}
					styleInput={{
						borderColor: isPriceValid ? '' : colors.color_red_hight, // Если не валидно, красная граница
					}}
					styleLabel={{ color: isPriceValid ? '' : colors.color_red_hight }}
				/>
			)}
			{isAuction && (
				<Select
					label='Срок аукциона'
					placeholder='Выберите срок'
					options={[1, 2, 3]}
				/>
			)}
			<Button
				style={{
					fontWeight: '600',
				}}
			>
				{isAuction ? 'Создать аукцион' : 'Создать запрос предложений'}
			</Button>
			<InterfaceApp />
		</Layout>
	);
};

export default CreateNewLot;

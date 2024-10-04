import { useState } from 'react';

import Button from '@/components/ui/button/Button';

import { colors } from '../../../app.constants';
import Input from '../../ui/input/Input';
import Textarea from '../../ui/textarea/Textarea';

import styles from './PopupTraders.module.scss';

const PopupTraders = ({ button, onClick, lot, onClickHold }) => {
	const isBet = button === 'Сделать ставку';
	const isAutoBet = button === 'Автоставка';
	const isOffer = button === 'Сделать предложение';
	const isPay = button === 'Оплатить';
	const isHold = button === 'Заморозка';

	const startValue = isPay ? 5000 : isHold ? 500 : '';
	const [valueInput, setValueInput] = useState(startValue);

	const title = isBet
		? 'Сделать ставку'
		: isPay
			? 'Оплатить'
			: isOffer
				? 'Сделать предложение'
				: isHold
					? 'Подтвердите действие'
					: 'Автоставка';

	const balance = 5000;
	const actualBet = 5000;
	const holdPrice = 500;

	const [isPriceValid, setIsPriceValid] = useState(true);

	// Функция для валидации (допускаются только цифры)
	const validateInput = value => {
		return /^\d*$/.test(value); // Проверяет, что строка состоит только из цифр
	};

	const handleInputChange = (e, setValidation) => {
		const { value } = e.target;
		setValidation(validateInput(value));
	};

	return (
		<div className={styles.block__popup}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.block__description}>
				{isHold ? (
					<p className={styles.description}>
						<span>Заморожено:</span>
						{holdPrice} ₽
					</p>
				) : (
					<p className={styles.description}>
						<span>Текущая цена:</span>
						{actualBet} ₽
					</p>
				)}
				<p className={styles.description}>
					<span>Ваш баланс:</span>
					{balance} ₽
				</p>
			</div>
			<Input
				label='Сумма'
				inputType='tel'
				placeholder={
					isBet || isOffer || isPay
						? 'Введите сумму'
						: 'Введите сумму кратную шагу аукциона'
				}
				styleInput={
					balance < Number(valueInput) || !isPriceValid
						? { borderColor: colors.color_red_hight }
						: {}
				}
				styleLabel={
					balance < Number(valueInput) || !isPriceValid
						? { color: colors.color_red_hight }
						: {}
				}
				value={valueInput}
				onChange={e => {
					handleInputChange(e, setIsPriceValid);
					setValueInput(e.target.value);
				}}
			/>

			{lot.descriptionTrade[3] === 'Прием предложений' && (
				<Textarea
					label={'Текст предложения'}
					placeholder={'Напишите текст предложения'}
					style={{ height: 'calc(156/412*100vw)' }}
				/>
			)}

			{lot.descriptionTrade[3] === 'Заморозка' ? (
				<div className={styles.block__buttons}>
					<Button
						style={{
							width: '48%',
							fontSize: '0.95rem',
						}}
						onClick={onClickHold}
						disabled={
							valueInput === '' || balance < Number(valueInput) || !isPriceValid
						}
					>
						Да
					</Button>
					<Button
						style={{
							width: '48%',
							fontSize: '0.95rem',
						}}
						onClick={onClick}
					>
						Нет
					</Button>
				</div>
			) : (
				<Button
					style={{
						width: '100%',
						// backgroundColor: colors.color_white,
						// color: colors.color_red_hight,
						fontSize: '0.95rem',
					}}
					onClick={onClick}
					disabled={
						valueInput === '' || balance < Number(valueInput) || !isPriceValid
					}
				>
					{lot.descriptionTrade[3] === 'Прием предложений'
						? 'Предложить'
						: lot.descriptionTrade[3] === 'Оплатить'
							? 'Оплатить'
							: 'Поставить'}
				</Button>
			)}
		</div>
	);
};

export default PopupTraders;

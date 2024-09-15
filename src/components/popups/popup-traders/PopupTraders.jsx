import { useEffect, useState } from 'react';

import Button from '@/components/ui/button/Button';

import { colors } from '../../../app.constants';
import Input from '../../ui/input/Input';
import Textarea from '../../ui/textarea/Textarea';

import styles from './PopupTraders.module.scss';

const PopupTraders = ({ button, onClick, lot }) => {
	const [valueInput, setValueInput] = useState('');

	const isBet = button === 'Сделать ставку';
	const isAutoBet = button === 'Автоставка';
	const isOffer = button === 'Сделать предложение';

	const title = isBet
		? 'Сделать ставку'
		: isOffer
			? 'Сделать предложение'
			: 'Автоставка';

	const balance = 5000;
	const actualBet = 5000;

	useEffect(() => {
		console.log(balance < Number(valueInput), lot);
	}, [valueInput]);

	return (
		<div className={styles.block__popup}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.block__description}>
				<p className={styles.description}>
					<span>Текущая цена:</span>
					{actualBet} ₽
				</p>
				<p className={styles.description}>
					<span>Ваш баланс:</span>
					{balance} ₽
				</p>
			</div>
			<Input
				label='Сумма'
				placeholder={
					isBet || isOffer
						? 'Введите сумму'
						: 'Введите сумму кратную шагу аукциона'
				}
				styleInput={
					balance < Number(valueInput)
						? { borderColor: colors.color_red_hight }
						: {}
				}
				styleLabel={
					balance < Number(valueInput) ? { color: colors.color_red_hight } : {}
				}
				value={valueInput}
				onChange={e => setValueInput(e.target.value)}
			/>

			{lot.descriptionTrade[3] === 'Прием предложений' && (
				<Textarea
					label={'Текст предложения'}
					placeholder={'Напишите текст предложения'}
					style={{ height: 'calc(156/412*100vw)' }}
				/>
			)}

			<Button
				style={{
					width: '100%',
					// backgroundColor: colors.color_white,
					// color: colors.color_red_hight,
					fontSize: '0.95rem',
				}}
				onClick={onClick}
				disabled={valueInput === ''}
			>
				{lot.descriptionTrade[3] === 'Прием предложений'
					? 'Предложить'
					: 'Поставить'}
			</Button>
		</div>
	);
};

export default PopupTraders;

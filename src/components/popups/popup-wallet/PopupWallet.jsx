import { useState } from 'react';

import Button from '@/components/ui/button/Button';

import { colors } from '../../../app.constants';
import CardsCount from '../../cards-count/CardsCount';
import Input from '../../ui/input/Input';

import styles from './PopupWallet.module.scss';

const PopupWallet = ({
	buttonClick,
	setIsViewPopup,
	cards,
	handleCardClick,
	selectedCard,
}) => {
	const title =
		buttonClick === 'i'
			? 'Средства заморожены на:'
			: buttonClick === 'Добавить'
				? 'Добавить карту'
				: buttonClick === 'Снять'
					? 'Снять средства'
					: 'Пополнить баланс';

	const isFrozen = buttonClick === 'i';
	const arrFrozen = [
		'Обеспечение торгов',
		'-5 000 ₽',
		'12ч 00м 00с',
		'Аукцион',
		'Прием ставок',
		'80 см',
		'330 г',
		'Россия, Самара',
	];
	const isAddCard = buttonClick === 'Добавить';
	const isTakeMoney = buttonClick === 'Снять';
	const isAddMoney = buttonClick === 'Пополнить';

	const [isValidNumCard, setIsValidNumCard] = useState(true);
	const [isValidDate, setIsValidDate] = useState(true);
	const [isValidMoney, setIsValidMoney] = useState(true);

	const validateNumCard = value => /^(?:\d{4}\s?){4}$/.test(value);
	const validateNumDate = value => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
	const validateInput = value => /^\d*$/.test(value);

	const handleInputChange = (e, setIsValid, input) => {
		const value = e.target.value;
		if (input === 'card') {
			if (validateNumCard(value)) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
		} else if (input === 'date') {
			if (validateNumDate(value)) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
		} else if (input === 'money') {
			if (validateInput(value)) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
		}
	};

	return (
		<div className={styles.block__popup}>
			<h2 className={styles.title}>{title}</h2>
			{isFrozen && (
				<div className={styles.block__frozens}>
					<div className={styles.block__frozen}>
						<img
							src='/images/test.png'
							alt='image'
							className={styles.frozen__image}
						/>
						<div className={styles.frozen__description}>
							{arrFrozen.map(el => (
								<p className={styles.description}>
									<span className={styles.circle}></span>
									{el}
								</p>
							))}
						</div>
					</div>
					<div className={styles.block__frozen}>
						<img
							src='/images/test.png'
							alt='image'
							className={styles.frozen__image}
						/>
						<div className={styles.frozen__description}>
							{arrFrozen.map(el => (
								<p className={styles.description}>
									<span className={styles.circle}></span>
									{el}
								</p>
							))}
						</div>
					</div>
				</div>
			)}

			{isAddCard && (
				<div className={styles.block__addCard}>
					<Input
						label='Номер карты'
						placeholder='Введите номер карты'
						onChange={e => handleInputChange(e, setIsValidNumCard, 'card')}
						styleInput={{
							borderColor: isValidNumCard ? '' : colors.color_red_hight, // Если не валидно, красная граница
						}}
						styleLabel={{
							color: isValidNumCard ? '' : colors.color_red_hight,
						}}
					/>
					<div className={styles.block__cvv}>
						<Input
							label='Месяц/Год'
							placeholder='Введите срок карты'
							style={{ width: '48%' }}
							onChange={e => handleInputChange(e, setIsValidDate, 'date')}
							styleInput={{
								borderColor: isValidDate ? '' : colors.color_red_hight, // Если не валидно, красная граница
							}}
							styleLabel={{
								color: isValidDate ? '' : colors.color_red_hight,
							}}
						/>
						<Input
							label='CVC2-код'
							placeholder='Введите код'
							style={{ width: '48%' }}
						/>
					</div>
					<Button
						style={{ width: '100%' }}
						onClick={() => setIsViewPopup(false)}
						disabled={!isValidNumCard || !isValidDate}
					>
						Добавить карту
					</Button>
				</div>
			)}

			{(isTakeMoney || isAddMoney) && (
				<div className={styles.block__takeMoney}>
					<CardsCount
						cards={cards}
						selectedCard={selectedCard}
						handleCardClick={handleCardClick}
						style={{ gap: 'calc(4/412*100vw)' }}
					/>
					<Input
						label='Сумма'
						placeholder={`Введите сумму для ${isAddMoney ? 'зачисления' : 'вывода'}`}
						onChange={e => handleInputChange(e, setIsValidMoney, 'money')}
						styleInput={{
							borderColor: isValidMoney ? '' : colors.color_red_hight, // Если не валидно, красная граница
						}}
						styleLabel={{
							color: isValidMoney ? '' : colors.color_red_hight,
						}}
					/>
					<Button
						style={{ width: '100%' }}
						onClick={() => setIsViewPopup(false)}
						disabled={!isValidMoney}
					>
						{isAddMoney ? 'Пополнить баланс' : 'Снять средства'}{' '}
					</Button>
				</div>
			)}
		</div>
	);
};

export default PopupWallet;

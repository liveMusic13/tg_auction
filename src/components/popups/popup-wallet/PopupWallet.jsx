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
	handleDeleteCard,
}) => {
	const title =
		buttonClick === 'i'
			? 'Средства заморожены на:'
			: buttonClick === 'Добавить'
				? 'Добавить карту'
				: buttonClick === 'Удалить'
					? 'Удалить карту'
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
	const arrFrozenOffer = [
		'Обеспечение предложений',
		'-5 000 ₽',
		'12ч 00м 00с',
		'Запрос предложений',
		'Прием предложений',
		'323480 см',
		'1330 г',
		'Россия, Самара',
	];
	const isAddCard = buttonClick === 'Добавить';
	const isTakeMoney = buttonClick === 'Снять';
	const isAddMoney = buttonClick === 'Пополнить';
	const isDelete = buttonClick === 'Удалить';

	const [isValidNumCard, setIsValidNumCard] = useState(true);
	const [isValidDate, setIsValidDate] = useState(true);
	const [isValidMoney, setIsValidMoney] = useState(true);
	const [cardDate, setCardDate] = useState(''); // Хранит ввод для Месяц/Год
	const [cardNumber, setCardNumber] = useState('');

	const validateNumCard = value => /^(?:\d{4}\s?){4}$/.test(value);
	const validateNumDate = value => /^\d{2}\/\d{2}$/.test(value);
	const validateInput = value => /^\d*$/.test(value);

	const handleInputChange = (e, setIsValid, input) => {
		const value = e.target.value;

		if (input === 'card') {
			let formatCardNumber = value
				.replace(/\s+/g, '')
				.replace(/(\d{4})(?=\d)/g, '$1 ');
			setCardNumber(formatCardNumber);
			if (validateNumCard(formatCardNumber)) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
		} else if (input === 'date') {
			// Логика для Месяц/Год с автодобавлением "/"
			let formattedValue = value.replace(/\D/g, ''); // Удаляем все нецифровые символы

			// if (formattedValue.length > 2) {
			// 	formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`; // Добавляем "/"
			// }
			console.log('formattedValue)', formattedValue.length);

			if (formattedValue.length >= 2) {
				// Добавляем "/" после второго символа
				formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
			} else {
				// Если длина меньше 2, возвращаем без "/"
				console.log('ok');
				formattedValue = formattedValue.slice(0, 2);
			}

			setCardDate(formattedValue); // Обновляем state
			if (validateNumDate(formattedValue)) {
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
			<div className={styles.block__title}>
				<h2 className={styles.title}>{title}</h2>
				<button
					className={styles.button__exit}
					onClick={() => setIsViewPopup(false)}
				>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			{isFrozen && (
				<div className={styles.block__frozens}>
					<div className={styles.block__frozen}>
						<img
							src='/images/test.png'
							alt='image'
							className={styles.frozen__image}
						/>
						<div className={styles.frozen__description}>
							{arrFrozenOffer.map(el => (
								<p key={el} className={styles.description}>
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
								<p key={el} className={styles.description}>
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
								<p key={el} className={styles.description}>
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
						value={cardNumber}
						onChange={e =>
							handleInputChange(e, setIsValidNumCard, 'card', setCardDate)
						}
						inputType='tel'
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
							inputType='tel'
							style={{ width: '48%' }}
							onChange={e =>
								handleInputChange(e, setIsValidDate, 'date', setCardDate)
							}
							value={cardDate} // Связываем с состоянием
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
							inputType='tel'
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
						inputType='tel'
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

			{isDelete && (
				<>
					<CardsCount
						cards={cards}
						selectedCard={selectedCard}
						handleCardClick={handleCardClick}
						style={{ gap: 'calc(4/412*100vw)' }}
					/>
					<Button
						style={{ width: '100%' }}
						onClick={handleDeleteCard}
						disabled={selectedCard === null}
					>
						Удалить карту
					</Button>
				</>
			)}
		</div>
	);
};

export default PopupWallet;

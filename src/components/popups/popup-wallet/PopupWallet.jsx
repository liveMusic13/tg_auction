import Button from '@/components/ui/button/Button';

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

	return (
		<div className={styles.block__popup}>
			<h2 className={styles.title}>{title}</h2>
			{isFrozen && (
				<div className={styles.block__frozens}>
					<div className={styles.block__frozen}>
						<img
							src='/public/images/test.png'
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
							src='/public/images/test.png'
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
					<Input label='Номер карты' placeholder='Введите номер карты' />
					<div className={styles.block__cvv}>
						<Input
							label='Месяц/Год'
							placeholder='Введите срок карты'
							style={{ width: '48%' }}
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
					/>
					<Button
						style={{ width: '100%' }}
						onClick={() => setIsViewPopup(false)}
					>
						{isAddMoney ? 'Пополнить баланс' : 'Снять средства'}{' '}
					</Button>
				</div>
			)}
		</div>
	);
};

export default PopupWallet;

import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import { arrCards } from '../../../data/mock.data';
import BlockBalance from '../../block-balance/BlockBalance';
import CardsCount from '../../cards-count/CardsCount';
import HistoryCash from '../../history-cash/HistoryCash';
import PopupWallet from '../../popups/popup-wallet/PopupWallet';

import styles from './Wallet.module.scss';

const Wallet = () => {
	const [isViewPopup, setIsViewPopup] = useState(false);
	const [buttonClick, setButtonClick] = useState(false);
	// Состояние для отслеживания выбранной карты
	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState(arrCards); // Используем cards вместо arrCards

	// Функция для выделения карты
	const handleCardClick = cardNumber => {
		setSelectedCard(cardNumber); // Устанавливаем номер выбранной карты
	};

	// Функция для удаления карты
	const handleDeleteCard = () => {
		if (selectedCard !== null) {
			// Удаляем выбранную карту из массива
			setCards(cards.filter(card => card.number !== selectedCard));
			setSelectedCard(null); // Сбрасываем выбранную карту после удаления
		}
	};

	const onClick = but => {
		setButtonClick(but);
		setIsViewPopup(true);
	};

	return (
		<Layout style={{ gap: 'calc(16/412*100vw)' }}>
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>
			<Button
				style={{
					color: colors.color_blue,
					backgroundColor: colors.color_light_blue,
					fontWeight: '600',
					width: 'auto',
					alignSelf: 'flex-start',
				}}
			>
				Привязать Telegram Wallet
			</Button>
			<BlockBalance onClick={onClick} />
			<div className={styles.block__cards}>
				<h2 className={styles.title}>Привязанные карты</h2>
				<CardsCount
					cards={cards}
					selectedCard={selectedCard}
					handleCardClick={handleCardClick}
				/>
				<div className={styles.block__buttons}>
					<Button
						style={{
							width: 'auto',
						}}
						onClick={() => onClick('Добавить')}
					>
						Добавить
					</Button>
					<Button
						onClick={handleDeleteCard} // Вызываем функцию удаления карты
						style={{
							width: 'auto',
							backgroundColor: colors.color_white,
							color: colors.color_blue,
						}}
					>
						Удалить
					</Button>
				</div>
			</div>
			<HistoryCash />
			{isViewPopup && (
				<div
					className={styles.block__opacity}
					onClick={() => setIsViewPopup(false)}
				></div>
			)}
			{isViewPopup && (
				<PopupWallet
					buttonClick={buttonClick}
					setIsViewPopup={setIsViewPopup}
					cards={cards}
					selectedCard={selectedCard}
					handleCardClick={handleCardClick}
				/>
			)}
			<InterfaceApp />
		</Layout>
	);
};

export default Wallet;

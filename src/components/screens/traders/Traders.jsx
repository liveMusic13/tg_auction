import { useEffect, useState } from 'react';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import ButtonIcon from '@/components/ui/button-icon/ButtonIcon';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { mockTrade } from '../../../data/mock.data';
import Sorted from '../../sorted/Sorted';
import Trade from '../../trade/Trade';

import styles from './Traders.module.scss';
import { IS_PRO } from '@/app.constants';
import { settingsNoPro, settingsPro } from '@/data/buttonIcon.data';

// Функция для преобразования строки времени в секунды
const convertTimeToSeconds = timeString => {
	const [hours, minutes, seconds] = timeString
		.replace(/[чмс]/g, '') // Удаляем буквы 'ч', 'м', 'с'
		.split(' ')
		.map(Number);
	return hours * 3600 + minutes * 60 + seconds;
};

// Фильтрация и сортировка по времени
const sortTradesByTime = (trades, isDescending) => {
	return trades.sort((a, b) => {
		const timeA = convertTimeToSeconds(a.description[1]);
		const timeB = convertTimeToSeconds(b.description[1]);
		return isDescending ? timeB - timeA : timeA - timeB;
	});
};

// // Функция для преобразования строки длины в число
// const convertLengthToNumber = lengthString => {
// 	return Number(lengthString.replace('см', '').trim());
// };

// Функция для преобразования строки длины или цены в число
const convertLengthToNumber = str => {
	return Number(str.replace(/(см|₽)/g, '').trim());
};

// Функция для сортировки по длине
const sortTradesByLength = (trades, isDescending, num) => {
	return trades.sort((a, b) => {
		const lengthA = convertLengthToNumber(a.description[num]); // Длина находится в индексе 4
		const lengthB = convertLengthToNumber(b.description[num]);
		return isDescending ? lengthB - lengthA : lengthA - lengthB;
	});
};

const Traders = () => {
	const [sortedTrades, setSortedTrades] = useState(mockTrade);
	const [isPopup, setIsPopup] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState(null);

	const _onSorted = () => {
		setIsPopup(!isPopup);
		console.log('ok');
	};

	useEffect(() => {
		if (selectedFilter === 0) {
			const sorted = sortTradesByLength([...mockTrade], false, 0); // Сортировка по возрастанию длины
			setSortedTrades(sorted);
		} else if (selectedFilter === 1) {
			const sorted = sortTradesByLength([...mockTrade], true, 0); // Сортировка по убыванию длины
			setSortedTrades(sorted);
		} else if (selectedFilter === 2) {
			const sorted = sortTradesByTime([...mockTrade], true); // Сортировка по убыванию времени
			setSortedTrades(sorted);
		} else if (selectedFilter === 3) {
			const sorted = sortTradesByTime([...mockTrade], false); // Сортировка по возрастанию времени
			setSortedTrades(sorted);
		} else if (selectedFilter === 4) {
			const sorted = sortTradesByLength([...mockTrade], false, 4); // Сортировка по возрастанию длины
			setSortedTrades(sorted);
		} else if (selectedFilter === 5) {
			const sorted = sortTradesByLength([...mockTrade], true, 4); // Сортировка по убыванию длины
			setSortedTrades(sorted);
		}
	}, [selectedFilter]);

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
				overflowY: isPopup ? 'hidden' : 'auto',
			}}
		>
			{isPopup && <div className={styles.block__opacity}></div>}
			<Header />
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>

			{IS_PRO ? (
				<div className={`${styles.block__settings} ${styles.pro}`}>
					<ButtonIcon data={settingsPro[0]} />
					<div className={styles.center}>
						<ButtonIcon data={settingsPro[1]} />
						<ButtonIcon data={settingsPro[2]} />
					</div>
					<ButtonIcon onClick={_onSorted} data={settingsPro[3]} />
				</div>
			) : (
				<div className={`${styles.block__settings} ${styles.no_pro}`}>
					{settingsNoPro.map(button => (
						<ButtonIcon
							onClick={button.id === 1 ? _onSorted : undefined}
							key={button.id}
							data={button}
						/>
					))}
				</div>
			)}

			{sortedTrades.map(trade => (
				<Trade key={trade.id} data={trade} />
			))}

			{isPopup && (
				<Sorted
					onClick={_onSorted}
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
				/>
			)}

			<InterfaceApp />
		</Layout>
	);
};

export default Traders;

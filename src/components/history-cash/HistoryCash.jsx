import { useState } from 'react';

import Button from '@/components/ui/button/Button';

import { colors } from '../../app.constants';
import { arrHistory } from '../../data/mock.data';

import styles from './HistoryCash.module.scss';

const HistoryCash = () => {
	const historyCount = 2;
	const [visibleCount, setVisibleCount] = useState(historyCount);

	const showMoreTransactions = () => {
		setVisibleCount(prevCount => prevCount + historyCount);
	};

	return (
		<div className={styles.block__history}>
			<h2 className={styles.title}>История операций</h2>
			<div className={styles.history}>
				{arrHistory.slice(0, visibleCount).map(transaction => {
					const isPlus = transaction.count.slice(0, 1) === '+';
					return (
						<div key={transaction.id} className={styles.block__transaction}>
							<img
								src={
									isPlus
										? '/images/icons/history/arrow_bot.svg'
										: '/images/icons/history/arrow_top.svg'
								}
								alt='img'
								className={styles.arrow}
							/>
							<div className={styles.description}>
								<div className={styles.block__one}>
									<h3 className={styles.type}>{transaction.type}</h3>
									<p
										className={styles.count}
										style={
											isPlus
												? { color: colors.color_green }
												: { color: colors.color_red_hight }
										}
									>
										{transaction.count}
									</p>
								</div>
								<p className={styles.text}>{transaction.description}</p>
							</div>
							<p className={styles.data}>{transaction.data}</p>
						</div>
					);
				})}
			</div>
			{visibleCount !== arrHistory.length && (
				<Button
					style={{
						width: 'auto',
						backgroundColor: colors.color_white,
						color: colors.color_blue,
					}}
					onClick={showMoreTransactions}
				>
					Показать еще
				</Button>
			)}
		</div>
	);
};

export default HistoryCash;

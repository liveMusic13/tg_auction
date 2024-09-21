import { useState } from 'react';

import styles from './BlockStatus.module.scss';

const STATUSES = [
	'Прием предложений',
	'Определение победителя',
	'Состоялся',
	'Оплачен',
	'Отправлен',
	'Завершен',
];

// const BlockStatus = ({ data }) => {
// 	const currentStatusIndex = STATUSES.findIndex(
// 		status => data.description[3] === status,
// 	);

// 	return (
// 		<div className={styles.block__status}>
// 			{STATUSES.map((status, index) => (
// 				<div key={status} className={styles.statusItem}>
// 					<div className={styles.block__visual}>
// 						<div
// 							className={`${styles.circle} ${
// 								index <= currentStatusIndex ? styles.active : styles.inactive
// 							}`}
// 						></div>

// 						{index < STATUSES.length - 1 && (
// 							<div
// 								className={`${styles.line} ${
// 									index < currentStatusIndex ? styles.active : styles.inactive
// 								}`}
// 							></div>
// 						)}
// 					</div>

// 					<div className={styles.block__text}>
// 						<div className={styles.statusText}>{status}</div>
// 						<p className={styles.dopText}>
// 							{status === 'Состоялся'
// 								? `таймер ${data.description[4]}`
// 								: 'Дата'}
// 						</p>
// 					</div>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

const BlockStatus = ({ data }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const currentStatusIndex = STATUSES.findIndex(
		status => data.description[3] === status,
	);

	const toggleView = () => setIsExpanded(prev => !prev);

	return (
		<div
			className={styles.block__status}
			style={isExpanded ? {} : { padding: 0 }}
			// onClick={() => (isExpanded ? undefined : setIsExpanded(true))}
			onClick={() => setIsExpanded(!isExpanded)}
		>
			{isExpanded ? (
				// Развернутый вид
				STATUSES.map((status, index) => (
					<div key={status} className={styles.statusItem}>
						<div className={styles.block__visual}>
							<div
								className={`${styles.circle} ${
									index <= currentStatusIndex ? styles.active : styles.inactive
								}`}
							></div>

							{index < STATUSES.length - 1 && (
								<div
									className={`${styles.line} ${
										index < currentStatusIndex ? styles.active : styles.inactive
									}`}
								></div>
							)}
						</div>

						<div className={styles.block__text}>
							<div className={styles.statusText}>{status}</div>
							<p className={styles.dopText}>
								{status === 'Состоялся'
									? `таймер ${data.description[4]}`
									: 'Дата'}
							</p>
						</div>
					</div>
				))
			) : (
				// Свернутый вид
				<div className={styles.statusCollapsed}>
					<div className={styles.line__mini}></div>
					<p className={styles.statusText_mini}>Статус:</p>
					<p className={styles.activeStatus_mini}>
						{STATUSES[currentStatusIndex]}
					</p>
				</div>
			)}
		</div>
	);
};

export default BlockStatus;

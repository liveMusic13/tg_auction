import styles from './BlockStatus.module.scss';

const STATUSES = [
	'Запрос предложений',
	'Прием предложений',
	'Определение победителя',
	'Состоялся',
	'Оплачен',
	'Отправлен',
	'Завершен',
];

const BlockStatus = ({ data }) => {
	const currentStatusIndex = STATUSES.findIndex(
		status => data.description[3] === status,
	);

	return (
		<div className={styles.block__status}>
			{STATUSES.map((status, index) => (
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
			))}
		</div>
	);
};

export default BlockStatus;

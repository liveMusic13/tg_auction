import Button from '@/components/ui/button/Button';

import { colors } from '../../app.constants';

import styles from './BlockBalance.module.scss';

const BlockBalance = ({ onClick }) => {
	return (
		<div className={styles.wrapper_balance}>
			<div className={styles.block__balance}>
				<h2 className={styles.title}>Баланс</h2>
				<div className={styles.block__two}>
					<p className={styles.check}>5 000 ₽</p>
					<div className={styles.block__buttons}>
						<Button
							style={{
								width: 'auto',
								// fontSize: '0.95rem'
							}}
							onClick={() => onClick('Пополнить')}
						>
							Пополнить
						</Button>
						<Button
							style={{
								width: 'auto',
								// fontSize: '0.95rem',
								backgroundColor: colors.color_white,
								color: colors.color_blue,
							}}
							onClick={() => onClick('Снять')}
						>
							Снять
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.block__balance}>
				<h2 className={styles.title}>Замороженные средства</h2>
				<div className={`${styles.block__two} ${styles.two}`}>
					<p className={styles.check} style={{ color: colors.color_grey }}>
						5 000 ₽
					</p>
					<button className={styles.button} onClick={() => onClick('i')}>
						<img src='/images/icons/buttons/i.svg' alt='i' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlockBalance;

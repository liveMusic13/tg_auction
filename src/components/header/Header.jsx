import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.block_one}>
				<button className={styles.button}>
					<img src='/images/icons/exit.svg' alt='img' />
				</button>
				<h1 className={styles.title}>HairAuction</h1>
			</div>
			<div className={styles.block_two}>
				<button className={styles.button}>
					<img src='/images/icons/arrow_bottom.svg' alt='img' />
				</button>
				<button className={styles.button}>
					<img src='/images/icons/settings.svg' alt='img' />
				</button>
			</div>
		</header>
	);
};

export default Header;

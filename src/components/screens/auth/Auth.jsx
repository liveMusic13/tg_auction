import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button/Button';

import styles from './Auth.module.scss';

const Auth = () => {
	return (
		<Layout style={{ justifyContent: 'center' }}>
			<Header />

			<div className={styles.block__hello}>
				<img src='/vite.svg' alt='logo' className={styles.image__hello} />
				<h2 className={styles.name}>HairAuction</h2>
				<p className={styles.description}>
					Аукцион по продаже натуральных волос
				</p>
			</div>

			<Button style={{ position: 'fixed', bottom: 'calc(24/412*100vw)' }}>
				Войти с Telegram
			</Button>
		</Layout>
	);
};

export default Auth;

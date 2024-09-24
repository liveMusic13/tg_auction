import { useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';

import styles from './Auth.module.scss';

const Auth = () => {
	const nav = useNavigate();

	return (
		<Layout style={{ justifyContent: 'center' }}>
			<div className={styles.block__hello}>
				<img src='/vite.svg' alt='logo' className={styles.image__hello} />
				<h2 className={styles.name}>HairAuction</h2>
				<p className={styles.description}>
					Аукцион по продаже натуральных волос
				</p>
			</div>

			<Button
				style={{ position: 'fixed', bottom: 'calc(24/412*100vw)' }}
				onClick={() => nav('/traders')}
			>
				Войти с Telegram
			</Button>
		</Layout>
	);
};

export default Auth;

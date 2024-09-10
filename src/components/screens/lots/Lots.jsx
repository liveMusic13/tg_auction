import { useNavigate } from 'react-router-dom';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { IS_PRO, colors } from '../../../app.constants';

import styles from './Lots.module.scss';

const Lots = () => {
	const nav = useNavigate();
	const styleButton = { width: 'auto' };
	const styleA = { width: 'calc(149/412*100vw)' };

	const onClick = but => {
		if (but === 'offer') {
			nav('/lots/offer');
		} else if (but === 'auc' && IS_PRO) {
			console.log('pro yes');
			nav('/lots/auction');
		} else if (but === 'auc' && !IS_PRO) {
			console.log('pro no');
			nav('/wallet/pro');
		}
	};

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
			}}
		>
			<Header />
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>

			<div className={styles.block__links}>
				<img
					src='/images/icons/lots/offer.svg'
					alt='offer'
					className={styles.image}
				/>
				<div className={styles.description}>
					<h3 className={styles.title}>Запросы предложений</h3>
					<p className={styles.text}>
						Делайте запросы предложений, управляйте существующими, получайте
						отклики
					</p>
				</div>
				<Button style={styleButton} onClick={() => onClick('offer')}>
					Перейти
				</Button>
			</div>
			<div className={styles.block__links}>
				<img
					src={
						IS_PRO
							? '/images/icons/lots/hammer_active.svg'
							: '/images/icons/lots/hammer.svg'
					}
					alt='offer'
					className={styles.image}
				/>
				<div className={`${styles.description} ${styles.auc}`}>
					<h3
						className={styles.title}
						style={IS_PRO ? {} : { color: colors.color_grey }}
					>
						Аукционы
					</h3>
					<p className={styles.text}>
						Создавайте свои аукционы и управляйте существующими
					</p>
				</div>
				<Button style={styleA} onClick={() => onClick('auc')}>
					{IS_PRO ? 'Перейти' : 'Подключить PRO'}
				</Button>
			</div>

			<InterfaceApp />
		</Layout>
	);
};

export default Lots;

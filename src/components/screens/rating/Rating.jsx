import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { renderStars } from '../../stars/Stars';

import styles from './Rating.module.scss';

const Rating = () => {
	const styleStar = {
		width: 'calc(28/412*100vw)',
		height: 'calc(28/412*100vw)',
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
			<div className={styles.block__title}>
				<h2 className={styles.title}>4.5</h2>
				<div className={styles.block__description}>
					<div className={styles.block__rating}>
						{renderStars(4.5, styleStar)}
					</div>
					<p className={styles.description}>На основании 3 оценок</p>
				</div>
			</div>
			<div className={styles.block__stars}>
				{[5, 4, 3, 2, 1].map(el => (
					<div key={el} className={styles.block__ratings}>
						<div className={styles.block__rating}>
							{renderStars(el, styleStar)}
						</div>
						<p className={styles.text}>{el}</p>
					</div>
				))}
			</div>
			<InterfaceApp />
		</Layout>
	);
};

export default Rating;

import { useState } from 'react';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import { arrPro } from '../../../data/pro.data';

import styles from './Pro.module.scss';

const Pro = () => {
	const [tariff, setTariff] = useState('32 000 ₽');
	const count = '5000 ₽';

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

			<h2 className={styles.title}>Выберите вариант</h2>

			<div className={styles.block__tariffs}>
				{arrPro.map(el => (
					<div
						key={el.id}
						className={styles.block__tariff}
						onClick={() => setTariff(el.price)}
						style={
							tariff === el.price ? { borderColor: colors.color_blue } : {}
						}
					>
						<p
							className={styles.time}
							style={
								tariff === el.price ? { color: colors.color_full_black } : {}
							}
						>
							{el.time}
						</p>
						<p className={styles.price}>{el.price}</p>
					</div>
				))}
			</div>

			<div className={styles.balance}>
				<p className={styles.balance__title}>Ваш баланс:</p>
				<p className={styles.count}>{count}</p>
			</div>

			<Button disabled={tariff.replace(/\D/g, '') !== count.replace(/\D/g, '')}>
				Создать запрос предложений
			</Button>
			<InterfaceApp />
		</Layout>
	);
};

export default Pro;

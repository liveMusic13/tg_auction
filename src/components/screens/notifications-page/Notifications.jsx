import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { arrNotifications } from '../../../data/profile.data';

import styles from './Notifications.module.scss';

const Notifications = () => {
	const [toggles, setToggles] = useState({
		messages: false,
		recommendations: false,
		discounts: false,
		status: false,
	});

	// Обработчик изменения состояния переключателей
	const handleToggleChange = key => {
		setToggles(prevState => ({
			...prevState,
			[key]: !prevState[key],
		}));
	};

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
			}}
		>
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>
			{arrNotifications.map((stats, index) => {
				// Привязка состояний переключателей к индексам
				const key =
					index === 0
						? 'messages'
						: index === 1
							? 'recommendations'
							: index === 2
								? 'discounts'
								: 'status';
				return (
					<div key={stats} className={styles.stats}>
						<h3 className={styles.title__stats}>{stats}</h3>
						<label className={styles.switch}>
							<input
								type='checkbox'
								checked={toggles[key]}
								onChange={() => handleToggleChange(key)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>
				);
			})}
			<InterfaceApp />
		</Layout>
	);
};

export default Notifications;

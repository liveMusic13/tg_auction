import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import { mockPeopleOffer } from '../../../data/mock.data';
import PeopleSells from '../../people-sells/PeopleSells';

import styles from './Referral.module.scss';

const Referral = () => {
	const [isViewReferral, setIsViewReferral] = useState(false);

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
			}}
		>
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>
			<h2 className={styles.title}>Описание</h2>
			<p className={styles.description}>
				Описание программы Описание программыОписание программыОписание
				программы
			</p>

			<Button
				style={{
					fontWeight: '600',
				}}
			>
				Пригласить друзей
			</Button>
			<Button
				style={{
					backgroundColor: colors.color_white,
					color: colors.color_blue,
					fontWeight: '600',
				}}
				enableActive={true}
			>
				Скопировать ссылку
			</Button>

			<div className={styles.block__offers}>
				<div
					className={styles.block__title}
					onClick={() => setIsViewReferral(!isViewReferral)}
				>
					<h4 className={styles.title}>Мои рефералы</h4>
					<img
						className={styles.arrow__offer}
						src={
							isViewReferral
								? '/images/icons/lots/arrow_top.svg'
								: '/images/icons/lots/arrow_bot.svg'
						}
						alt='arrow'
					/>
				</div>
				{isViewReferral && (
					<div className={styles.block__people}>
						{mockPeopleOffer.map(people => (
							<PeopleSells key={people.id} data={people} />
						))}
					</div>
				)}
			</div>

			<InterfaceApp />
		</Layout>
	);
};

export default Referral;

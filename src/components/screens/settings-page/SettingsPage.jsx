import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import { arrSettings } from '../../../data/profile.data';
import PopupProfile from '../../popups/popup-profile/PopupProfile';

import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
	const nav = useNavigate();
	const [isViewPopup, setIsViewPopup] = useState(false);
	const [button, setIsButton] = useState('');
	const [languageValue, setLanguageValue] = useState(arrSettings[2][1]);
	const [selectedFilter, setSelectedFilter] = useState(0);

	const onClick = but => {
		setIsButton(but);
		setIsViewPopup(true);
	};

	useEffect(() => {
		if (selectedFilter === 0) {
			setLanguageValue('Русский');
		} else {
			setLanguageValue('Английский');
		}
	}, [selectedFilter]);

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

			{arrSettings.map(stats => {
				const isLanguage = stats[0] === 'Язык';
				const isNotifications = stats[0] === 'Уведомления';
				const colorText = isNotifications
					? colors.color_blue
					: colors.color_full_black;

				return (
					<div key={stats[0]} className={styles.stats}>
						<h3 className={styles.title__stats}>{stats[0]}</h3>
						<p
							className={styles.text__stats}
							style={{ color: colorText }}
							onClick={() =>
								isNotifications
									? nav('/profile/notifications')
									: onClick(stats[0])
							}
						>
							{isLanguage ? languageValue : stats[1]}
						</p>
					</div>
				);
			})}

			<Button
				style={{
					backgroundColor: colors.color_white,
					color: colors.color_red_hight,
					fontWeight: '600',
					position: 'fixed',
					bottom: 'calc(102/412*100vw)',
				}}
				enableActive={true}
				onClick={() => onClick('Удалить аккаунт')}
			>
				Удалить аккаунт
			</Button>

			{isViewPopup && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => setIsViewPopup(false)}
					></div>
					<PopupProfile
						button={button}
						onClick={() => setIsViewPopup(false)}
						setSelectedFilter={setSelectedFilter}
						selectedFilter={selectedFilter}
					/>
				</>
			)}

			<InterfaceApp />
		</Layout>
	);
};

export default SettingsPage;

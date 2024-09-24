import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { IS_PRO, colors } from '../../../app.constants';
import { arrProfileInfo } from '../../../data/profile.data';
import PopupProfile from '../../popups/popup-profile/PopupProfile';
import { renderStars } from '../../stars/Stars';

import styles from './Profile.module.scss';

const Profile = () => {
	const nav = useNavigate();
	const [isViewPopup, setIsViewPopup] = useState(false);
	const [button, setIsButton] = useState('');
	const [avatar, setAvatar] = useState(''); // Храним ссылку на загруженный аватар

	// Функция для обработки выбора файла
	const handleImageChange = event => {
		const file = event.target.files[0]; // Получаем первый файл
		if (file) {
			// Создаем URL для изображения
			const imageUrl = URL.createObjectURL(file);
			setAvatar(imageUrl); // Сохраняем URL в состояние
		}
	};

	const onClick = but => {
		setIsButton(but);
		setIsViewPopup(true);
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

			{isViewPopup && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => setIsViewPopup(false)}
					></div>
					<PopupProfile button={button} />
				</>
			)}

			<div className={styles.block__title}>
				<div className={styles.block__image}>
					{/* Отображаем выбранное изображение */}
					<img
						src={avatar || '/images/test.png'} // Если аватар не выбран, используем дефолтное изображение
						alt='img'
						className={styles.image__avatar} // Класс для аватара
					/>
					{/* Кнопка добавления изображения */}
					<img
						src='/images/icons/plus.svg'
						alt='img'
						className={styles.image__add}
						onClick={() => document.getElementById('fileInput').click()} // Открываем выбор файла при клике
					/>
				</div>

				{/* Скрытый input для выбора файла */}
				<input
					id='fileInput'
					type='file'
					accept='image/*'
					style={{ display: 'none' }} // Прячем input
					onChange={handleImageChange} // Обрабатываем выбор файла
				/>

				<h2 className={styles.nickname}>ntcn</h2>
				<Button
					style={{
						backgroundColor: colors.color_white,
						color: colors.color_blue,
						fontWeight: '600',
					}}
					enableActive={true}
					onClick={() => onClick('Изменить никнейм')}
				>
					Изменить никнейм
				</Button>
			</div>

			{arrProfileInfo.map(stats => {
				const colorText =
					stats[0] === 'Верификация' && stats[1] === 'Не пройдена'
						? colors.color_red_hight
						: stats[0] === 'Верификация' && stats[1] === 'Пройдена'
							? colors.color_green
							: stats[0] === 'Город'
								? colors.color_full_black
								: colors.color_grey;

				const style = {
					width: 'calc(22/412*100vw)',
					height: 'calc(22/412*100vw)',
				};

				const isVerif = stats[0] === 'Верификация';

				if (stats[0] === 'Рейтинг') {
					return (
						<Link to='/profile/rating' key={stats[0]} className={styles.stats}>
							<h3 className={styles.title__stats}>{stats[0]}</h3>
							<div className={styles.block__rating}>
								{renderStars(stats[1], style)}
							</div>
						</Link>
					);
				} else if (stats[0] === 'Тариф') {
					return (
						<div key={stats[0]} className={styles.stats}>
							<h3 className={styles.title__stats}>{stats[0]}</h3>
							{IS_PRO ? (
								<p className={styles.text__stats}>PRO (до 20.20.2020)</p>
							) : (
								<Button
									style={{
										width: 'auto',
									}}
									onClick={() => nav('/wallet/pro')}
								>
									Подключить PRO
								</Button>
							)}
						</div>
					);
				} else {
					return (
						<div key={stats[0]} className={styles.stats}>
							<h3 className={styles.title__stats}>{stats[0]}</h3>
							{isVerif ? (
								<Link
									to='/profile/verification'
									className={styles.text__stats}
									style={{ color: colorText }}
								>
									{stats[1]}
								</Link>
							) : (
								<p className={styles.text__stats} style={{ color: colorText }}>
									{stats[1]}
								</p>
							)}
						</div>
					);
				}
			})}

			<Button
				style={{
					backgroundColor: colors.color_white,
					color: colors.color_blue,
					fontWeight: '600',
				}}
				enableActive={true}
				onClick={() => nav('/profile/settings')}
			>
				Настройки
			</Button>
			<Button
				style={{
					backgroundColor: colors.color_white,
					color: colors.color_blue,
					fontWeight: '600',
				}}
				enableActive={true}
				onClick={() => nav('/profile/statistics')}
			>
				Статистика
			</Button>
			<Button
				style={{
					backgroundColor: colors.color_white,
					color: colors.color_blue,
					fontWeight: '600',
				}}
				enableActive={true}
				onClick={() => nav('/profile/faq')}
			>
				Помощь
			</Button>
			<InterfaceApp />
		</Layout>
	);
};

export default Profile;

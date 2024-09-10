import Button from '@/components/ui/button/Button';

import { colors } from '../../../app.constants';

import styles from './PopupChat.module.scss';

const PopupChat = ({
	handlePhotoChange,
	photos,
	handleSendPhotos,
	setIsViewPopup,
	setPhotos,
}) => {
	const handleCancel = () => {
		setPhotos([]); // Очищаем массив фотографий
		setIsViewPopup(false); // Закрываем попап
	};

	return (
		<div className={styles.cameraBlock}>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Подтверждение отправки</h2>
				<p className={styles.description}>
					Для подтверждения отправки сделайте фото чека с трекномером
				</p>
			</div>
			{/* Кнопка для вызова камеры */}
			<label htmlFor='camera-upload' className={styles.cameraButton}>
				<img src='/images/take_a_photo.png' alt='photo' />
			</label>
			<input
				id='camera-upload'
				type='file'
				accept='image/*'
				capture='environment'
				onChange={handlePhotoChange}
				style={{ display: 'none' }}
			/>

			{/* Галерея фото */}
			<div className={styles.photoGallery}>
				{photos.map((photo, index) => (
					<img
						key={index}
						src={photo}
						alt={`Сделанное фото ${index + 1}`}
						className={styles.photoItem}
					/>
				))}
			</div>

			{/* Кнопки подтверждения */}
			<div className={styles.block__buttons}>
				<Button
					style={{ width: 'calc(207/412*100vw)', fontSize: '0.95rem' }}
					onClick={handleSendPhotos} // Кнопка для отправки всех фото
				>
					Подтвердить
				</Button>
				<Button
					style={{
						width: 'calc(137/412*100vw)',
						fontSize: '0.95rem',
						backgroundColor: colors.color_light_blue,
						color: colors.color_blue,
					}}
					onClick={handleCancel}
				>
					Отмена
				</Button>
			</div>
		</div>
	);
};

export default PopupChat;

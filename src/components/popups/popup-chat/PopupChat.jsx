import Button from '@/components/ui/button/Button';

import { colors } from '../../../app.constants';

import styles from './PopupChat.module.scss';

// const PopupChat = ({
// 	handleMediaChange,
// 	photos,
// 	videos,
// 	handleSendMedia,
// 	setIsViewPopup,
// 	setPhotos,
// 	setVideos,
// }) => {
// 	const handleCancel = () => {
// 		setPhotos([]); // Очищаем массив фотографий
// 		setVideos([]); // Очищаем массив видео
// 		setIsViewPopup(false); // Закрываем попап
// 	};

// 	return (
// 		<div className={styles.cameraBlock}>
// 			<div className={styles.block__title}>
// 				<h2 className={styles.title}>Подтверждение отправки</h2>
// 				<p className={styles.description}>
// 					Сделайте фото или запишите видео для подтверждения
// 				</p>
// 			</div>

// 			{/* Кнопки для вызова камеры для фото и видео */}
// 			<div className={styles.mediaButtons}>
// 				<label htmlFor='camera-upload-media' className={styles.cameraButton}>
// 					<img src='/images/take_a_photo.png' alt='media' />
// 					{/* <span>Фото или Видео</span> */}
// 				</label>
// 			</div>

// 			<input
// 				id='camera-upload-media'
// 				type='file'
// 				accept='image/*,video/*'
// 				capture='environment'
// 				onChange={e => {
// 					const file = e.target.files[0];
// 					if (!file) return;

// 					// Определяем тип файла
// 					if (file.type.startsWith('image/')) {
// 						handleMediaChange(e, 'photo');
// 					} else if (file.type.startsWith('video/')) {
// 						handleMediaChange(e, 'video');
// 					}
// 				}}
// 				style={{ display: 'none' }}
// 			/>

// 			{/* Галерея фото и видео */}
// 			<div className={styles.mediaGallery}>
// 				{photos.map((photo, index) => (
// 					<img
// 						key={index}
// 						src={photo}
// 						alt={`Фото ${index + 1}`}
// 						className={styles.mediaItem}
// 					/>
// 				))}
// 				{videos.map((video, index) => (
// 					<video
// 						key={index}
// 						src={video}
// 						controls
// 						className={`${styles.mediaItem} ${styles.video}`}
// 					/>
// 				))}
// 			</div>

// 			{/* Кнопки подтверждения */}
// 			<div className={styles.block__buttons}>
// 				<Button
// 					style={{ width: 'calc(207/412*100vw)', fontSize: '0.95rem' }}
// 					onClick={handleSendMedia} // Кнопка для отправки всех медиа
// 				>
// 					Подтвердить
// 				</Button>
// 				<Button
// 					style={{
// 						width: 'calc(137/412*100vw)',
// 						fontSize: '0.95rem',
// 						backgroundColor: colors.color_light_blue,
// 						color: colors.color_blue,
// 					}}
// 					onClick={handleCancel}
// 				>
// 					Отмена
// 				</Button>
// 			</div>
// 		</div>
// 	);
// };

const PopupChat = ({
	handleMediaChange,
	photos,
	videos,
	handleSendMedia,
	setIsViewPopup,
	setPhotos,
	setVideos,
}) => {
	const handleCancel = () => {
		setPhotos([]); // Очищаем массив фотографий
		setVideos([]); // Очищаем массив видео
		setIsViewPopup(false); // Закрываем попап
	};

	// const handleMediaUpload = e => {
	// 	const files = Array.from(e.target.files); // Преобразуем FileList в массив

	// 	files.forEach(file => {
	// 		if (file.type.startsWith('image/')) {
	// 			handleMediaChange(file, 'photo'); // Для каждого файла вызываем функцию для фото
	// 		} else if (file.type.startsWith('video/')) {
	// 			handleMediaChange(file, 'video'); // Для видео
	// 		}
	// 	});
	// };

	const handleMediaUpload = e => {
		// Прямо здесь вызываем handleMediaChange для всех файлов сразу
		handleMediaChange(e, 'media'); // Передаем событие и тип 'media'
	};
	return (
		<div className={styles.cameraBlock}>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Подтверждение отправки</h2>
				<p className={styles.description}>
					Сделайте фото или запишите видео для подтверждения или выберите из
					галереи
				</p>
			</div>

			{/* Кнопки для вызова камеры для фото и видео */}
			<div className={styles.mediaButtons}>
				<label htmlFor='media-upload' className={styles.cameraButton}>
					<img src='/images/take_a_photo.png' alt='media' />
					{/* <span>Фото или Видео</span> */}
				</label>
			</div>

			{/* Изменяем input для работы с несколькими файлами и выбором из галереи */}
			<input
				id='media-upload'
				type='file'
				accept='image/*,video/*'
				multiple // Позволяем выбирать несколько файлов
				onChange={e => handleMediaUpload(e)} // Обрабатываем массив файлов
				style={{ display: 'none' }}
			/>

			{/* Галерея фото и видео */}
			<div className={styles.mediaGallery}>
				{photos.map((photo, index) => (
					<img
						key={index}
						src={photo}
						alt={`Фото ${index + 1}`}
						className={styles.mediaItem}
					/>
				))}
				{videos.map((video, index) => (
					<video
						key={index}
						src={video}
						controls
						className={`${styles.mediaItem} ${styles.video}`}
					/>
				))}
			</div>

			{/* Кнопки подтверждения */}
			<div className={styles.block__buttons}>
				<Button
					style={{ width: 'calc(207/412*100vw)', fontSize: '0.95rem' }}
					onClick={handleSendMedia} // Кнопка для отправки всех медиа
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

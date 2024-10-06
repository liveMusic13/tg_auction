import { useState } from 'react';

import Button from '@/components/ui/button/Button';

import { colors } from '../../../app.constants';
import { truncateDescription } from '../../../utils/descriptionLength';

import styles from './FilesAttachment.module.scss';

// const FilesAttachment = ({ setMediaFileCount }) => {
// 	const [mediaFiles, setMediaFiles] = useState([]);

// 	const handleFileUpload = event => {
// 		const files = Array.from(event.target.files);
// 		const newMediaFiles = files.map(file => ({
// 			id: Date.now() + Math.random(),
// 			file,
// 			preview: URL.createObjectURL(file),
// 			progress: 0,
// 			status: 'uploading',
// 		}));

// 		setMediaFiles(prevFiles => {
// 			const updatedFiles = [...prevFiles, ...newMediaFiles];
// 			setMediaFileCount(updatedFiles.length); // Обновляем количество файлов
// 			return updatedFiles;
// 		});

// 		newMediaFiles.forEach((mediaFile, index) => {
// 			simulateFileUpload(mediaFile, index);
// 		});

// 		event.target.value = '';
// 	};

// 	const simulateFileUpload = (mediaFile, index) => {
// 		const interval = setInterval(() => {
// 			setMediaFiles(prevFiles =>
// 				prevFiles.map(file =>
// 					file.id === mediaFile.id
// 						? {
// 								...file,
// 								progress: file.progress + 10,
// 								status: file.progress >= 90 ? 'uploaded' : file.status,
// 							}
// 						: file,
// 				),
// 			);

// 			if (mediaFile.progress >= 90) {
// 				clearInterval(interval);
// 			}
// 		}, 500);
// 	};

// 	const handleRetry = fileId => {
// 		setMediaFiles(prevFiles =>
// 			prevFiles.map(file =>
// 				file.id === fileId
// 					? { ...file, status: 'uploading', progress: 0 }
// 					: file,
// 			),
// 		);
// 		// Симуляция повторной загрузки
// 		const file = mediaFiles.find(file => file.id === fileId);
// 		simulateFileUpload(file);
// 	};

// 	const handleRemove = fileId => {
// 		setMediaFiles(prevFiles => {
// 			const updatedFiles = prevFiles.filter(file => file.id !== fileId);
// 			setMediaFileCount(updatedFiles.length); // Обновляем количество файлов
// 			return updatedFiles;
// 		});
// 	};

// 	return (
// 		<div>
// 			<input
// 				type='file'
// 				multiple
// 				accept='image/*,video/*' // Разрешаем только изображения и видео
// 				onChange={handleFileUpload}
// 				style={{ display: 'none' }}
// 				id='file-upload'
// 			/>
// 			<Button
// 				onClick={() => document.getElementById('file-upload').click()}
// 				style={{
// 					color: colors.color_blue,
// 					backgroundColor: colors.color_light_blue,
// 					fontWeight: '600',
// 				}}
// 			>
// 				{mediaFiles.length > 0 ? 'Прикрепить еще медиа' : 'Прикрепить медиа'}
// 			</Button>
// 			<div
// 				className={styles.mediaList}
// 				style={mediaFiles.length > 0 ? {} : { display: 'none' }}
// 			>
// 				{mediaFiles.map(file => (
// 					<div key={file.id} className={styles.mediaItem}>
// 						{file.status === 'uploading' && (
// 							<>
// 								<div
// 									className={styles.progressCircle}
// 									style={{ '--progress': file.progress }}
// 								/>
// 								<div className={styles.progressContainer}>
// 									<div>
// 										<p>{truncateDescription(file.file.name, 30)}</p>
// 										<p className={styles.progress__present}>{file.progress}%</p>
// 									</div>
// 									<button
// 										className={styles.removeButton}
// 										onClick={() => handleRemove(file.id)}
// 									>
// 										<img src='/images/icons/exit.svg' alt='remove' />
// 									</button>
// 								</div>
// 							</>
// 						)}
// 						{file.status === 'uploaded' && (
// 							<>
// 								{file.file.type.startsWith('image') ? (
// 									<img
// 										src={file.preview}
// 										alt={file.file.name}
// 										className={styles.mediaPreview}
// 									/>
// 								) : (
// 									<video
// 										src={file.preview}
// 										// controls
// 										className={styles.mediaPreview}
// 									/>
// 								)}
// 								<div className={styles.previewContainer}>
// 									<p>{truncateDescription(file.file.name, 30)}</p>
// 									<button
// 										className={styles.removeButton}
// 										onClick={() => handleRemove(file.id)}
// 									>
// 										<img src='/images/icons/exit.svg' alt='remove' />
// 									</button>
// 								</div>
// 							</>
// 						)}
// 						{file.status === 'failed' && (
// 							<>
// 								<div
// 									className={styles.retryButton}
// 									onClick={() => handleRetry(file.id)}
// 								>
// 									<img src='/images/icons/retry.svg' alt='retry' />
// 								</div>
// 								<div className={styles.failedContainer}>
// 									<div>
// 										<p>{truncateDescription(file.file.name, 30)}</p>
// 										<p className={styles.error}>Failed</p>
// 									</div>
// 									<button
// 										className={styles.removeButton}
// 										onClick={() => handleRemove(file.id)}
// 									>
// 										<img src='/images/icons/exit.svg' alt='remove' />
// 									</button>
// 								</div>
// 							</>
// 						)}
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

const FilesAttachment = ({ setMediaFileCount }) => {
	const [mediaFiles, setMediaFiles] = useState([]);

	const handleFileUpload = event => {
		const files = Array.from(event.target.files);
		const newMediaFiles = files.map(file => ({
			id: Date.now() + Math.random(),
			file,
			preview: URL.createObjectURL(file),
			progress: 0,
			status: 'uploading',
		}));

		setMediaFiles(prevFiles => {
			const updatedFiles = [...prevFiles, ...newMediaFiles];
			setMediaFileCount(updatedFiles.length); // Обновляем количество файлов
			return updatedFiles;
		});

		newMediaFiles.forEach((mediaFile, index) => {
			simulateFileUpload(mediaFile, index);
		});

		event.target.value = '';
	};

	const handleCaptureMedia = async isVideo => {
		try {
			// Запрашиваем доступ к камере (и микрофону для видео)
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: isVideo,
			});

			// Создаем элемент видео для предварительного просмотра
			const mediaStream = new MediaRecorder(stream);
			let chunks = [];

			mediaStream.ondataavailable = event => chunks.push(event.data);
			mediaStream.onstop = () => {
				const blob = new Blob(chunks, {
					type: isVideo ? 'video/mp4' : 'image/jpeg',
				});
				const file = new File([blob], isVideo ? 'video.mp4' : 'photo.jpeg', {
					type: isVideo ? 'video/mp4' : 'image/jpeg',
				});

				const mediaFile = {
					id: Date.now() + Math.random(),
					file,
					preview: URL.createObjectURL(blob),
					progress: 0,
					status: 'uploading',
				};

				// Добавляем записанное медиа в список файлов
				setMediaFiles(prevFiles => {
					const updatedFiles = [...prevFiles, mediaFile];
					setMediaFileCount(updatedFiles.length);
					return updatedFiles;
				});
				simulateFileUpload(mediaFile);
			};

			// Начинаем запись (если видео) или делаем снимок (если фото)
			mediaStream.start();

			// Если это фото (без видео), то сразу останавливаем поток через 2 секунды
			if (!isVideo) {
				setTimeout(() => mediaStream.stop(), 2000);
			}
		} catch (error) {
			console.error('Ошибка доступа к камере: ', error);
		}
	};

	const simulateFileUpload = (mediaFile, index) => {
		const interval = setInterval(() => {
			setMediaFiles(prevFiles =>
				prevFiles.map(file =>
					file.id === mediaFile.id
						? {
								...file,
								progress: file.progress + 10,
								status: file.progress >= 90 ? 'uploaded' : file.status,
							}
						: file,
				),
			);

			if (mediaFile.progress >= 90) {
				clearInterval(interval);
			}
		}, 500);
	};

	const handleRetry = fileId => {
		setMediaFiles(prevFiles =>
			prevFiles.map(file =>
				file.id === fileId
					? { ...file, status: 'uploading', progress: 0 }
					: file,
			),
		);
		const file = mediaFiles.find(file => file.id === fileId);
		simulateFileUpload(file);
	};

	const handleRemove = fileId => {
		setMediaFiles(prevFiles => {
			const updatedFiles = prevFiles.filter(file => file.id !== fileId);
			setMediaFileCount(updatedFiles.length);
			return updatedFiles;
		});
	};

	return (
		<div>
			{/* Ввод для выбора файлов из галереи */}
			<input
				type='file'
				multiple
				accept='image/*,video/*'
				onChange={handleFileUpload}
				style={{ display: 'none' }}
				id='file-upload'
			/>
			<Button
				onClick={() => document.getElementById('file-upload').click()}
				style={{
					color: colors.color_blue,
					backgroundColor: colors.color_light_blue,
					fontWeight: '600',
				}}
			>
				{mediaFiles.length > 0 ? 'Прикрепить еще медиа' : 'Прикрепить медиа'}
			</Button>

			{/* Кнопка для записи фото */}
			<Button
				onClick={() => handleCaptureMedia(false)} // Фото
				style={{
					color: colors.color_blue,
					backgroundColor: colors.color_light_blue,
					fontWeight: '600',
					marginLeft: '10px',
				}}
			>
				Сделать фото
			</Button>

			{/* Кнопка для записи видео */}
			<Button
				onClick={() => handleCaptureMedia(true)} // Видео
				style={{
					color: colors.color_blue,
					backgroundColor: colors.color_light_blue,
					fontWeight: '600',
					marginLeft: '10px',
				}}
			>
				Записать видео
			</Button>

			<div
				className={styles.mediaList}
				style={mediaFiles.length > 0 ? {} : { display: 'none' }}
			>
				{mediaFiles.map(file => (
					<div key={file.id} className={styles.mediaItem}>
						{file.status === 'uploading' && (
							<>
								<div
									className={styles.progressCircle}
									style={{ '--progress': file.progress }}
								/>
								<div className={styles.progressContainer}>
									<div>
										<p>{truncateDescription(file.file.name, 30)}</p>
										<p className={styles.progress__present}>{file.progress}%</p>
									</div>
									<button
										className={styles.removeButton}
										onClick={() => handleRemove(file.id)}
									>
										<img src='/images/icons/exit.svg' alt='remove' />
									</button>
								</div>
							</>
						)}
						{file.status === 'uploaded' && (
							<>
								{file.file.type.startsWith('image') ? (
									<img
										src={file.preview}
										alt={file.file.name}
										className={styles.mediaPreview}
									/>
								) : (
									<video
										src={file.preview}
										controls
										className={styles.mediaPreview}
									/>
								)}
								<div className={styles.previewContainer}>
									<p>{truncateDescription(file.file.name, 30)}</p>
									<button
										className={styles.removeButton}
										onClick={() => handleRemove(file.id)}
									>
										<img src='/images/icons/exit.svg' alt='remove' />
									</button>
								</div>
							</>
						)}
						{file.status === 'failed' && (
							<>
								<div
									className={styles.retryButton}
									onClick={() => handleRetry(file.id)}
								>
									<img src='/images/icons/retry.svg' alt='retry' />
								</div>
								<div className={styles.failedContainer}>
									<div>
										<p>{truncateDescription(file.file.name, 30)}</p>
										<p className={styles.error}>Failed</p>
									</div>
									<button
										className={styles.removeButton}
										onClick={() => handleRemove(file.id)}
									>
										<img src='/images/icons/exit.svg' alt='remove' />
									</button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default FilesAttachment;

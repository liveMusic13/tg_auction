import { useState } from 'react';

import Button from '@/components/ui/button/Button';

import { colors } from '../../../app.constants';

import styles from './FilesAttachment.module.scss';

// const FilesAttachment = () => {
// 	const [mediaFiles, setMediaFiles] = useState([]);

// 	const handleFileUpload = event => {
// 		const files = Array.from(event.target.files);
// 		const newMediaFiles = files.map(file => ({
// 			id: Date.now() + Math.random(),
// 			file,
// 			preview: URL.createObjectURL(file),
// 			progress: 0,
// 			status: 'uploading', // 'uploading', 'uploaded', 'failed'
// 		}));

// 		setMediaFiles(prevFiles => [...prevFiles, ...newMediaFiles]);

// 		// Симуляция загрузки файла
// 		newMediaFiles.forEach((mediaFile, index) => {
// 			simulateFileUpload(mediaFile, index);
// 		});

// 		// Сброс input после загрузки файлов, чтобы избежать кэширования
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
// 		setMediaFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
// 	};

// 	return (
// 		<div>
// 			<input
// 				type='file'
// 				multiple
// 				accept='image/*,video/*' // Разрешаем только изображения и видео
// 				capture='environment' // Разрешаем использовать только камеру (заднюю камеру)
// 				// capture='camera' // Попробуем использовать этот атрибут
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
// 										controls
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

const FilesAttachment = () => {
	const [mediaFiles, setMediaFiles] = useState([]);

	const handleCameraCapture = async () => {
		try {
			// Request video media (camera access)
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });

			// Create a video element to display the camera stream
			const videoElement = document.createElement('video');
			videoElement.srcObject = stream;
			videoElement.play();

			// Wait for the user to take a picture
			const canvas = document.createElement('canvas');
			canvas.width = videoElement.videoWidth;
			canvas.height = videoElement.videoHeight;
			const ctx = canvas.getContext('2d');

			// Capture image from the video stream (snapshot)
			ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
			const imageBlob = await new Promise(resolve =>
				canvas.toBlob(resolve, 'image/jpeg'),
			);

			const file = new File([imageBlob], 'captured_image.jpg', {
				type: 'image/jpeg',
			});
			const preview = URL.createObjectURL(file);

			const newMediaFile = {
				id: Date.now() + Math.random(),
				file,
				preview,
				progress: 0,
				status: 'uploading', // 'uploading', 'uploaded', 'failed'
			};

			setMediaFiles(prevFiles => [...prevFiles, newMediaFile]);

			// Simulate file upload
			simulateFileUpload(newMediaFile);

			// Stop the video stream after capturing the image
			stream.getTracks().forEach(track => track.stop());
		} catch (error) {
			console.error('Error accessing camera:', error);
		}
	};

	const simulateFileUpload = mediaFile => {
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

	const handleRemove = fileId => {
		setMediaFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
	};

	return (
		<div>
			<Button
				onClick={handleCameraCapture} // Open the camera on button click
				style={{
					color: colors.color_blue,
					backgroundColor: colors.color_light_blue,
					fontWeight: '600',
				}}
			>
				{mediaFiles.length > 0 ? 'Прикрепить еще медиа' : 'Прикрепить медиа'}
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
					</div>
				))}
			</div>
		</div>
	);
};

export default FilesAttachment;

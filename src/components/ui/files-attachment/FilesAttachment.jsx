import { useRef, useState } from 'react';

import Button from '@/components/ui/button/Button';

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
	const [cameraOn, setCameraOn] = useState(false);
	const videoRef = useRef(null);
	const streamRef = useRef(null);

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true, // Enable video
				audio: true, // Enable audio if needed for video recording
			});
			videoRef.current.srcObject = stream;
			streamRef.current = stream;
			setCameraOn(true);
		} catch (err) {
			console.error('Error accessing camera: ', err);
		}
	};

	const stopCamera = () => {
		if (streamRef.current) {
			const tracks = streamRef.current.getTracks();
			tracks.forEach(track => track.stop());
		}
		setCameraOn(false);
	};

	const capturePhoto = () => {
		const video = videoRef.current;
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		const photoData = canvas.toDataURL('image/jpeg');

		const newMediaFile = {
			id: Date.now() + Math.random(),
			file: photoData,
			preview: photoData,
			progress: 100,
			status: 'uploaded',
		};
		setMediaFiles(prevFiles => [...prevFiles, newMediaFile]);
		stopCamera();
	};

	const handleFileUpload = event => {
		const files = Array.from(event.target.files);
		const newMediaFiles = files.map(file => ({
			id: Date.now() + Math.random(),
			file,
			preview: URL.createObjectURL(file),
			progress: 0,
			status: 'uploading',
		}));

		setMediaFiles(prevFiles => [...prevFiles, ...newMediaFiles]);

		event.target.value = ''; // Reset input to allow new files
	};

	return (
		<div>
			<input
				type='file'
				multiple
				accept='image/*,video/*'
				onChange={handleFileUpload}
				style={{ display: 'none' }}
				id='file-upload'
			/>
			<Button
				onClick={startCamera}
				style={{
					color: 'blue',
					backgroundColor: 'lightblue',
					fontWeight: '600',
				}}
			>
				{mediaFiles.length > 0 ? 'Attach more media' : 'Attach media'}
			</Button>

			{cameraOn && (
				<div>
					<video ref={videoRef} autoPlay />
					<button onClick={capturePhoto}>Take Photo</button>
					<button onClick={stopCamera}>Cancel</button>
				</div>
			)}

			<div
				className={styles.mediaList}
				style={mediaFiles.length > 0 ? {} : { display: 'none' }}
			>
				{mediaFiles.map(file => (
					<div key={file.id} className={styles.mediaItem}>
						{file.file.startsWith('data:image') ? (
							<img
								src={file.preview}
								alt='Captured media'
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
							<p>{file.file.name || 'Captured Media'}</p>
							<button onClick={() => handleRemove(file.id)}>Remove</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FilesAttachment;

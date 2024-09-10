import { useState } from 'react';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button/Button';

import { mockChats } from '../../../data/mock.data';
import BlockStatus from '../../block-status/BlockStatus';
import FieldChat from '../../ui/field-chat/FieldChat';

import styles from './ChatPeople.module.scss';

// const ChatPeople = () => {
// 	// Храним сообщения в состоянии
// 	const [messages, setMessages] = useState([
// 		{ id: 1, text: 'Здравствуйте', fromMe: false, time: '14:26' },
// 		{
// 			id: 2,
// 			text: 'Длинное сообщение Длинное сообщение Длинное сообщение (макс длина)',
// 			fromMe: false,
// 			time: '15:26',
// 		},
// 		{ id: 3, text: 'Здравствуйте', fromMe: true, time: '14:26' },
// 		// Можно добавить больше сообщений для начального состояния
// 	]);

// 	// Состояние для нового сообщения
// 	const [newMessage, setNewMessage] = useState('');
// 	const [selectedFile, setSelectedFile] = useState(null);

// 	// Обработка отправки сообщения
// 	const handleSendMessage = () => {
// 		if (newMessage.trim() === '') return;

// 		// Создаем новое сообщение
// 		const newMsg = {
// 			id: messages.length + 1,
// 			text: newMessage,
// 			fromMe: true, // Сообщение отправлено пользователем
// 			time: new Date().toLocaleTimeString().slice(0, 5), // Пример времени
// 		};

// 		// Обновляем список сообщений
// 		setMessages([...messages, newMsg]);

// 		// Очищаем поле ввода
// 		setNewMessage('');
// 	};

// 	const handleFileChange = e => {
// 		const file = e.target.files[0];
// 		if (file) {
// 			setSelectedFile(file);

// 			// Проверка типа файла
// 			if (file.type.startsWith('image/')) {
// 				// Обработка изображения
// 				console.log('Выбрано изображение:', file.name);
// 			} else if (file.type.startsWith('video/')) {
// 				// Обработка видео
// 				console.log('Выбрано видео:', file.name);
// 			}
// 		}
// 	};

// 	return (
// 		<Layout
// 			style={{
// 				gap: 'calc(16/412*100vw)',
// 			}}
// 		>
// 			<Header />
// 			<div className={styles.chat}>
// 				<BlockStatus data={mockChats[0]} />
// 				<Button style={{ width: 'auto', fontSize: '0.95rem' }}>
// 					Подтвердить отправление
// 				</Button>
// 				{messages.map(message => (
// 					<div
// 						key={message.id}
// 						className={
// 							message.fromMe
// 								? styles.block__messageMe
// 								: styles.block__messageThem
// 						}
// 					>
// 						<p
// 							className={message.fromMe ? styles.messageMe : styles.messageThem}
// 						>
// 							{message.text}
// 						</p>
// 						<span
// 							className={
// 								message.fromMe
// 									? `${styles.time} ${styles.left}`
// 									: `${styles.time} ${styles.right}`
// 							}
// 						>
// 							{message.time}
// 						</span>
// 					</div>
// 				))}
// 			</div>
// 			<FieldChat
// 				placeholder='Написать сообщение'
// 				onChange={e => setNewMessage(e.target.value)}
// 				handleSendMessage={handleSendMessage}
// 				newMessage={newMessage}
// 				handleFileChange={handleFileChange}
// 			/>
// 		</Layout>
// 	);
// };

const ChatPeople = () => {
	// Храним сообщения в состоянии
	const [messages, setMessages] = useState([
		{ id: 1, text: 'Здравствуйте', fromMe: false, time: '14:26' },
		{
			id: 2,
			text: 'Длинное сообщение Длинное сообщение Длинное сообщение (макс длина)',
			fromMe: false,
			time: '15:26',
		},
		{ id: 3, text: 'Здравствуйте', fromMe: true, time: '14:26' },
	]);

	// Состояние для нового сообщения
	const [newMessage, setNewMessage] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [photos, setPhotos] = useState([]);

	// Обработка отправки сообщения
	const handleSendMessage = () => {
		if (newMessage.trim() === '') return;

		const newMsg = {
			id: messages.length + 1,
			text: newMessage,
			fromMe: true,
			time: new Date().toLocaleTimeString().slice(0, 5),
		};

		setMessages([...messages, newMsg]);
		setNewMessage('');
	};

	// Обработка выбора файла
	const handleFileChange = e => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			if (file.type.startsWith('image/')) {
				console.log('Выбрано изображение:', file.name);
			} else if (file.type.startsWith('video/')) {
				console.log('Выбрано видео:', file.name);
			}
		}
	};

	// Обработка сделанных фото через камеру
	const handlePhotoChange = e => {
		const files = Array.from(e.target.files);
		const newPhotos = files.map(file => URL.createObjectURL(file));
		setPhotos([...photos, ...newPhotos]);
	};

	return (
		<Layout style={{ gap: 'calc(16/412*100vw)' }}>
			<Header />
			<div className={styles.chat}>
				<BlockStatus data={mockChats[0]} />
				<Button style={{ width: 'auto', fontSize: '0.95rem' }}>
					Подтвердить отправление
				</Button>
				{messages.map(message => (
					<div
						key={message.id}
						className={
							message.fromMe
								? styles.block__messageMe
								: styles.block__messageThem
						}
					>
						<p
							className={message.fromMe ? styles.messageMe : styles.messageThem}
						>
							{message.text}
						</p>
						<span
							className={
								message.fromMe
									? `${styles.time} ${styles.left}`
									: `${styles.time} ${styles.right}`
							}
						>
							{message.time}
						</span>
					</div>
				))}
			</div>

			<FieldChat
				placeholder='Написать сообщение'
				onChange={e => setNewMessage(e.target.value)}
				handleSendMessage={handleSendMessage}
				newMessage={newMessage}
				handleFileChange={handleFileChange}
			/>

			{/* Блок для фотографий и кнопка камеры */}
			<div className={styles.cameraBlock}>
				{/* Кнопка для вызова камеры */}
				<label htmlFor='camera-upload' className={styles.cameraButton}>
					Открыть камеру
				</label>
				<input
					id='camera-upload'
					type='file'
					accept='image/*;capture=camera'
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
			</div>
		</Layout>
	);
};

export default ChatPeople;

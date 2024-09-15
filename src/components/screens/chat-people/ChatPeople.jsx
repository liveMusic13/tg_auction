import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';

import { mockChats } from '../../../data/mock.data';
import BlockStatus from '../../block-status/BlockStatus';
import PopupChat from '../../popups/popup-chat/PopupChat';
import FieldChat from '../../ui/field-chat/FieldChat';

import styles from './ChatPeople.module.scss';

const ChatPeople = () => {
	const { pathname: pathChat } = useLocation();
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

	const [newMessage, setNewMessage] = useState('');
	const [photos, setPhotos] = useState([]);
	const [isViewPopup, setIsViewPopup] = useState(false);

	// Определяем класс для контейнера в зависимости от количества изображений
	const getImageContainerClass = images => {
		if (images.length === 1) return 'imageContainer--1';
		if (images.length === 2) return 'imageContainer--2';
		if (images.length === 3) return 'imageContainer--3';
		if (images.length === 4) return 'imageContainer--4';
		return 'imageContainer--more'; // Для 5 и более изображений
	};

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

	const handlePhotoChange = e => {
		const files = Array.from(e.target.files);
		const newPhotos = files.map(file => URL.createObjectURL(file));
		setPhotos([...photos, ...newPhotos]);
	};

	const handleSendPhotos = () => {
		if (photos.length === 0) return;

		const photoMessage = {
			id: messages.length + 1,
			images: photos,
			fromMe: true,
			time: new Date().toLocaleTimeString().slice(0, 5),
		};

		setMessages([...messages, photoMessage]);
		setPhotos([]);
		setIsViewPopup(false);
	};

	return (
		<Layout style={{ gap: 'calc(16/412*100vw)' }}>
			<Header />
			<div className={styles.chat}>
				{pathChat !== '/chats/help' && (
					<>
						<BlockStatus data={mockChats[0]} />
						<Button style={{ width: 'auto', fontSize: '0.95rem' }}>
							Подтвердить отправление
						</Button>
					</>
				)}
				{messages.map(message => (
					<div
						key={message.id}
						className={
							message.fromMe
								? styles.block__messageMe
								: styles.block__messageThem
						}
					>
						{message.images ? (
							<div
								className={`${styles.imageContainer} ${styles[getImageContainerClass(message.images)]}`}
							>
								{message.images.map((image, index) => (
									<img
										key={index}
										src={image}
										alt={`Фото ${index + 1}`}
										className={styles.messageImage}
									/>
								))}
							</div>
						) : (
							<p
								className={
									message.fromMe ? styles.messageMe : styles.messageThem
								}
							>
								{message.text}
							</p>
						)}
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
				handleFileChange={handlePhotoChange}
				onClick={() => setIsViewPopup(!isViewPopup)}
			/>

			{isViewPopup && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => setIsViewPopup(false)}
					></div>
					<PopupChat
						handlePhotoChange={handlePhotoChange}
						photos={photos}
						handleSendPhotos={handleSendPhotos}
						setIsViewPopup={setIsViewPopup}
						setPhotos={setPhotos}
					/>
				</>
			)}
		</Layout>
	);
};

export default ChatPeople;

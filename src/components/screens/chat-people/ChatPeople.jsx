import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';

import { stageDataFunc } from '../../../data/fullLot.data';
import { mockChats } from '../../../data/mock.data';
import BlockStatus from '../../block-status/BlockStatus';
import PopupChat from '../../popups/popup-chat/PopupChat';
import FieldChat from '../../ui/field-chat/FieldChat';

import styles from './ChatPeople.module.scss';

// const ChatPeople = () => {
// 	const { pathname: pathChat } = useLocation();
// 	const [messages, setMessages] = useState([
// 		{ id: 1, text: 'Здравствуйте', fromMe: false, time: '14:26' },
// 		{
// 			id: 2,
// 			text: 'Длинное сообщение Длинное сообщение Длинное сообщение (макс длина)',
// 			fromMe: false,
// 			time: '15:26',
// 		},
// 		{ id: 3, text: 'Здравствуйте', fromMe: true, time: '14:26' },
// 	]);

// 	const [newMessage, setNewMessage] = useState('');
// 	const [photos, setPhotos] = useState([]);
// 	const [videos, setVideos] = useState([]);
// 	const [isViewPopup, setIsViewPopup] = useState(false);

// 	const getImageContainerClass = media => {
// 		if (media.length === 1) return 'imageContainer--1';
// 		if (media.length === 2) return 'imageContainer--2';
// 		if (media.length === 3) return 'imageContainer--3';
// 		if (media.length === 4) return 'imageContainer--4';
// 		return 'imageContainer--more';
// 	};

// 	const handleSendMessage = () => {
// 		if (newMessage.trim() === '') return;

// 		const newMsg = {
// 			id: messages.length + 1,
// 			text: newMessage,
// 			fromMe: true,
// 			time: new Date().toLocaleTimeString().slice(0, 5),
// 		};

// 		setMessages([...messages, newMsg]);
// 		setNewMessage('');
// 	};

// 	const handleMediaChange = (e, type) => {
// 		const files = Array.from(e.target.files);
// 		if (type === 'photo') {
// 			const newPhotos = files.map(file => URL.createObjectURL(file));
// 			setPhotos([...photos, ...newPhotos]);
// 		} else if (type === 'video') {
// 			const newVideos = files.map(file => URL.createObjectURL(file));
// 			setVideos([...videos, ...newVideos]);
// 		}
// 	};

// 	const handleSendMedia = () => {
// 		if (photos.length === 0 && videos.length === 0) return;

// 		const mediaMessage = {
// 			id: messages.length + 1,
// 			images: photos,
// 			videos: videos,
// 			fromMe: true,
// 			time: new Date().toLocaleTimeString().slice(0, 5),
// 		};

// 		setMessages([...messages, mediaMessage]);
// 		setPhotos([]);
// 		setVideos([]);
// 		setIsViewPopup(false);
// 	};

// 	const [ind, setInd] = useState(0);
// 	const testFunck = () => {
// 		if (ind < mockChats.length - 1) {
// 			setInd(prev => prev + 1);
// 		} else {
// 			setInd(0);
// 		}
// 	};
// 	useEffect(() => {
// 		console.log(ind, mockChats.length);
// 	}, [ind]);

// 	return (
// 		<Layout style={{ gap: 'calc(16/412*100vw)' }}>
// 			<Header />
// 			<button onClick={testFunck}>TEST DATA CHAT</button>
// 			<div className={styles.chat}>
// 				{pathChat !== '/chats/help' && (
// 					<>
// 						<BlockStatus data={mockChats[ind]} />
// 						<Button style={{ width: 'auto', fontSize: '0.95rem' }}>
// 							Подтвердить отправление
// 						</Button>
// 					</>
// 				)}
// 				<div className={styles.block__dateMessage}>
// 					<div className={styles.line}></div>
// 					<p className={styles.date}>22 июля</p>
// 				</div>
// 				{messages.map(message => (
// 					<div
// 						key={message.id}
// 						className={
// 							message.fromMe
// 								? styles.block__messageMe
// 								: styles.block__messageThem
// 						}
// 					>
// 						{/* Отображение изображений и видео */}
// 						{message.images && (
// 							<div
// 								className={`${styles.imageContainer} ${styles[getImageContainerClass(message.images)]}`}
// 							>
// 								{message.images.map((image, index) => (
// 									<img
// 										key={index}
// 										src={image}
// 										alt={`Фото ${index + 1}`}
// 										className={styles.messageImage}
// 									/>
// 								))}
// 							</div>
// 						)}
// 						{message.videos && (
// 							<div
// 								className={`${styles.imageContainer} ${styles[getImageContainerClass(message.images)]}`}
// 							>
// 								{message.videos.map((video, index) => (
// 									<video
// 										key={index}
// 										src={video}
// 										controls
// 										className={styles.messageImage}
// 									/>
// 								))}
// 							</div>
// 						)}

// 						{/* Текстовые сообщения */}
// 						{!message.images && !message.videos && (
// 							<p
// 								className={
// 									message.fromMe ? styles.messageMe : styles.messageThem
// 								}
// 							>
// 								{message.text}
// 							</p>
// 						)}

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
// 				handleFileChange={handleMediaChange}
// 				onClick={() => setIsViewPopup(!isViewPopup)}
// 			/>

// 			{isViewPopup && (
// 				<>
// 					<div
// 						className={styles.block__opacity}
// 						onClick={() => setIsViewPopup(false)}
// 					></div>
// 					<PopupChat
// 						handleMediaChange={handleMediaChange}
// 						photos={photos}
// 						videos={videos}
// 						handleSendMedia={handleSendMedia}
// 						setIsViewPopup={setIsViewPopup}
// 						setPhotos={setPhotos}
// 						setVideos={setVideos}
// 					/>
// 				</>
// 			)}
// 		</Layout>
// 	);
// };

const ChatPeople = () => {
	const { pathname: pathChat } = useLocation();
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: 'Здравствуйте',
			fromMe: false,
			time: '14:26',
			date: '2023-09-18',
		},
		{
			id: 2,
			text: 'Длинное сообщение Длинное сообщение Длинное сообщение (макс длина)',
			fromMe: false,
			time: '15:26',
			date: '2023-09-18',
		},
		{
			id: 3,
			text: 'Здравствуйте',
			fromMe: true,
			time: '14:26',
			date: '2023-09-19',
		},
	]);

	const [newMessage, setNewMessage] = useState('');
	const [photos, setPhotos] = useState([]);
	const [videos, setVideos] = useState([]);
	const [isViewPopup, setIsViewPopup] = useState(false);

	const getImageContainerClass = media => {
		if (media.length === 1) return 'imageContainer--1';
		if (media.length === 2) return 'imageContainer--2';
		if (media.length === 3) return 'imageContainer--3';
		if (media.length === 4) return 'imageContainer--4';
		return 'imageContainer--more';
	};

	const handleSendMessage = () => {
		if (newMessage.trim() === '') return;

		const newMsg = {
			id: messages.length + 1,
			text: newMessage,
			fromMe: true,
			time: new Date().toLocaleTimeString().slice(0, 5),
			date: new Date().toISOString().slice(0, 10), // Добавляем дату
		};

		setMessages([...messages, newMsg]);
		setNewMessage('');
	};

	const handleMediaChange = (e, type) => {
		const files = Array.from(e.target.files);
		if (type === 'photo') {
			const newPhotos = files.map(file => URL.createObjectURL(file));
			setPhotos([...photos, ...newPhotos]);
		} else if (type === 'video') {
			const newVideos = files.map(file => URL.createObjectURL(file));
			setVideos([...videos, ...newVideos]);
		}
	};

	const handleSendMedia = () => {
		if (photos.length === 0 && videos.length === 0) return;

		const mediaMessage = {
			id: messages.length + 1,
			images: photos,
			videos: videos,
			fromMe: true,
			time: new Date().toLocaleTimeString().slice(0, 5),
			date: new Date().toISOString().slice(0, 10), // Добавляем дату для медиа-сообщений
		};

		setMessages([...messages, mediaMessage]);
		setPhotos([]);
		setVideos([]);
		setIsViewPopup(false);
	};

	// Функция для рендеринга блока даты
	const renderDateBlock = (currentDate, prevDate) => {
		if (currentDate !== prevDate) {
			const formattedDate = new Date(currentDate).toLocaleDateString('ru-RU', {
				day: 'numeric',
				month: 'long',
			});
			return (
				<div className={styles.block__dateMessage}>
					<div className={styles.line}></div>
					<p className={styles.date}>{formattedDate}</p>
				</div>
			);
		}
		return null;
	};

	const [ind, setInd] = useState(0);
	const [role, setRole] = useState('author');
	const testFunck = () => {
		if (ind < mockChats.length - 1) {
			setInd(prev => prev + 1);
		} else {
			setInd(0);
		}
	};
	const toggleRole = () => {
		if (role === 'author') {
			setRole('buyer');
		} else {
			setRole('author');
		}
	};

	useEffect(() => {
		console.log(ind, mockChats.length);
	}, [ind]);

	return (
		<Layout style={{ gap: 'calc(16/412*100vw)' }}>
			<Header />
			<button onClick={testFunck}>TEST STATE CHAT</button>
			<button onClick={toggleRole}>Роль: {role}</button>

			<div className={styles.chat}>
				{pathChat !== '/chats/help' && (
					<>
						<BlockStatus data={mockChats[ind]} />
						<Button
							style={{ width: 'auto', fontSize: '0.95rem' }}
							disabled={
								(role === 'buyer' &&
									mockChats[ind].description[3] === 'Оплачен') ||
								(role === 'author' &&
									mockChats[ind].description[3] === 'Состоялся') ||
								mockChats[ind].description[3] === 'Отправлен'
							}
						>
							{role === 'author'
								? stageDataFunc(mockChats[ind]).chatButtonStateProdav
								: stageDataFunc(mockChats[ind]).chatButtonStatePokup}
						</Button>
					</>
				)}
				{messages.map((message, index) => (
					<div key={message.id}>
						{/* Отображение блока с датой, если она отличается от предыдущей */}
						{renderDateBlock(
							message.date,
							index > 0 ? messages[index - 1].date : null,
						)}

						<div
							className={
								message.fromMe
									? styles.block__messageMe
									: styles.block__messageThem
							}
						>
							{/* Отображение изображений и видео */}
							{message.images && (
								<div
									className={`${styles.imageContainer} ${
										styles[getImageContainerClass(message.images)]
									}`}
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
							)}
							{message.videos && (
								<div
									className={`${styles.imageContainer} ${
										styles[getImageContainerClass(message.images)]
									}`}
								>
									{message.videos.map((video, index) => (
										<video
											key={index}
											src={video}
											controls
											className={styles.messageImage}
										/>
									))}
								</div>
							)}

							{/* Текстовые сообщения */}
							{!message.images && !message.videos && (
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
					</div>
				))}
			</div>

			<FieldChat
				placeholder='Написать сообщение'
				onChange={e => setNewMessage(e.target.value)}
				handleSendMessage={handleSendMessage}
				newMessage={newMessage}
				handleFileChange={handleMediaChange}
				onClick={() => setIsViewPopup(!isViewPopup)}
			/>

			{isViewPopup && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => setIsViewPopup(false)}
					></div>
					<PopupChat
						handleMediaChange={handleMediaChange}
						photos={photos}
						videos={videos}
						handleSendMedia={handleSendMedia}
						setIsViewPopup={setIsViewPopup}
						setPhotos={setPhotos}
						setVideos={setVideos}
					/>
				</>
			)}
		</Layout>
	);
};

export default ChatPeople;

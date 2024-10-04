import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';

import { stageDataFunc } from '../../../data/fullLot.data';
import { mockChats } from '../../../data/mock.data';
import AddRating from '../../add-rating/AddRating';
import BlockStatus from '../../block-status/BlockStatus';
import PopupChat from '../../popups/popup-chat/PopupChat';
import PopupTraders from '../../popups/popup-traders/PopupTraders';
import FieldChat from '../../ui/field-chat/FieldChat';
import Textarea from '../../ui/textarea/Textarea';

import styles from './ChatPeople.module.scss';

const ChatPeople = () => {
	const nav = useNavigate();
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
	const [isViewPopupCompleted, setIsViewPopupCompleted] = useState(false);
	const [isViewPopupRating, setIsViewPopupRating] = useState(false);
	const [isViewPopupPay, setIsViewPopupPay] = useState(false);

	const getImageContainerClass = media => {
		if (media.length === 1) return 'imageContainer--1';
		if (media.length === 2) return 'imageContainer--2';
		if (media.length === 3) return 'imageContainer--3';
		if (media.length === 4) return 'imageContainer--4';
		if (media.length === 5) return 'imageContainer--5';
		if (media.length === 6) return 'imageContainer--6';
		if (media.length === 7) return 'imageContainer--7';
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

	// const handleMediaChange = (e, type) => {
	// 	const files = Array.from(e.target.files);
	// 	if (type === 'photo') {
	// 		const newPhotos = files.map(file => URL.createObjectURL(file));
	// 		setPhotos([...photos, ...newPhotos]);
	// 	} else if (type === 'video') {
	// 		const newVideos = files.map(file => URL.createObjectURL(file));
	// 		setVideos([...videos, ...newVideos]);
	// 	}
	// };

	const handleMediaChange = e => {
		const files = Array.from(e.target.files);

		const newPhotos = files
			.filter(file => file.type.startsWith('image/'))
			.map(file => URL.createObjectURL(file));

		const newVideos = files
			.filter(file => file.type.startsWith('video/'))
			.map(file => URL.createObjectURL(file));

		// Добавляем новые фото и видео к существующим
		if (newPhotos.length > 0) {
			setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
		}

		if (newVideos.length > 0) {
			setVideos(prevVideos => [...prevVideos, ...newVideos]);
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

	const isViewButton =
		(role === 'author' &&
			mockChats[ind].description[3] !== 'Прием предложений') ||
		(role === 'buyer' && mockChats[ind].description[3] !== 'Прием предложений');

	useEffect(() => {
		console.log(ind, mockChats.length);
	}, [ind]);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const handlers = useSwipeable({
		onSwipedRight: () => nav(-1),
	});

	const onClick_status = () => {
		if (
			role === 'author' &&
			mockChats[ind].description[3] === 'Определение победителя'
		) {
			setIsViewPopupCompleted(true);
		} else if (
			role === 'buyer' &&
			mockChats[ind].description[3] === 'Определение победителя'
		) {
			// Если статус "Определение победителя", блокируем кнопку
			setIsButtonDisabled(true);
			setIsViewPopup(true);
		} else if (
			role === 'author' &&
			mockChats[ind].description[3] === 'Оплачен'
		) {
			setIsViewPopup(true);
		} else if (
			role === 'buyer' &&
			mockChats[ind].description[3] === 'Отправлен'
		) {
			setIsViewPopup(true);
		} else if (
			(role === 'author' || role === 'buyer') &&
			mockChats[ind].description[3] === 'Завершен'
		) {
			setIsViewPopupRating(true);
		} else if (
			role === 'buyer' &&
			mockChats[ind].description[3] === 'Состоялся'
		) {
			setIsViewPopupPay(true);
		}
	};

	const [currentRating, setCurrentRating] = useState(0); // Для отслеживания текущего рейтинга
	// Функция для получения рейтинга из AddRating
	const handleRatingChange = rating => {
		setCurrentRating(rating);
	};

	return (
		<Layout style={{ gap: 'calc(16/412*100vw)' }}>
			<button onClick={testFunck}>TEST STATE CHAT</button>
			<button onClick={toggleRole}>Роль: {role}</button>

			<button
				className={styles.button__exitChat}
				onClick={() => nav(-1)}
				{...handlers}
			>
				<img src='/images/icons/arrow_right.svg' alt='arrow' />
			</button>

			<div className={styles.chat}>
				{pathChat !== '/chats/help' && (
					<>
						<BlockStatus data={mockChats[ind]} />
						{isViewButton && (
							<Button
								style={{ width: 'auto', fontSize: '0.95rem' }}
								disabled={
									(isButtonDisabled &&
										role === 'buyer' &&
										mockChats[ind].description[3] ===
											'Определение победителя') ||
									(role === 'buyer' &&
										mockChats[ind].description[3] === 'Оплачен') ||
									(role === 'author' &&
										mockChats[ind].description[3] === 'Состоялся') ||
									(role === 'author' &&
										mockChats[ind].description[3] === 'Отправлен')
								}
								onClick={onClick_status}
							>
								{role === 'author'
									? stageDataFunc(mockChats[ind]).chatButtonStateProdav
									: stageDataFunc(mockChats[ind]).chatButtonStatePokup}
							</Button>
						)}
					</>
				)}
				{messages.map((message, index) => (
					<div key={message.id} className={styles['block-wrapper__chat']}>
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
							{/* {Array.isArray(message.images) && message.images.length > 0 && (
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
							)} */}

							{Array.isArray(message.images) && message.images.length > 0 && (
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

							{Array.isArray(message.videos) && message.videos.length > 0 && (
								<div
									className={`${styles.imageContainer} ${
										styles[getImageContainerClass(message.videos)]
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

			{mockChats[ind].description[3] !== 'Завершен' && (
				<FieldChat
					placeholder='Написать сообщение'
					onChange={e => setNewMessage(e.target.value)}
					handleSendMessage={handleSendMessage}
					newMessage={newMessage}
					handleFileChange={handleMediaChange}
					onClick={() => setIsViewPopup(!isViewPopup)}
				/>
			)}

			{isViewPopupPay && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => setIsViewPopupPay(false)}
					/>
					<PopupTraders
						onClick={() => setIsViewPopupPay(false)}
						button={'Оплатить'}
						lot={{ descriptionTrade: [0, 1, 2, 'Оплатить'] }}
					/>
				</>
			)}

			{(isViewPopupCompleted || isViewPopupRating) && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => {
							setIsViewPopupRating(false);
							setIsViewPopupCompleted(false);
						}}
					></div>
					<div className={styles.block__popupComplited}>
						<div className={styles.block__titlePopup}>
							<h4 className={styles.title}>
								{isViewPopupRating ? 'Оставьте отзыв' : 'Объявить победителя ?'}
							</h4>
							{/* <button
								className={styles.button__exit}
								onClick={() => {
									setIsViewPopupRating(false);
									setIsViewPopupCompleted(false);
								}}
							>
								<img src='/images/icons/exit.svg' alt='exit' />
							</button> */}
						</div>
						{isViewPopupRating && (
							<>
								<AddRating onRatingChange={handleRatingChange} />
								<Textarea
									placeholder={'Здесь можете оставить текстовый отзыв'}
									label={'Комментарий'}
									styleBlock={{ marginTop: 'calc(10/412*100vw' }}
								/>
								<div className={styles.buttons__popup}>
									<Button
										onClick={() => setIsViewPopupRating(false)}
										disabled={currentRating === 0}
									>
										Оставить
									</Button>
									<Button onClick={() => setIsViewPopupRating(false)}>
										Нет
									</Button>
								</div>
							</>
						)}

						{isViewPopupCompleted && (
							<>
								<Button onClick={() => setIsViewPopupCompleted(false)}>
									Да
								</Button>
								<Button onClick={() => setIsViewPopupCompleted(false)}>
									Нет
								</Button>
							</>
						)}
					</div>
				</>
			)}

			{isViewPopup && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => setIsViewPopup(false)}
					></div>
					{isButtonDisabled ? (
						<PopupTraders
							button='Сделать предложение'
							onClick={() => setIsViewPopup(false)}
							lot={mockChats[0]}
						/>
					) : (
						<PopupChat
							handleMediaChange={handleMediaChange}
							photos={photos}
							videos={videos}
							handleSendMedia={handleSendMedia}
							setIsViewPopup={setIsViewPopup}
							setPhotos={setPhotos}
							setVideos={setVideos}
						/>
					)}
				</>
			)}
		</Layout>
	);
};

export default ChatPeople;

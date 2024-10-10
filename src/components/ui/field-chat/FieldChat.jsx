import { useRef, useState } from 'react';

import styles from './FieldChat.module.scss';

// const FieldChat = ({
// 	placeholder,
// 	onChange,
// 	handleSendMessage,
// 	newMessage,
// 	onClick,
// 	// handleFileChange,
// 	handleSendMediaForScrep,
// }) => {
// 	const [photos, setPhotos] = useState([]); // Храним фотографии
// 	const [videos, setVideos] = useState([]); // Храним видео
// 	const inputRef = useRef(null); // Реф на поле ввода
// 	// Обработчик клика на кнопку для открытия галереи или камеры
// 	const handleMediaClick = () => {
// 		document.getElementById('mediaInput').click();
// 	};

// 	// Обработчик выбора файлов (медиа)
// 	const handleMediaUpload = e => {
// 		const files = Array.from(e.target.files);
// 		const newPhotos = [];
// 		const newVideos = [];

// 		// Разделяем файлы по типу: изображения и видео
// 		files.forEach(file => {
// 			if (file.type.startsWith('image')) {
// 				newPhotos.push(URL.createObjectURL(file));
// 			} else if (file.type.startsWith('video')) {
// 				newVideos.push(URL.createObjectURL(file));
// 			}
// 		});

// 		// Обновляем состояние фотографий и видео
// 		setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
// 		setVideos(prevVideos => [...prevVideos, ...newVideos]);

// 		// Отправляем медиа в чат
// 		handleSendMediaForScrep(newPhotos, newVideos);
// 	};

// 	return (
// 		<div className={styles.inputBlock}>
// 			{/* Кнопка для добавления медиа */}
// 			<button className={styles.button} onClick={handleMediaClick}>
// 				<img
// 					src='/images/icons/chat/screp.svg'
// 					alt='Attach'
// 					className={styles.attachIcon}
// 				/>
// 			</button>

// 			{/* Скрытый input для выбора файлов (из галереи или камеры) */}
// 			<input
// 				id='mediaInput'
// 				type='file'
// 				accept='image/*,video/*'
// 				multiple
// 				style={{ display: 'none' }}
// 				onChange={handleMediaUpload} // Обрабатываем выбор файлов
// 			/>

// 			{/* Поле ввода для текста сообщения */}
// 			<input
// 				ref={inputRef} // Добавляем реф
// 				type='text'
// 				value={newMessage}
// 				onChange={onChange}
// 				className={styles.input}
// 				placeholder={placeholder}
// 			/>

// 			{/* Кнопка отправки текста */}
// 			<button
// 				onClick={() => {
// 					handleSendMessage();
// 					inputRef.current.focus(); // Возвращаем фокус на поле ввода
// 				}}
// 				className={styles.sendButton}
// 			>
// 				<img src='/images/icons/chat/send.svg' alt='send' />
// 			</button>
// 		</div>
// 	);
// };

const FieldChat = ({
	placeholder,
	onChange,
	handleSendMessage,
	newMessage,
	onClick,
	handleSendMediaForScrep,
}) => {
	const [photos, setPhotos] = useState([]); // Храним фотографии
	const [videos, setVideos] = useState([]); // Храним видео
	const inputRef = useRef(null); // Реф на поле ввода

	// Обработчик клика на кнопку для открытия галереи или камеры
	const handleMediaClick = () => {
		document.getElementById('mediaInput').click();
	};

	// Обработчик выбора файлов (медиа)
	const handleMediaUpload = e => {
		const files = Array.from(e.target.files);
		const newPhotos = [];
		const newVideos = [];

		// Разделяем файлы по типу: изображения и видео
		files.forEach(file => {
			if (file.type.startsWith('image')) {
				newPhotos.push(URL.createObjectURL(file));
			} else if (file.type.startsWith('video')) {
				newVideos.push(URL.createObjectURL(file));
			}
		});

		// Обновляем состояние фотографий и видео
		setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
		setVideos(prevVideos => [...prevVideos, ...newVideos]);

		// Отправляем медиа в чат
		handleSendMediaForScrep(newPhotos, newVideos);
	};

	// Функция для автоматического изменения высоты поля ввода
	const adjustTextareaHeight = e => {
		const textarea = e.target;
		textarea.style.height = 'auto'; // Сбрасываем высоту перед расчётом
		textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем высоту в зависимости от содержимого
		onChange(e); // Вызываем родительский onChange
	};

	return (
		<div className={styles.inputBlock}>
			{/* Кнопка для добавления медиа */}
			<button className={styles.button} onClick={handleMediaClick}>
				<img
					src='/images/icons/chat/screp.svg'
					alt='Attach'
					className={styles.attachIcon}
				/>
			</button>

			{/* Скрытый input для выбора файлов (из галереи или камеры) */}
			<input
				id='mediaInput'
				type='file'
				accept='image/*,video/*'
				multiple
				style={{ display: 'none' }}
				onChange={handleMediaUpload} // Обрабатываем выбор файлов
			/>

			{/* Поле ввода для текста сообщения (textarea вместо input) */}
			<textarea
				ref={inputRef} // Добавляем реф
				value={newMessage}
				onChange={adjustTextareaHeight} // Изменяем высоту по мере ввода текста
				className={styles.textarea} // Применяем класс для textarea
				placeholder={placeholder}
				rows={1} // Начальное количество строк
				style={{
					maxHeight: '200px', // Максимальная высота, после которой появляется скролл
					overflowY: 'auto', // Скролл по вертикали, если текст превышает maxHeight
				}}
			/>

			{/* Кнопка отправки текста */}
			<button
				onClick={() => {
					handleSendMessage();
					inputRef.current.focus(); // Возвращаем фокус на поле ввода
				}}
				className={styles.sendButton}
			>
				<img src='/images/icons/chat/send.svg' alt='send' />
			</button>
		</div>
	);
};

export default FieldChat;

import styles from './FieldChat.module.scss';

// const FieldChat = ({
// 	placeholder,
// 	onChange,
// 	handleSendMessage,
// 	newMessage,
// 	handleFileChange,
// }) => {
// 	return (
// 		<div className={styles.inputBlock}>
// 			<label htmlFor='file-upload' className={styles.fileButton}>
// 				<img
// 					src='/images/icons/chat/screp.svg'
// 					alt='Attach'
// 					className={styles.attachIcon}
// 				/>
// 			</label>
// 			<input
// 				id='file-upload'
// 				type='file'
// 				accept='image/*,video/*' // Принимаем как изображения, так и видео
// 				onChange={handleFileChange}
// 				style={{ display: 'none' }} // Скрываем input
// 			/>
// 			<input
// 				type='text'
// 				value={newMessage}
// 				onChange={onChange}
// 				className={styles.input}
// 				placeholder={placeholder}
// 			/>
// 			<button onClick={handleSendMessage} className={styles.sendButton}>
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
	// handleFileChange,
}) => {
	return (
		<div className={styles.inputBlock}>
			<button className={styles.button} onClick={onClick}>
				<img
					src='/images/icons/chat/screp.svg'
					alt='Attach'
					className={styles.attachIcon}
				/>
			</button>
			<input
				type='text'
				value={newMessage}
				onChange={onChange}
				className={styles.input}
				placeholder={placeholder}
			/>
			<button onClick={handleSendMessage} className={styles.sendButton}>
				<img src='/images/icons/chat/send.svg' alt='send' />
			</button>
		</div>
	);
};

export default FieldChat;

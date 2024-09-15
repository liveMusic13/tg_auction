import { useEffect, useState } from 'react';

import styles from './ButtonIcon.module.scss';

const ButtonIcon = ({ onClick, data, style, isActive, isLike, styleImg }) => {
	const [src, setSrc] = useState(data.src);

	const handleMouseDown = () => {
		setSrc(data.src_active);
	};

	const handleMouseUp = () => {
		const timeoutId = setTimeout(() => {
			setSrc(data.src);
		}, 150);

		return () => clearTimeout(timeoutId);
	};

	// Обновляем картинку в зависимости от состояния фильтрации
	useEffect(() => {
		if (isActive) {
			setSrc(data.src_active); // Устанавливаем активное изображение, если фильтрация включена
		} else {
			setSrc(data.src);
		}
	}, [isActive]);

	return (
		<button
			onClick={onClick}
			onMouseDown={!isLike ? handleMouseDown : undefined}
			onMouseUp={!isLike ? handleMouseUp : undefined}
			style={style}
			className={styles.buttonIcon}
		>
			<img src={src} alt='icon' style={styleImg} />
		</button>
	);
};

export default ButtonIcon;

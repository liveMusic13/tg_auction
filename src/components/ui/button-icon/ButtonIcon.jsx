import { useState } from 'react';

import styles from './ButtonIcon.module.scss';

const ButtonIcon = ({ onClick, data, style }) => {
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

	return (
		<button
			onClick={onClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			style={style}
			className={styles.buttonIcon}
		>
			<img src={src} alt='icon' />
		</button>
	);
};

export default ButtonIcon;

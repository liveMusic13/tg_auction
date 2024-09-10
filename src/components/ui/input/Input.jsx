import { useState } from 'react';

import styles from './Input.module.scss';

const Input = ({ placeholder, label, style }) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={styles.block__input} style={style}>
			<label
				className={`${styles.label} ${isFocused ? styles.focusedLabel : ''}`}
			>
				{label}
			</label>
			<input
				placeholder={placeholder}
				type='text'
				className={`${styles.input} ${isFocused ? styles.focusedInput : ''}`}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</div>
	);
};

export default Input;

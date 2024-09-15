import { useState } from 'react';

import styles from './Input.module.scss';

const Input = ({
	placeholder,
	label,
	style,
	value,
	onChange,
	styleInput,
	styleLabel,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={styles.block__input} style={style}>
			<label
				style={styleLabel}
				className={`${styles.label} ${isFocused ? styles.focusedLabel : ''}`}
			>
				{label}
			</label>
			<input
				style={styleInput}
				placeholder={placeholder}
				type='text'
				className={`${styles.input} ${isFocused ? styles.focusedInput : ''}`}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default Input;

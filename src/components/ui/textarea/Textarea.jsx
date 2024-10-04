import { useState } from 'react';

import styles from './Textarea.module.scss';

const Textarea = ({ placeholder, label, style, styleBlock, onChange }) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={styles.block__textarea} style={styleBlock}>
			<label
				className={`${styles.label} ${isFocused ? styles.focusedLabel : ''}`}
			>
				{label}
			</label>
			<textarea
				style={style}
				className={`${styles.textarea} ${isFocused ? styles.focusedTextarea : ''}`}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onChange={onChange ? onChange : undefined}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Textarea;

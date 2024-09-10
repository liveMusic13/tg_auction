import { useState } from 'react';

import styles from './Textarea.module.scss';

const Textarea = ({ placeholder, label }) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={styles.block__textarea}>
			<label
				className={`${styles.label} ${isFocused ? styles.focusedLabel : ''}`}
			>
				{label}
			</label>
			<textarea
				className={`${styles.textarea} ${isFocused ? styles.focusedTextarea : ''}`}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Textarea;

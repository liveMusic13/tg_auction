import styles from './Button.module.scss';

const Button = ({ onClick, children, style, disabled, enableActive }) => {
	return (
		<button
			onClick={onClick}
			style={style}
			className={`${styles.button} ${enableActive ? styles.active : ''}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;

import styles from './Button.module.scss';

const Button = ({ onClick, children, style }) => {
	return (
		<button onClick={onClick} style={style} className={styles.button}>
			{children}
		</button>
	);
};

export default Button;

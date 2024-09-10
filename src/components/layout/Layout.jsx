import styles from './Layout.module.scss';

const Layout = ({ children, style }) => {
	return (
		<div className={styles.wrapper_layout} style={style}>
			{children}
		</div>
	);
};

export default Layout;

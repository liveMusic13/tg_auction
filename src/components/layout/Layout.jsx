import { forwardRef } from 'react';

import styles from './Layout.module.scss';

// const Layout = ({ children, style }) => {
// 	return (
// 		<div className={styles.wrapper_layout} style={style}>
// 			{children}
// 		</div>
// 	);
// };
const Layout = forwardRef(({ children, style }, ref) => {
	return (
		<div ref={ref} className={styles.wrapper_layout} style={style}>
			{children}
		</div>
	);
});

export default Layout;

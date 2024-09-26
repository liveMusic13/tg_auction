import { forwardRef } from 'react';

import styles from './Layout.module.scss';

const Layout = forwardRef(({ children, style }, ref) => {
	return (
		<div ref={ref} className={styles.wrapper_layout} style={style}>
			{children}
		</div>
	);
});

export default Layout;

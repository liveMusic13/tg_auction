import { Link, useLocation } from 'react-router-dom';

import styles from './InterfaceApp.module.scss';
import { colors } from '@/app.constants';
import { interfaceDataArr } from '@/data/interface.data';

const InterfaceApp = () => {
	const { pathname } = useLocation();

	const style = path => {
		return {
			backgroundColor: pathname.startsWith(path)
				? colors.color_light_blue
				: undefined,
		};
	};

	const styleText = path => {
		return {
			color: pathname.startsWith(path) ? colors.color_blue : undefined,
		};
	};

	const srcFunck = icon =>
		pathname.startsWith(icon.path) ? icon.src_active : icon.src;

	return (
		<div className={styles.block__interface}>
			{interfaceDataArr.map(icon => {
				return (
					<Link key={icon.id} to={icon.path} className={styles.block__icon}>
						<div className={styles.background__icon} style={style(icon.path)}>
							<img
								src={srcFunck(icon)}
								alt={icon.title}
								className={styles.icon}
							/>
						</div>
						<p className={styles.name} style={styleText(icon.path)}>
							{icon.title}
						</p>
					</Link>
				);
			})}
		</div>
	);
};

export default InterfaceApp;

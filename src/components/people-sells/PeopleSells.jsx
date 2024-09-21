import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/ui/button/Button';

import { renderStars } from '../stars/Stars';

import styles from './PeopleSells.module.scss';

const PeopleSells = ({ data, style }) => {
	const nav = useNavigate();
	const { pathname } = useLocation();

	const onClick = () => {
		nav(`/chats/${data.name}`);
	};

	// const style = {
	// 	width: '100%',
	// 	// justifyContent: 'space-between',
	// };

	return (
		<div className={styles.block__people} style={style}>
			<div
				className={styles.left}
				// style={pathname === '/profile/referral' ? style : {}}
			>
				<img src={data.image} alt='image' className={styles.avatar} />
				<div className={styles.block__name}>
					<h2 className={styles.name}>{data.name}</h2>
					<div className={styles.block__rating}>{renderStars(data.rating)}</div>
				</div>
				{pathname !== '/profile/referral' && (
					<p className={styles.price}>{data.price}</p>
				)}
			</div>
			{pathname === '/profile/referral' ? null : (
				<Button onClick={onClick} style={{ width: 'auto' }}>
					Чат
				</Button>
			)}
			{pathname === '/profile/referral' && (
				<p className={styles.info}>Какая-то инфа</p>
			)}
		</div>
	);
};

export default PeopleSells;

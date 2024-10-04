import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/ui/button/Button';

import { renderStars } from '../stars/Stars';

import styles from './PeopleSells.module.scss';

const PeopleSells = ({ data, style, stage }) => {
	const nav = useNavigate();
	const { pathname } = useLocation();

	const isStatusView = pathname.includes('view');

	const onClick = () => {
		nav(`/chats/${data.name}`);
	};

	console.log(stage);

	return (
		<div className={styles.block__people} style={style}>
			<div className={styles.left}>
				<img src={data.image} alt='image' className={styles.avatar} />
				<div className={styles.block__name}>
					<h2 className={styles.name}>{data.name}</h2>
					<div className={styles.block__rating}>{renderStars(data.rating)}</div>
				</div>
				{pathname !== '/profile/referral' && (
					<p
						className={styles.price}
						style={isStatusView ? { left: '75%' } : {}}
					>
						{data.price}
					</p>
				)}
			</div>
			{/* {data.isWinner && (
				<Button onClick={onClick} style={{ width: 'auto' }}>
					Чат
				</Button>
			)} */}
			{!isStatusView && (
				<Button
					onClick={onClick}
					style={{ width: 'auto' }}
					disabled={!data.isWinner && stage !== 'Определение победителя'}
				>
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

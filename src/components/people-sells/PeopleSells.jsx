import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/button/Button';

import { renderStars } from '../stars/Stars';

import styles from './PeopleSells.module.scss';

const PeopleSells = ({ data }) => {
	const nav = useNavigate();

	const onClick = () => {
		nav('/chats');
	};

	return (
		<div className={styles.block__people}>
			<div className={styles.left}>
				<img src={data.image} alt='image' className={styles.avatar} />
				<div className={styles.block__name}>
					<h2 className={styles.name}>{data.name}</h2>
					<div className={styles.block__rating}>{renderStars(data.rating)}</div>
				</div>
				<p className={styles.price}>{data.price}</p>
			</div>
			<Button onClick={onClick} style={{ width: 'auto' }}>
				Чат
			</Button>
		</div>
	);
};

export default PeopleSells;

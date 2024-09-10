import { Link } from 'react-router-dom';

import { renderStars } from '../stars/Stars';

import styles from './PeopleChat.module.scss';

const PeopleChat = ({ data }) => {
	return (
		<Link
			to={`/chats/${data.description[0]}`}
			className={styles.block__peopleChat}
		>
			<div className={styles.left}>
				<div className={styles.block__title}>
					<img src={data.image} alt='image' className={styles.avatar} />
					<div className={styles.block__name}>
						<h2 className={styles.name}>{data.name}</h2>
						<div className={styles.block__rating}>
							{renderStars(data.rating)}
						</div>
					</div>
				</div>
				<div className={styles.block__description}>
					{data.description.map(el => (
						<div key={el} className={styles.description}>
							<div className={styles.circle}></div>
							<p className={styles.text}>{el}</p>
						</div>
					))}
				</div>
			</div>
			<div className={styles.right}>
				<p className={styles.time}>14:26</p>
				<p className={styles.quantity}>{data.unread_messages}</p>
			</div>
		</Link>
	);
};

export default PeopleChat;

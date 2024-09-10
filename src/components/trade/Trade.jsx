import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IS_PRO } from '../../app.constants';
import { actions as likesAction } from '../../store/likes/likes.slice';

import styles from './Trade.module.scss';

const Trade = ({ data }) => {
	const dispatch = useDispatch();
	const { arrLikes } = useSelector(state => state.likes);
	const [isLike, setIsLike] = useState(arrLikes.some(id => id === data.id));

	useEffect(() => {
		if (isLike) {
			dispatch(likesAction.addLike(data.id));
		} else {
			dispatch(likesAction.deleteLike(data.id));
		}
	}, [isLike]);

	const addLike = () => {
		setIsLike(!isLike);
	};

	return (
		<div className={styles.block__trade}>
			<div className={styles.block__images}>
				{data.photo.map((img, index) => (
					<img
						key={`${index}${img}`}
						src={img}
						alt='image'
						className={styles.image}
					/>
				))}
			</div>
			<div className={styles.block__two}>
				<div className={styles.block__description}>
					{data.description.map(desc => (
						<div key={desc} className={styles.description}>
							<span className={styles.circle}></span>
							{desc}
						</div>
					))}
				</div>
				{IS_PRO && (
					<button className={styles.button__like} onClick={addLike}>
						<img
							src={
								arrLikes.some(id => id === data.id)
									? '/images/icons/buttons/like_active.svg' // Активный лайк
									: '/images/icons/buttons/like.svg' // Обычный лайк
							}
							alt='like'
						/>
					</button>
				)}
			</div>
		</div>
	);
};

export default Trade;

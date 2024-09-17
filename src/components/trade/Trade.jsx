import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IS_PRO } from '../../app.constants';
import { mockTrade } from '../../data/mock.data';
import { actions as likesAction } from '../../store/likes/likes.slice';
import { actions as lotsAction } from '../../store/lots-data/lots.data';

import styles from './Trade.module.scss';

const Trade = ({ data }) => {
	const dispatch = useDispatch();
	const { arrLikes } = useSelector(state => state.likes);
	const [isLike, setIsLike] = useState(arrLikes.some(id => id === data.id));

	useEffect(() => {
		dispatch(lotsAction.addLots(mockTrade));
	}, []);

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
			<Link to={`/traders/view/${data.title}`} className={styles.block__images}>
				{data.image.map((img, index) => {
					if (!img.includes('.mp4')) {
						return (
							<img
								key={`${index}${img}`}
								src={img}
								alt='image'
								className={styles.image}
							/>
						);
					}
				})}
			</Link>
			<div className={styles.block__two}>
				<div className={styles.block__description}>
					{data.descriptionTrade.map(desc => (
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

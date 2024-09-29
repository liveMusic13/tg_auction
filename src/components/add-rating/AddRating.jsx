import { useState } from 'react';

import styles from './AddRating.module.scss';

const AddRating = () => {
	const [rating, setRating] = useState(0); // Сохраняем текущий рейтинг
	const arr = [0, 1, 2, 3, 4]; // Индексы звезд

	return (
		<div className={styles.block__rating}>
			{arr.map((star, index) => (
				<img
					key={index}
					src={
						index < rating
							? '/images/icons/star.svg' // Активная звезда
							: '/images/icons/star_noActive.svg' // Неактивная звезда
					}
					alt='star'
					onClick={() => setRating(index + 1)} // Меняем рейтинг при клике
					className={styles.star}
				/>
			))}
		</div>
	);
};

export default AddRating;

import React from 'react';

import styles from './Star.module.scss';

export const renderStars = rating => {
	const fullStars = Math.floor(rating); // Количество полных звезд
	const hasHalfStar = rating % 1 !== 0; // Есть ли половинная звезда
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Количество серых звезд

	const stars = [];

	// Добавляем желтые звезды
	for (let i = 0; i < fullStars; i++) {
		stars.push(
			React.createElement('img', {
				className: styles.star,
				key: `full-${i}`,
				src: '/images/icons/star.svg',
				alt: 'full star',
			}),
		);
	}

	// Добавляем половинную звезду, если есть
	if (hasHalfStar) {
		stars.push(
			React.createElement('img', {
				className: styles.star,
				key: 'half',
				src: '/images/icons/pol_star.svg',
				alt: 'half star',
			}),
		);
	}

	// Добавляем серые звезды
	for (let i = 0; i < emptyStars; i++) {
		stars.push(
			React.createElement('img', {
				className: styles.star,
				key: `empty-${i}`,
				src: '/images/icons/star_noActive.svg',
				alt: 'empty star',
			}),
		);
	}

	return stars;
};

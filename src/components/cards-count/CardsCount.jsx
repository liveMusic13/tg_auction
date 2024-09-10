import { colors } from '../../app.constants';

import styles from './CardsCount.module.scss';

const CardsCount = ({ cards, handleCardClick, selectedCard, style }) => {
	return (
		<div className={styles.block__count} style={style}>
			{cards.map(card => (
				<div
					key={card.id}
					className={styles.card}
					onClick={() => handleCardClick(card.number)}
					style={
						selectedCard === card.number
							? {
									border: `1px solid ${colors.color_blue}`,
								}
							: {}
					}
				>
					<div className={styles.block__one}>
						<img src={card.img} alt='image' className={styles.icon__bank} />
						<p className={styles.number}>
							<span className={styles.circle}></span>
							{card.number.slice(0, 4)}
						</p>
					</div>
					<p className={styles.type__card}>{card.type}</p>
				</div>
			))}
		</div>
	);
};

export default CardsCount;

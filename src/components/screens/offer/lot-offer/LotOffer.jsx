import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/button/Button';

import { colors } from '../../../../app.constants';

import styles from './LotOffer.module.scss';

const LotOffer = ({ data }) => {
	const nav = useNavigate();
	const styleB = {
		width: 'calc(104/412*100vw)',
	};

	const onClick = () => {
		nav(`/lots/offer/${data.title}`);
	};

	return (
		<div className={styles.block__lotOffer}>
			<img src={data.image[0]} alt='img' className={styles.image} />
			<div className={styles.block__content}>
				<h2 className={styles.title}>{data.title}</h2>
				<p className={styles.description}>
					Статус:
					<span
						className={`${styles.value} ${styles.st}`}
						style={data.status === 'Отменен' ? { color: colors.color_red } : {}}
					>
						{data.status}
					</span>
				</p>
				<p className={styles.description}>
					Высшая цена:
					<span className={styles.value}>{data.max_price}</span>
				</p>
				<p className={styles.description}>
					До окончания:
					<span className={styles.value}>{data.time}</span>
				</p>
				<Button style={styleB} onClick={onClick}>
					Подробнее
				</Button>
			</div>
		</div>
	);
};

export default LotOffer;

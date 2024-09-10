import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../app.constants';
import { mockPeopleOffer } from '../../data/mock.data';
import PeopleSells from '../people-sells/PeopleSells';

import styles from './FullLot.module.scss';

const FullLot = () => {
	const { dataLots } = useSelector(state => state.lots);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const { id } = useParams();
	const [isViewOffer, setIsViewOffer] = useState(false);

	// Поиск объекта в dataLots, где title совпадает с id
	const lot = dataLots.find(lot => lot.title === id);

	if (!lot) {
		// Обработка случая, когда лот не найден
		return <p>Лот не найден</p>;
	}
	const totalImages = lot.image.length;

	// Функция для смены изображения
	const handleImageChange = direction => {
		setCurrentImageIndex(prevIndex => {
			if (direction === 'next') {
				return prevIndex === totalImages - 1 ? 0 : prevIndex + 1;
			} else {
				return prevIndex === 0 ? totalImages - 1 : prevIndex - 1;
			}
		});
	};

	// Обработчики свайпов
	const handlers = useSwipeable({
		onSwipedLeft: () => handleImageChange('next'),
		onSwipedRight: () => handleImageChange('prev'),
	});

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
			}}
		>
			<Header />
			<div className={styles.block__nav}>
				<Navbar
					style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
				/>
				<button className={styles.button__nav}>
					<img src='/images/icons/secret.svg' alt='img' />
				</button>
			</div>
			<div className={styles.block__fullLot}>
				<div className={styles.block__slider} {...handlers}>
					<img
						className={styles.image__slider}
						src={lot.image[currentImageIndex]}
						alt={`Image ${currentImageIndex + 1}`}
					/>
					<p className={styles.number__image}>
						{currentImageIndex + 1}/{totalImages}
					</p>
				</div>

				<div className={styles.info__lot}>
					<p className={styles.text}>
						Статус:
						<span
							className={`${styles.value} ${styles.st}`}
							style={
								lot.status === 'Отменен' ? { color: colors.color_red } : {}
							}
						>
							{lot.status}
						</span>
					</p>
					<p className={styles.text}>
						Город:
						<span className={styles.value}>{lot.city}</span>
					</p>
					<p className={styles.text}>
						До окончания:
						<span className={styles.value}>{lot.time}</span>
					</p>
					<p className={styles.text}>
						Победитель будет определен не позднее:
						<span className={styles.value}>{lot.time_winner}</span>
					</p>
				</div>
				<div className={styles.info__product}>
					<p className={styles.text}>
						Длина:
						<span className={styles.value}>{lot.long}</span>
					</p>
					<p className={styles.text}>
						Натуральный цвет:
						<span className={styles.value}>{lot.natural_color}</span>
					</p>
					<p className={styles.text}>
						Текущий цвет:
						<span className={styles.value}>{lot.color}</span>
					</p>
					<p className={styles.text}>
						Тип:
						<span className={styles.value}>{lot.type}</span>
					</p>
					<p className={styles.text}>
						Возраст донора:
						<span className={styles.value}>{lot.age}</span>
					</p>
				</div>
				<p className={styles.description}>{lot.description}</p>

				{/* {!IS_PRO && (
					<div className={styles.pro}>
						<p className={styles.text__pro}>
							Хотите сделать предложение? Подключите тариф PRO
						</p>
						<Button>Подключить PRO</Button>
					</div>
				)} */}

				<div className={styles.block__offers}>
					<div
						className={styles.block__title}
						onClick={() => setIsViewOffer(!isViewOffer)}
					>
						<h4 className={styles.title}>Предложения</h4>
						<img
							className={styles.arrow__offer}
							src={
								isViewOffer
									? '/images/icons/lots/arrow_top.svg'
									: '/images/icons/lots/arrow_bot.svg'
							}
							alt='arrow'
						/>
					</div>
					{isViewOffer && (
						<div className={styles.block__people}>
							{mockPeopleOffer.map(people => (
								<PeopleSells key={people.id} data={people} />
							))}
						</div>
					)}
				</div>
			</div>

			<InterfaceApp />
		</Layout>
	);
};

export default FullLot;

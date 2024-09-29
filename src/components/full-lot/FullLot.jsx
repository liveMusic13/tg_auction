import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { IS_PRO, colors } from '../../app.constants';
import { stageDataFunc } from '../../data/fullLot.data';
import { mockPeopleOffer } from '../../data/mock.data';
import PeopleSells from '../people-sells/PeopleSells';
import PopupTraders from '../popups/popup-traders/PopupTraders';

import styles from './FullLot.module.scss';
import Galery from './galery/Galery';

// const FullLot = () => {
// 	const nav = useNavigate();
// 	const { dataLots } = useSelector(state => state.lots);
// 	const [currentImageIndex, setCurrentImageIndex] = useState(0);
// 	const { id } = useParams();
// 	const { pathname } = useLocation();
// 	const [isViewOffer, setIsViewOffer] = useState(true);
// 	const [isViewPopup, setIsViewPopup] = useState(false);
// 	const [button, setIsButton] = useState('');
// 	const [visibleOffers, setVisibleOffers] = useState(11);

// 	const handleLoadMore = () => {
// 		setVisibleOffers(prevCount => prevCount + 10);
// 	};

// 	// Поиск объекта в dataLots, где title совпадает с id
// 	const lot = dataLots.find(lot => lot.title === id);

// 	if (!lot) {
// 		// Обработка случая, когда лот не найден
// 		return <p>Лот не найден</p>;
// 	}

// 	const isStatusView = pathname.includes('view');
// 	const isAuction = pathname.includes('auction');

// 	const forStatusCancelled = !stageDataFunc(lot).isOffers
// 		? []
// 		: mockPeopleOffer;

// 	const totalImages = lot.image.length;

// 	const onClick = but => {
// 		if (but === 'Открыть чат') {
// 			nav(`/chats/${lot.name}`);
// 		} else {
// 			setIsButton(but);
// 			setIsViewPopup(true);
// 		}
// 	};

// 	// Функция для смены изображения
// 	const handleImageChange = direction => {
// 		setCurrentImageIndex(prevIndex => {
// 			if (direction === 'next') {
// 				return prevIndex === totalImages - 1 ? 0 : prevIndex + 1;
// 			} else {
// 				return prevIndex === 0 ? totalImages - 1 : prevIndex - 1;
// 			}
// 		});
// 	};

// 	// Обработчики свайпов
// 	const handlers = useSwipeable({
// 		onSwipedLeft: () => handleImageChange('next'),
// 		onSwipedRight: () => handleImageChange('prev'),
// 	});

// 	const handleShare = () => {
// 		if (navigator.share) {
// 			navigator
// 				.share({
// 					title: 'Название страницы',
// 					text: 'Интересная информация',
// 					url: window.location.href, // Текущая ссылка на страницу
// 				})
// 				.then(() => {
// 					console.log('Успешно поделились!');
// 				})
// 				.catch(error => {
// 					console.error('Ошибка при обмене ссылкой:', error);
// 				});
// 		} else {
// 			console.log('Web Share API не поддерживается в этом браузере');
// 		}
// 	};

// 	const {
// 		activeFullScreen,
// 		isFullScreen,
// 		disableFullScreen,
// 		isPlaying,
// 		setIsFullScreen,
// 		setIsPlaying,
// 		setT,
// 		t,
// 		togglePlay,
// 	} = usePlayer();
// 	const videoRef = useRef();

// 	useEffect(() => {
// 		if (t) setIsFullScreen(false);
// 	}, [isFullScreen, t]);

// 	return (
// 		<Layout
// 			style={{
// 				gap: 'calc(16/412*100vw)',
// 				overflow: isViewPopup ? 'hidden' : 'auto',
// 			}}
// 		>
// 			<div className={styles.block__nav}>
// 				<Navbar
// 					style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
// 				/>
// 				<button className={styles.button__nav} onClick={handleShare}>
// 					<img src='/images/icons/secret.svg' alt='img' />
// 				</button>
// 			</div>
// 			<div className={styles.block__fullLot}>
// 				<div
// 					className={
// 						isFullScreen ? styles.fullScreenSlider : styles.block__slider
// 					}
// 					onClick={IS_PRO && activeFullScreen}
// 					{...handlers}
// 				>
// 					{lot.image[currentImageIndex].includes('.mp4') ? (
// 						<div className={styles.videoWrapper}>
// 							{/* Видео с кастомной кнопкой воспроизведения */}
// 							<video
// 								className={styles.fullScreenImage}
// 								ref={videoRef}
// 								onClick={() => togglePlay(videoRef)}
// 								onPlay={() => setIsPlaying(true)}
// 								onPause={() => setIsPlaying(false)}
// 								autoPlay={false}
// 								poster={lot.image[0]} // Используйте превью
// 							>
// 								<source src={lot.image[currentImageIndex]} type='video/mp4' />
// 								Your browser does not support the video tag.
// 							</video>
// 							{isFullScreen && (
// 								<div
// 									className={styles.exit__fullScreen}
// 									onClick={disableFullScreen}
// 								>
// 									<img src='/images/icons/buttons/close.svg' alt='Play video' />
// 								</div>
// 							)}
// 							{!isPlaying && IS_PRO && isFullScreen && (
// 								<div
// 									className={styles.playButtonOverlay}
// 									onClick={() => togglePlay(videoRef)}
// 								>
// 									<img
// 										src='/images/icons/buttons/play_video.svg'
// 										alt='Play video'
// 									/>
// 								</div>
// 							)}
// 						</div>
// 					) : (
// 						<img
// 							className={
// 								!isFullScreen ? styles.image__slider : styles.fullScreenImage
// 							}
// 							src={lot.image[currentImageIndex]}
// 							alt={`Image ${currentImageIndex + 1}`}
// 						/>
// 					)}

// 					{isFullScreen && (
// 						<div className={styles.thumbnailSlider}>
// 							{lot.image.map((img, index) => (
// 								<img
// 									key={index}
// 									className={styles.thumbnailImage}
// 									src={img.includes('.mp4') ? lot.image[0] : img} // Показывать превью для видео
// 									onClick={() => setCurrentImageIndex(index)}
// 									alt={`Thumbnail ${index + 1}`}
// 								/>
// 							))}
// 						</div>
// 					)}
// 					<p
// 						className={styles.number__image}
// 						style={isFullScreen ? { display: 'none' } : {}}
// 					>
// 						{currentImageIndex + 1}/{totalImages}
// 					</p>
// 				</div>

// 				<div className={styles.info__lot}>
// 					<p className={styles.text}>
// 						Статус:
// 						<span
// 							className={`${styles.value} ${styles.st}`}
// 							style={
// 								lot.status === 'Отменен' ? { color: colors.color_red } : {}
// 							}
// 						>
// 							{lot.status}
// 						</span>
// 					</p>
// 					<p className={styles.text}>
// 						Город:
// 						<span className={styles.value}>{lot.city}</span>
// 					</p>
// 					<p className={styles.text}>
// 						До окончания:
// 						<span className={styles.value}>{lot.time}</span>
// 					</p>
// 					<p className={styles.text}>
// 						Победитель будет определен не позднее:
// 						<span className={styles.value}>{lot.time_winner}</span>
// 					</p>
// 				</div>
// 				<div className={styles.info__product}>
// 					<p className={styles.text}>
// 						Длина:
// 						<span className={styles.value}>{lot.long}</span>
// 					</p>
// 					<p className={styles.text}>
// 						Натуральный цвет:
// 						<span className={styles.value}>{lot.natural_color}</span>
// 					</p>
// 					<p className={styles.text}>
// 						Текущий цвет:
// 						<span className={styles.value}>{lot.color}</span>
// 					</p>
// 					<p className={styles.text}>
// 						Тип:
// 						<span className={styles.value}>{lot.type}</span>
// 					</p>
// 					<p className={styles.text}>
// 						Возраст донора:
// 						<span className={styles.value}>{lot.age}</span>
// 					</p>
// 				</div>
// 				<p className={styles.description}>{lot.description}</p>

// 				{stageDataFunc(lot).isViewWinner && (
// 					<div className={styles.block__offers}>
// 						<div className={styles.block__title}>
// 							<h4 className={styles.title}>
// 								{lot.status === 'Отменен'
// 									? 'Победитель не определен'
// 									: 'Победитель'}
// 							</h4>
// 						</div>
// 						{stageDataFunc(lot).isFinallyStage && (
// 							<PeopleSells
// 								data={mockPeopleOffer[0]}
// 								style={{ marginTop: 'calc(16/412*100vw)' }}
// 							/>
// 						)}
// 					</div>
// 				)}

// 				{stageDataFunc(lot).isOffers && (
// 					<div className={styles.block__offers}>
// 						<div
// 							className={styles.block__title}
// 							onClick={() => setIsViewOffer(!isViewOffer)}
// 						>
// 							<h4 className={styles.title}>
// 								{isAuction ? 'Ход торгов' : 'Предложения'}
// 							</h4>
// 							<img
// 								className={styles.arrow__offer}
// 								src={
// 									isViewOffer
// 										? '/images/icons/lots/arrow_top.svg'
// 										: '/images/icons/lots/arrow_bot.svg'
// 								}
// 								alt='arrow'
// 							/>
// 						</div>
// 						{isViewOffer && (
// 							<div className={styles.block__people}>
// 								{mockPeopleOffer.slice(1, visibleOffers).map(people => (
// 									<PeopleSells key={people.id} data={people} />
// 								))}
// 							</div>
// 						)}
// 					</div>
// 				)}
// 			</div>

// 			{IS_PRO && (
// 				<>
// 					{isViewOffer && forStatusCancelled.length > visibleOffers && (
// 						<Button
// 							style={{
// 								backgroundColor: colors.color_white,
// 								color: colors.color_blue,
// 							}}
// 							onClick={handleLoadMore}
// 						>
// 							Показать еще
// 						</Button>
// 					)}
// 					{!isStatusView && (
// 						<Button
// 							style={{
// 								backgroundColor: colors.color_light_blue,
// 								color: colors.color_blue,
// 							}}
// 						>
// 							{isAuction ? 'Отменить аукцион' : 'Отменить запрос предложений'}
// 						</Button>
// 					)}
// 				</>
// 			)}

// 			{!IS_PRO && isStatusView ? (
// 				<div className={styles.pro}>
// 					<p className={styles.text__pro}>
// 						Хотите сделать предложение? Подключите тариф PRO
// 					</p>
// 					<Button onClick={() => nav('/wallet/pro')}>Подключить PRO</Button>
// 				</div>
// 			) : null}

// 			{lot.status === 'Прием ставок' && IS_PRO && isStatusView && (
// 				<>
// 					<Button
// 						onClick={() =>
// 							onClick(lot.isOffer ? 'Открыть чат' : 'Сделать ставку')
// 						}
// 					>
// 						{lot.isOffer ? 'Открыть чат' : 'Сделать ставку'}
// 					</Button>
// 					{!lot.isOffer && (
// 						<Button
// 							onClick={() => onClick('Автоставка')}
// 							style={{
// 								backgroundColor: colors.color_white,
// 								color: colors.color_blue,
// 							}}
// 						>
// 							Автоставка
// 						</Button>
// 					)}
// 				</>
// 			)}

// 			{lot.status === 'Прием предложений' && IS_PRO && isStatusView && (
// 				<Button
// 					onClick={() =>
// 						onClick(lot.isOffer ? 'Открыть чат' : 'Сделать предложение')
// 					}
// 				>
// 					{lot.isOffer ? 'Открыть чат' : 'Сделать предложение'}
// 				</Button>
// 			)}

// 			{isViewPopup && (
// 				<>
// 					<div
// 						className={styles.block__opacity}
// 						onClick={() => setIsViewPopup(false)}
// 					></div>
// 					<PopupTraders
// 						onClick={() => setIsViewPopup(false)}
// 						button={button}
// 						lot={lot}
// 					/>
// 				</>
// 			)}

// 			<InterfaceApp />
// 		</Layout>
// 	);
// };

const FullLot = () => {
	const nav = useNavigate();
	const { dataLots } = useSelector(state => state.lots);
	const { id } = useParams();
	const { pathname } = useLocation();
	const [isViewOffer, setIsViewOffer] = useState(true);
	const [isViewPopup, setIsViewPopup] = useState(false);
	const [button, setIsButton] = useState('');
	const [visibleOffers, setVisibleOffers] = useState(11);

	const handleLoadMore = () => {
		setVisibleOffers(prevCount => prevCount + 10);
	};

	// Поиск объекта в dataLots, где title совпадает с id
	const lot = dataLots.find(lot => lot.title === id);

	if (!lot) {
		// Обработка случая, когда лот не найден
		return <p>Лот не найден</p>;
	}

	const isStatusView = pathname.includes('view');
	const isAuction = pathname.includes('auction');

	const forStatusCancelled = !stageDataFunc(lot).isOffers
		? []
		: mockPeopleOffer;

	const onClick = but => {
		if (but === 'Открыть чат') {
			nav(`/chats/${lot.name}`);
		} else {
			setIsButton(but);
			setIsViewPopup(true);
		}
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: 'Название страницы',
					text: 'Интересная информация',
					url: window.location.href, // Текущая ссылка на страницу
				})
				.then(() => {
					console.log('Успешно поделились!');
				})
				.catch(error => {
					console.error('Ошибка при обмене ссылкой:', error);
				});
		} else {
			console.log('Web Share API не поддерживается в этом браузере');
		}
	};

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
				overflow: isViewPopup ? 'hidden' : 'auto',
			}}
		>
			<div className={styles.block__nav}>
				<Navbar
					style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
				/>
				<button className={styles.button__nav} onClick={handleShare}>
					<img src='/images/icons/secret.svg' alt='img' />
				</button>
			</div>
			<div className={styles.block__fullLot}>
				<Galery lot={lot} />
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

				{stageDataFunc(lot).isViewWinner && (
					<div className={styles.block__offers}>
						<div className={styles.block__title}>
							<h4 className={styles.title}>
								{lot.status === 'Отменен'
									? 'Победитель не определен'
									: 'Победитель'}
							</h4>
						</div>
						{stageDataFunc(lot).isFinallyStage && (
							<PeopleSells
								data={mockPeopleOffer[0]}
								style={{ marginTop: 'calc(16/412*100vw)' }}
							/>
						)}
					</div>
				)}

				{stageDataFunc(lot).isOffers && (
					<div className={styles.block__offers}>
						<div
							className={styles.block__title}
							onClick={() => setIsViewOffer(!isViewOffer)}
						>
							<h4 className={styles.title}>
								{isAuction ? 'Ход торгов' : 'Предложения'}
							</h4>
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
								{mockPeopleOffer.slice(1, visibleOffers).map(people => (
									<PeopleSells key={people.id} data={people} />
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{IS_PRO && (
				<>
					{isViewOffer && forStatusCancelled.length > visibleOffers && (
						<Button
							style={{
								backgroundColor: colors.color_white,
								color: colors.color_blue,
							}}
							onClick={handleLoadMore}
						>
							Показать еще
						</Button>
					)}
					{!isStatusView && stageDataFunc(lot).isOffers && (
						<Button
							style={{
								backgroundColor: colors.color_white,
								color: colors.color_red_hight,
							}}
						>
							{isAuction ? 'Отменить аукцион' : 'Отменить запрос предложений'}
						</Button>
					)}
				</>
			)}

			{!IS_PRO && isStatusView ? (
				<div className={styles.pro}>
					<p className={styles.text__pro}>
						Хотите сделать предложение? Подключите тариф PRO
					</p>
					<Button onClick={() => nav('/wallet/pro')}>Подключить PRO</Button>
				</div>
			) : null}

			{lot.status === 'Прием ставок' && IS_PRO && isStatusView && (
				<>
					<Button
						onClick={() =>
							onClick(lot.isOffer ? 'Открыть чат' : 'Сделать ставку')
						}
					>
						{lot.isOffer ? 'Открыть чат' : 'Сделать ставку'}
					</Button>
					{!lot.isOffer && (
						<Button
							onClick={() => onClick('Автоставка')}
							style={{
								backgroundColor: colors.color_white,
								color: colors.color_blue,
							}}
						>
							Автоставка
						</Button>
					)}
				</>
			)}

			{lot.status === 'Прием предложений' && IS_PRO && isStatusView && (
				<Button
					onClick={() =>
						onClick(lot.isOffer ? 'Открыть чат' : 'Сделать предложение')
					}
				>
					{lot.isOffer ? 'Открыть чат' : 'Сделать предложение'}
				</Button>
			)}

			{lot.status !== 'Прием предложений' &&
				lot.status !== 'Прием ставок' &&
				lot.isOffer &&
				IS_PRO &&
				isStatusView && (
					<Button onClick={() => onClick('Открыть чат')}>Открыть чат</Button>
				)}

			{isViewPopup && (
				<>
					<div
						className={styles.block__opacity}
						onClick={() => setIsViewPopup(false)}
					></div>
					<PopupTraders
						onClick={() => setIsViewPopup(false)}
						button={button}
						lot={lot}
					/>
				</>
			)}

			<InterfaceApp />
		</Layout>
	);
};

export default FullLot;

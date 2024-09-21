// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Header from '@/components/header/Header';
// import Layout from '@/components/layout/Layout';
// import Button from '@/components/ui/button/Button';
// import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
// import Navbar from '@/components/ui/navbar/Navbar';
// import { colors } from '../../../app.constants';
// import { arrFilters } from '../../../data/buttonFilters.data';
// import { mockLots } from '../../../data/mock.data';
// import { actions as lotsAction } from '../../../store/lots-data/lots.data';
// import styles from './Offer.module.scss';
// import LotOffer from './lot-offer/LotOffer';
// const Offer = () => {
// 	const nav = useNavigate();
// 	const dispatch = useDispatch();
// 	const [activeFilters, setActiveFilters] = useState(['Все']); // Изначально активный фильтр - "Все"
// 	const styleBut = name => ({
// 		width: 'auto',
// 		color: activeFilters.some(filter => filter === name)
// 			? colors.color_white
// 			: colors.color_blue,
// 		backgroundColor: activeFilters.some(filter => filter === name)
// 			? colors.color_blue
// 			: colors.color_light_blue,
// 	});
// 	// Обработчик нажатия на кнопку фильтра
// 	const handleFilterClick = filterName => {
// 		if (filterName === 'Все') {
// 			setActiveFilters(['Все']); // Если нажали "Все", сбрасываем все фильтры
// 		} else {
// 			setActiveFilters(prevFilters => {
// 				// Если "Все" было активным, убираем его из активных фильтров
// 				let newFilters = prevFilters.filter(filter => filter !== 'Все');
// 				// Если фильтр уже активен, убираем его, иначе добавляем
// 				if (newFilters.includes(filterName)) {
// 					newFilters = newFilters.filter(filter => filter !== filterName);
// 				} else {
// 					newFilters = [...newFilters, filterName];
// 				}
// 				// Если после удаления фильтров не осталось, активируем "Все"
// 				if (newFilters.length === 0) {
// 					newFilters = ['Все'];
// 				}
// 				return newFilters;
// 			});
// 		}
// 	};
// 	// Логика фильтрации данных
// 	const filteredLots = mockLots.filter(lot => {
// 		// Если активен фильтр "Все", показываем все данные
// 		if (activeFilters.includes('Все')) {
// 			return true;
// 		}
// 		// Если активен другой фильтр, показываем данные, соответствующие активным фильтрам
// 		return activeFilters.includes(lot.status);
// 	});
// 	useEffect(() => {
// 		dispatch(lotsAction.addLots(mockLots));
// 		console.log('lotsAction');
// 	}, []);
// 	const onClick = () => {
// 		nav('/lots/offer/create-new-lot');
// 	};
// 	return (
// 		<Layout
// 			style={{
// 				gap: 'calc(16/412*100vw)',
// 			}}
// 		>
// 			<Header />
// 			<Navbar
// 				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
// 			/>
// 			<Button onClick={onClick}>Создать запрос предложений</Button>
// 			<div className={styles.block__filters}>
// 				{arrFilters.map(but => (
// 					<Button
// 						key={but.id}
// 						style={styleBut(but.name)}
// 						onClick={() => handleFilterClick(but.name)}
// 						className={activeFilters.includes(but.name) ? styles.active : ''} // Опционально: добавить активный стиль кнопке
// 					>
// 						{but.name}
// 					</Button>
// 				))}
// 			</div>
// 			<div className={styles.block__lots}>
// 				{filteredLots.map(lot => (
// 					<LotOffer key={lot.id} data={lot} />
// 				))}
// 			</div>
// 			<InterfaceApp />
// 		</Layout>
// 	);
// };
// export default Offer;
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import {
	arrFilters,
	arrFiltersAuction,
} from '../../../data/buttonFilters.data';
import { mockLots } from '../../../data/mock.data';
import { actions as lotsAction } from '../../../store/lots-data/lots.data';

import styles from './Offer.module.scss';
import LotOffer from './lot-offer/LotOffer';

const Offer = () => {
	const nav = useNavigate();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const [activeFilters, setActiveFilters] = useState(['Все']); // Изначально активный фильтр - "Все"
	const isAuction = pathname.includes('auction');

	const styleBut = name => ({
		width: 'auto',
		color: activeFilters.some(filter => filter === name)
			? colors.color_white
			: colors.color_blue,
		backgroundColor: activeFilters.some(filter => filter === name)
			? colors.color_blue
			: colors.color_light_blue,
	});

	// Обработчик нажатия на кнопку фильтра
	const handleFilterClick = filterName => {
		if (filterName === 'Все') {
			setActiveFilters(['Все']); // Если нажали "Все", сбрасываем все фильтры
		} else {
			setActiveFilters(prevFilters => {
				// Если "Все" было активным, убираем его из активных фильтров
				let newFilters = prevFilters.filter(filter => filter !== 'Все');

				// Если фильтр уже активен, убираем его, иначе добавляем
				if (newFilters.includes(filterName)) {
					newFilters = newFilters.filter(filter => filter !== filterName);
				} else {
					newFilters = [...newFilters, filterName];
				}

				// Если после удаления фильтров не осталось, активируем "Все"
				if (newFilters.length === 0) {
					newFilters = ['Все'];
				}

				return newFilters;
			});
		}
	};

	// Логика фильтрации данных
	const filteredLots = mockLots.filter(lot => {
		// Если активен фильтр "Все", показываем все данные
		if (activeFilters.includes('Все')) {
			return true;
		}
		// Если активен другой фильтр, показываем данные, соответствующие активным фильтрам
		return activeFilters.includes(lot.status);
	});

	useEffect(() => {
		dispatch(lotsAction.addLots(mockLots));
	}, []);

	const onClick = () => {
		if (pathname === '/lots/auction') {
			nav('/lots/auction/create-new-lot');
		} else {
			nav('/lots/offer/create-new-lot');
		}
	};

	const dataButtonFilters = isAuction ? arrFiltersAuction : arrFilters;

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
			}}
		>
			<Header />
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>
			<Button onClick={onClick}>
				{pathname === '/lots/auction'
					? 'Создать аукцион'
					: 'Создать запрос предложений'}
			</Button>

			<div className={styles.block__filters}>
				{dataButtonFilters.map(but => (
					<Button
						key={but.id}
						style={styleBut(but.name)}
						onClick={() => handleFilterClick(but.name)}
						className={activeFilters.includes(but.name) ? styles.active : ''} // Опционально: добавить активный стиль кнопке
					>
						{but.name}
					</Button>
				))}
			</div>

			<div className={styles.block__lots}>
				{filteredLots.map(lot => (
					<LotOffer key={lot.id} data={lot} />
				))}
			</div>

			<InterfaceApp />
		</Layout>
	);
};

export default Offer;

import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import styles from './Navbar.module.scss';

const Navbar = ({ style }) => {
	const { pathname } = useLocation();
	const { id, secondId } = useParams();
	const [arrLinks, setArrLinks] = useState([]);

	useEffect(() => {
		if (pathname === '/traders') {
			setArrLinks([
				{
					id: 1,
					title: 'Торги',
					path: '/traders',
				},
			]);
		} else if (pathname.startsWith('/traders/view/auction')) {
			// Проверяем, что путь начинается с /traders/view/
			const links = [
				{
					id: 1,
					title: 'Торги',
					path: '/traders',
				},
				{
					id: 2,
					title: 'Аукцион',
					path: '/traders',
				},
			];

			// Если есть id, добавляем его в ссылки
			if (id) {
				links.push({
					id: 3,
					title: `${id}`, // Используем id как заголовок
					path: `/traders/view/auction/${id}`, // Устанавливаем путь с id
				});
			}

			setArrLinks(links); // Устанавливаем новый массив ссылок
		} else if (pathname.startsWith('/traders/view/offer')) {
			// Проверяем, что путь начинается с /traders/view/
			const links = [
				{
					id: 1,
					title: 'Торги',
					path: '/traders',
				},
				{
					id: 2,
					title: 'Запрос предложений',
					path: '/traders',
				},
			];

			// Если есть id, добавляем его в ссылки
			if (id) {
				links.push({
					id: 3,
					title: `${id}`, // Используем id как заголовок
					path: `/traders/view/offer/${id}`, // Устанавливаем путь с id
				});
			}

			setArrLinks(links); // Устанавливаем новый массив ссылок
		} else if (pathname === '/chats') {
			setArrLinks([
				{
					id: 1,
					title: 'Чаты',
					path: '/chats',
				},
			]);
		} else if (pathname === '/profile') {
			setArrLinks([
				{
					id: 1,
					title: 'Профиль',
					path: '/profile',
				},
			]);
		} else if (pathname === '/profile/settings') {
			setArrLinks([
				{
					id: 1,
					title: 'Профиль',
					path: '/profile',
				},
				{
					id: 2,
					title: 'Настройки',
					path: '/profile/settings',
				},
			]);
		} else if (pathname === '/profile/notifications') {
			setArrLinks([
				{
					id: 1,
					title: 'Профиль',
					path: '/profile',
				},
				{
					id: 2,
					title: 'Уведомления',
					path: '/profile/notifications',
				},
			]);
		} else if (pathname === '/profile/statistics') {
			setArrLinks([
				{
					id: 1,
					title: 'Профиль',
					path: '/profile',
				},
				{
					id: 2,
					title: 'Статистика',
					path: '/profile/statistics',
				},
			]);
		} else if (pathname === '/profile/faq') {
			setArrLinks([
				{
					id: 1,
					title: 'Профиль',
					path: '/profile',
				},
				{
					id: 2,
					title: 'Помощь',
					path: '/profile/faq',
				},
			]);
		} else if (pathname === '/profile/rating') {
			setArrLinks([
				{
					id: 1,
					title: 'Профиль',
					path: '/profile',
				},
				{
					id: 2,
					title: 'Рейтинг',
					path: '/profile/rating',
				},
			]);
		} else if (pathname === '/profile/referral') {
			setArrLinks([
				{
					id: 1,
					title: 'Профиль',
					path: '/profile',
				},
				{
					id: 2,
					title: 'Реферальная программа',
					path: '/profile/referral',
				},
			]);
		} else if (pathname === '/profile/verification') {
			setArrLinks([
				{
					id: 1,
					title: 'Профиль',
					path: '/profile',
				},
				{
					id: 2,
					title: 'Верификация',
					path: '/profile/verification',
				},
			]);
		} else if (pathname === '/wallet') {
			setArrLinks([
				{
					id: 1,
					title: 'Кошелек',
					path: '/wallet',
				},
			]);
		} else if (pathname === '/wallet/pro') {
			setArrLinks([
				{
					id: 1,
					title: 'Кошелек',
					path: '/wallet',
				},
				{
					id: 2,
					title: 'Подключить PRO',
					path: '/wallet/pro',
				},
			]);
		} else if (pathname === '/lots') {
			setArrLinks([
				{
					id: 1,
					title: 'Мои лоты',
					path: '/lots',
				},
			]);
		} else if (pathname === '/lots/offer/create-new-lot') {
			setArrLinks([
				{
					id: 1,
					title: 'Мои лоты',
					path: '/lots',
				},
				{
					id: 2,
					title: 'Запросы предложений',
					path: '/lots/offer',
				},
				{
					id: 3,
					title: 'Новый запрос предложений',
					path: '/lots/offer/create-new-lot',
				},
			]);
		} else if (pathname.startsWith('/lots/offer')) {
			// Проверяем, что путь начинается с /lots/offer
			const links = [
				{
					id: 1,
					title: 'Мои лоты',
					path: '/lots',
				},
				{
					id: 2,
					title: 'Запросы предложений',
					path: '/lots/offer',
				},
			];

			// Если есть id, добавляем его в ссылки
			if (id) {
				links.push({
					id: 3,
					title: `${id}`,
					path: `/lots/offer/${id}`,
				});
			}

			setArrLinks(links);
		} else if (pathname === '/lots/auction/create-new-lot') {
			setArrLinks([
				{
					id: 1,
					title: 'Мои лоты',
					path: '/lots',
				},
				{
					id: 2,
					title: 'Аукционы',
					path: '/lots/auction',
				},
				{
					id: 3,
					title: 'Новый лот',
					path: '/lots/auction/create-new-lot',
				},
			]);
		} else if (pathname.startsWith('/lots/auction')) {
			// Проверяем, что путь начинается с /lots/auction
			const links = [
				{
					id: 1,
					title: 'Мои лоты',
					path: '/lots',
				},
				{
					id: 2,
					title: 'Аукционы',
					path: '/lots/auction',
				},
			];

			// Если есть id, добавляем его в ссылки
			if (id) {
				links.push({
					id: 3,
					title: `${id}`,
					path: `/lots/auction/${id}`,
				});
			}

			setArrLinks(links);
		} else {
			setArrLinks([]); // Очищаем массив при смене пути
		}
	}, [pathname, id]); // Добавляем id в зависимости

	return (
		<ul style={style} className={styles.menu}>
			{arrLinks.map((link, ind) => (
				<li key={link.id} className={styles.list}>
					{ind !== 0 && <span>/</span>}
					<Link to={link.path} className={styles.link}>
						{link.title}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default Navbar;

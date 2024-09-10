import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import styles from './Navbar.module.scss';

const Navbar = ({ style }) => {
	const { pathname } = useLocation();
	const { id } = useParams();
	const [arrLinks, setArrLinks] = useState([]);

	useEffect(() => {
		if (pathname === '/traders') {
			setArrLinks([
				{
					id: 1,
					title: 'Торги',
					path: '/trades',
				},
			]);
		} else if (pathname === '/chats') {
			setArrLinks([
				{
					id: 1,
					title: 'Чаты',
					path: '/chats',
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

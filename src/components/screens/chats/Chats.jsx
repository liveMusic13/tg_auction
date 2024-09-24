import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';
import { mockChats } from '../../../data/mock.data';
import PeopleChat from '../../people-chat/PeopleChat';

import styles from './Chats.module.scss';

const Chats = () => {
	const [filter, setFilter] = useState('active'); // по умолчанию показываем "Действующие" чаты

	const handleFilterChange = status => {
		setFilter(status);
	};

	// Фильтруем чаты в зависимости от выбранного фильтра
	const filteredChats = mockChats.filter(chat => {
		const status = chat.description[3]; // статус на 3-й позиции в массиве description
		if (filter === 'completed') {
			return status === 'Завершен';
		} else {
			return status !== 'Завершен';
		}
	});

	const styleB = status => ({
		width: 'auto',
		color: filter === status ? undefined : colors.color_blue,
		backgroundColor: filter === status ? undefined : colors.color_light_blue,
	});

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
			}}
		>
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>
			<div className={styles.block__filter}>
				<Button
					style={styleB('active')}
					onClick={() => handleFilterChange('active')}
				>
					Действующие
				</Button>
				<Button
					style={styleB('completed')}
					onClick={() => handleFilterChange('completed')}
				>
					Завершенные
				</Button>
			</div>

			<div className={styles.block__chats}>
				{filteredChats.map(chat => (
					<PeopleChat key={chat.id} data={chat} />
				))}
			</div>
			<InterfaceApp />
		</Layout>
	);
};

export default Chats;

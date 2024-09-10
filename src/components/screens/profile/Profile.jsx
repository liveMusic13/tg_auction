import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';

const Profile = () => {
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

			<Button
				style={{
					backgroundColor: colors.color_white,
					color: colors.color_blue,
					fontWeight: '600',
				}}
				enableActive={true}
			>
				Настройки
			</Button>
			<Button
				style={{
					backgroundColor: colors.color_white,
					color: colors.color_blue,
					fontWeight: '600',
				}}
				enableActive={true}
			>
				Статистика
			</Button>
			<Button
				style={{
					backgroundColor: colors.color_white,
					color: colors.color_blue,
					fontWeight: '600',
				}}
				enableActive={true}
			>
				Помощь
			</Button>
			<InterfaceApp />
		</Layout>
	);
};

export default Profile;

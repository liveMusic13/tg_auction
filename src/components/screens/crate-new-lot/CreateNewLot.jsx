import { useLocation } from 'react-router-dom';

import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import FilesAttachment from '../../ui/files-attachment/FilesAttachment';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import Textarea from '../../ui/textarea/Textarea';

const CreateNewLot = () => {
	const { pathname } = useLocation();
	const isAuction = pathname === '/lots/auction/create-new-lot';

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
				paddingBottom: isAuction ? 'calc(200/412*100vw)' : undefined,
			}}
		>
			<Header />
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>
			<FilesAttachment />
			<Input placeholder='Введите длину (см)' label='Длина' />
			<Select
				label='Натуральный цвет'
				placeholder='Выберите цвет'
				options={[1, 2, 3]}
			/>
			<Select
				label='Текущий цвет'
				placeholder='Выберите цвет'
				options={[1, 2, 3]}
			/>
			<Select label='Тип' placeholder='Выберите тип' options={[1, 2, 3]} />
			<Input placeholder='Введите возраст' label='Возраст донора' />
			{isAuction && <Input placeholder='Введите вес (граммы)' label='Вес' />}
			<Textarea
				placeholder='Придумайте описание для своего лота'
				label='Свободное описание'
			/>
			{isAuction && (
				<Input placeholder='Введите цену (₽)' label='Выкупная цена' />
			)}
			{isAuction && (
				<Select
					label='Срок аукциона'
					placeholder='Выберите срок'
					options={[1, 2, 3]}
				/>
			)}
			<Button
				style={{
					fontWeight: '600',
				}}
			>
				{isAuction ? 'Создать аукцион' : 'Создать запрос предложений'}
			</Button>
			<InterfaceApp />
		</Layout>
	);
};

export default CreateNewLot;

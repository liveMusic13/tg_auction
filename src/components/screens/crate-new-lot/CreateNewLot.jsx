import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import FilesAttachment from '../../ui/files-attachment/FilesAttachment';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import Textarea from '../../ui/textarea/Textarea';

const CreateNewLot = () => {
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
			<Textarea
				placeholder='Придумайте описание для своего лота'
				label='Свободное описание'
			/>
			<Button
				style={{
					fontWeight: '600',
				}}
			>
				Создать запрос предложений
			</Button>
			<InterfaceApp />
		</Layout>
	);
};

export default CreateNewLot;

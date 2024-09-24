import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import Input from '../../ui/input/Input';

import styles from './Verification.module.scss';

const Verification = () => {
	const [surname, setSurname] = useState('');
	const [name, setName] = useState('');
	const [patronymic, setPatronymic] = useState('');
	const [photos, setPhotos] = useState([]);

	const [isSend, setIsSend] = useState(false);

	const handlePhotoChange = e => {
		const files = Array.from(e.target.files);
		const newPhotos = files.map(file => URL.createObjectURL(file));
		// setPhotos([...photos, ...newPhotos]);
		setPhotos([...newPhotos]);
	};

	const isDisable =
		surname === '' || name === '' || patronymic === '' || photos.length === 0;

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
			}}
		>
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>

			<h2 className={styles.title__verif}>
				{isSend ? 'Ваши данные на рассмотрении' : 'Ваше ФИО'}
			</h2>
			{isSend ? (
				<div className={styles.block__send}>
					<img src={photos[0]} alt='image' className={styles.image__send} />
					<div className={styles.send__description}>
						<p className={styles.send__text}>
							<span>Имя:</span>
							{name}
						</p>
						<p className={styles.send__text}>
							<span>Фамилия:</span>
							{surname}
						</p>
						<p className={styles.send__text}>
							<span>Отчество:</span>
							{patronymic}
						</p>
					</div>
				</div>
			) : (
				<>
					<Input
						label='Фамилия'
						placeholder='Введите вашу фамилию'
						value={surname}
						onChange={e => setSurname(e.target.value)}
					/>
					<Input
						label='Имя'
						placeholder='Введите ваше имя'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Input
						label='Отчество'
						placeholder='Введите ваше отчество'
						value={patronymic}
						onChange={e => setPatronymic(e.target.value)}
					/>

					<div>
						<div className={styles.block__title}>
							<h2 className={styles.title}>
								Документ, подтверждающий вашу личность
							</h2>
							<p className={styles.description}>
								Вам нужно сделать фото с паспортом/снилсом так, чтобы ваше лицо
								было четко видно
							</p>
						</div>
						{/* Кнопка для вызова камеры */}
						<label htmlFor='camera-upload' className={styles.cameraButton}>
							<img src='/images/take_a_photo.png' alt='photo' />
						</label>
						<input
							id='camera-upload'
							type='file'
							accept='image/*'
							capture='environment'
							onChange={handlePhotoChange}
							style={{ display: 'none' }}
						/>

						{/* Галерея фото */}
						<div className={styles.photoGallery}>
							{photos.map((photo, index) => (
								<img
									key={index}
									src={photo}
									alt={`Сделанное фото ${index + 1}`}
									className={styles.photoItem}
								/>
							))}
						</div>
					</div>
				</>
			)}

			{!isSend && (
				<Button disabled={isDisable} onClick={() => setIsSend(true)}>
					Подать заявку на рассмотрение
				</Button>
			)}
			<InterfaceApp />
		</Layout>
	);
};

export default Verification;

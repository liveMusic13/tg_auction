import { useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { colors } from '../../../app.constants';

import styles from './Faq.module.scss';

const Faq = () => {
	const nav = useNavigate();

	return (
		<Layout
			style={{
				gap: 'calc(16/412*100vw)',
			}}
		>
			<Navbar
				style={{ alignSelf: 'flex-start', marginTop: 'calc(16/412*100vw)' }}
			/>

			<h2 className={styles.title}>FAQ</h2>

			<div className={styles.block__faq}>
				<p className={styles.question}>
					<span>Вопрос?</span>Ответ
				</p>
				<p className={styles.question}>
					<span>Вопрос?</span>Ответ
				</p>
				<p className={styles.question}>
					<span>Вопрос?</span>Ответ
				</p>
				<p className={styles.question}>
					<span>Вопрос?</span>Ответ
				</p>
				<p className={styles.question}>
					<span>Вопрос?</span>Ответ
				</p>
				<p className={styles.question}>
					<span>Вопрос?</span>Ответ
				</p>
			</div>

			<h3 className={styles.h3}>Поддержка</h3>
			<Button
				style={{
					width: 'auto',
					alignSelf: 'flex-start',
				}}
				onClick={() => nav('/chats/help')}
			>
				Написать в поддержку
			</Button>
			<h3 className={styles.h3}>Обязательные документы</h3>

			<Button
				style={{
					width: 'auto',
					alignSelf: 'flex-start',
					color: colors.color_blue,
					backgroundColor: colors.color_light_blue,
				}}
			>
				Пользовательское соглашение
				<img
					src='/images/icons/arrow_right.svg'
					alt='arrow'
					className={styles.arrow}
				/>
			</Button>
			<Button
				style={{
					width: 'auto',
					alignSelf: 'flex-start',
					color: colors.color_blue,
					backgroundColor: colors.color_light_blue,
				}}
			>
				Правила
				<img
					src='/images/icons/arrow_right.svg'
					alt='arrow'
					className={styles.arrow}
				/>
			</Button>

			<InterfaceApp />
		</Layout>
	);
};

export default Faq;

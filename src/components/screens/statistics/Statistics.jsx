import Header from '@/components/header/Header';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button/Button';
import InterfaceApp from '@/components/ui/interface-app/InterfaceApp';
import Navbar from '@/components/ui/navbar/Navbar';

import { arrStatistics } from '../../../data/statistics.data';

import styles from './Statistics.module.scss';

const Statistics = () => {
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
			<div className={styles.block__statistics}>
				{arrStatistics.map(el => (
					<div key={el.id} className={styles.statistics}>
						<h2 className={styles.title}>{el.title}</h2>
						<div className={styles.block__description}>
							{el.data.map(podEl => (
								<p key={Math.random()} className={styles.description}>
									<span>{podEl[0]}</span>
									{podEl[1]}
								</p>
							))}
						</div>
					</div>
				))}
			</div>
			<Button
				style={{
					width: 'auto',
					alignSelf: 'flex-start',
					marginBottom: 'calc(16/412*100vw)',
				}}
				enableActive={true}
				onClick={() => onClick('Помощь')}
			>
				Поделиться статистикой
			</Button>
			<InterfaceApp />
		</Layout>
	);
};

export default Statistics;

import { useEffect } from 'react';

import { sortedArr } from '../../data/sorted.data';

import styles from './Sorted.module.scss';

const Sorted = ({ onClick, selectedFilter, setSelectedFilter }) => {
	useEffect(() => {
		console.log('selectedFilter', selectedFilter);
	}, [selectedFilter]);

	return (
		<div className={styles.block__sorted}>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Сортировать по:</h2>
				<button className={styles.button} onClick={onClick}>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<div className={styles.block__radios}>
				{sortedArr.map(filter => (
					<div key={filter.id} className={styles.block__radio}>
						<label className={styles.radioLabel}>
							<p className={styles.name}>{filter.title}</p>
							<input
								className={styles.radio}
								type='radio'
								name='filterGroup'
								checked={selectedFilter === filter.id}
								onChange={() => setSelectedFilter(filter.id)}
							/>
							<span className={styles.customRadio}></span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default Sorted;

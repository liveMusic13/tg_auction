import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

import { colors } from '../../../app.constants';

import styles from './Range.module.scss';

const Range = ({ setValue }) => {
	const [values, setValues] = useState([0, 50000]);

	const handleSliderChange = newValues => {
		setValues(newValues);
		setValue(newValues);
	};

	return (
		<div className={styles.rangeSliderContainer}>
			<div className={styles.rangeValues}>
				<span>от {values[0].toLocaleString()}</span>
				<span>до {values[1].toLocaleString()}</span>
			</div>
			<Slider
				range
				min={0}
				max={50000}
				step={10}
				value={values}
				onChange={handleSliderChange}
				styles={{
					rail: {
						backgroundColor: colors.color_light_blue,
						height: 'calc(2/412*100vw)',
					},
					track: {
						backgroundColor: colors.color_blue,
						height: 'calc(2/412*100vw)',
					},
					handle: {
						backgroundColor: colors.color_blue,
						height: 'calc(12/412*100vw)',
						width: 'calc(12/412*100vw)',
						opacity: 1,
						border: 'none',
					},
				}}
			/>
		</div>
	);
};

export default Range;

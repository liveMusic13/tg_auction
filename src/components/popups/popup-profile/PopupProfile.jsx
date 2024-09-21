import { useState } from 'react';

import Button from '@/components/ui/button/Button';

import { colors } from '../../../app.constants';
import { arrLanguage } from '../../../data/profile.data';
import Input from '../../ui/input/Input';

import styles from './PopupProfile.module.scss';

const PopupProfile = ({
	button,
	onClick,
	selectedFilter,
	setSelectedFilter,
}) => {
	const [isCodeMobile, setIsCodeMobile] = useState(false);
	const [mobile, setMobile] = useState('');
	const [codeMobile, setCodeMobile] = useState('');
	const [isCodeEmail, setIsCodeEmail] = useState(false);
	const [email, setEmail] = useState('');
	const [codeEmail, setCodeEmail] = useState('');
	const [nickname, setIsNickname] = useState('');

	const [isValidMobile, setIsValidMobile] = useState(true);
	const [isValidEmail, setIsValidEmail] = useState(true);

	const isNickname = button === 'Изменить никнейм';
	const isMobile = button === 'Номер телефона';
	const isEmail = button === 'E-mail';
	const isLanguage = button === 'Язык';
	const isDelete = button === 'Удалить аккаунт';

	const title = isNickname
		? 'Укажите никнейм'
		: isMobile
			? 'Номер телефона'
			: isEmail
				? 'Электронная почта'
				: isLanguage
					? 'Язык'
					: 'Вы уверены, что хотите удалить аккаунт?';

	const onClickMobile = () => {
		if (isCodeMobile) {
		} else {
			setIsCodeMobile(true);
		}
	};
	const onClickEmail = () => {
		if (isCodeEmail) {
		} else {
			setIsCodeEmail(true);
		}
	};

	const validatePhoneNumber = phoneNumber => {
		const belarus = /^\+\d{3}\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
		// Регулярное выражение для российского номера 79XXXXXXXXX
		const russianPhoneRegex = /^7[3489]\d{9}$/;
		// Регулярное выражение для казахстанского номера 77XXXXXXXXX
		const kazakhPhoneRegex = /^77\d{8}$/;
		// Проверяем номер на соответствие любому из форматов
		return (
			belarus.test(phoneNumber) ||
			russianPhoneRegex.test(phoneNumber) ||
			kazakhPhoneRegex.test(phoneNumber)
		);
	};

	const validateEmail = value => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(value);
	};

	const handleInputChange = (e, setIsValid, input) => {
		const value = e.target.value;
		if (input === 'mobile') {
			if (validatePhoneNumber(value)) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
		} else if (input === 'email') {
			if (validateEmail(value)) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
		}
	};

	return (
		<div className={styles.block__popup}>
			{!isDelete && <h2 className={styles.title}>{title}</h2>}
			{isNickname && (
				<>
					<Input
						label='Никнейм'
						placeholder='Введите ник'
						value={nickname}
						onChange={e => setIsNickname(e.target.value)}
					/>
					<Button
						style={{ width: '100%' }}
						disabled={nickname === ''}
						onClick={onClick}
					>
						Подтвердить
					</Button>
				</>
			)}
			{isMobile && (
				<>
					{isCodeMobile ? (
						<>
							<Input
								label='Код'
								placeholder='Введите код'
								value={codeMobile}
								onChange={e => {
									setCodeMobile(e.target.value);
								}}
							/>
							<div className={styles.block__buttons}>
								<Button
									style={{ width: '60%' }}
									disabled={codeMobile === ''}
									onClick={onClick}
								>
									Подтвердить
								</Button>
								<Button
									style={{
										width: '40%',
										backgroundColor: colors.color_light_blue,
										color: colors.color_blue,
									}}
									onClick={onClick}
								>
									Назад
								</Button>
							</div>
						</>
					) : (
						<>
							<Input
								label={
									isValidMobile
										? 'Номер телефона'
										: 'Введите номер телефона, используя цифры'
								}
								placeholder='Номер телефона'
								inputType='tel'
								value={mobile}
								onChange={e => {
									setMobile(e.target.value);
									handleInputChange(e, setIsValidMobile, 'mobile');
								}}
								styleInput={{
									borderColor: isValidMobile ? '' : colors.color_red_hight, // Если не валидно, красная граница
								}}
								styleLabel={{
									color: isValidMobile ? '' : colors.color_red_hight,
								}}
							/>
							<Button
								style={{ width: '100%' }}
								disabled={mobile === '' || !isValidMobile}
								onClick={onClickMobile}
							>
								Выслать код
							</Button>
						</>
					)}
				</>
			)}
			{isEmail && (
				<>
					{isCodeEmail ? (
						<>
							<Input
								label='Код'
								placeholder='Введите код'
								value={codeEmail}
								onChange={e => {
									setCodeEmail(e.target.value);
								}}
							/>
							<div className={styles.block__buttons}>
								<Button
									style={{ width: '60%' }}
									disabled={codeEmail === ''}
									onClick={onClick}
								>
									Подтвердить
								</Button>
								<Button
									style={{
										width: '40%',
										backgroundColor: colors.color_light_blue,
										color: colors.color_blue,
									}}
									onClick={onClick}
								>
									Назад
								</Button>
							</div>
						</>
					) : (
						<>
							<Input
								label='Электронная почта'
								placeholder='Введите e-mail'
								value={email}
								onChange={e => {
									handleInputChange(e, setIsValidEmail, 'email');
									setEmail(e.target.value);
								}}
								styleInput={{
									borderColor: isValidEmail ? '' : colors.color_red_hight, // Если не валидно, красная граница
								}}
								styleLabel={{
									color: isValidEmail ? '' : colors.color_red_hight,
								}}
							/>
							<Button
								style={{ width: '100%' }}
								disabled={email === '' || !isValidEmail}
								onClick={onClickEmail}
							>
								Выслать код
							</Button>
						</>
					)}
				</>
			)}
			{isLanguage && (
				<div className={styles.block__radios}>
					{arrLanguage.map(filter => (
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
			)}
			{isDelete && (
				<>
					<div className={styles.block__title}>
						<h2 className={styles.title}>{title}</h2>
						<button className={styles.button} onClick={onClick}>
							<img src='/images/icons/exit.svg' alt='exit' />
						</button>
					</div>
					<p className={styles.delete__description}>
						Восстановление невозможно, вся история и статистика будут удалены
					</p>
					<Button
						style={{
							width: '100%',
							backgroundColor: colors.color_white,
							color: colors.color_red_hight,
							fontSize: '0.95rem',
						}}
						enableActive={true}
						onClick={onClick}
					>
						Подтвердить
					</Button>
				</>
			)}
		</div>
	);
};

export default PopupProfile;

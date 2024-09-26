export const stageDataFunc = lot => {
	const titleBot =
		lot.status === 'Прием ставок'
			? 'Ход торгов'
			: lot.status === 'Состоялся' ||
				  lot.status === 'Оплачен' ||
				  lot.status === 'Завершен' ||
				  lot.status === 'Отменен'
				? // lot.status !== 'Определение победителя'
					'Победитель'
				: 'Предложения';

	const isFinallyStage =
		lot.status !== 'Отменен' &&
		lot.status !== 'Прием ставок' &&
		lot.status !== 'Прием предложений' &&
		lot.status !== 'Запрос предложений';

	const isViewWinner =
		lot.status !== 'Прием предложений' &&
		lot.status !== 'Прием ставок' &&
		lot.status !== 'Определение победителя';

	const isOffers =
		lot.status === 'Прием предложений' ||
		lot.status === 'Прием ставок' ||
		lot.status === 'Определение победителя' ||
		lot.status === 'Состоялся';

	const chatButtonStatePokup =
		lot.description[3] === 'Состоялся'
			? 'Оплатить'
			: lot.description[3] === 'Отправлен'
				? 'Подтвердить получение'
				: lot.description[3] === 'Отправлен'
					? 'Подтвердить получение'
					: lot.description[3] === 'Определение победителя'
						? 'Изменить предложение'
						: lot.description[3] === 'Завершен'
							? 'Оставить отзыв'
							: 'Оплатить';

	const chatButtonStateProdav =
		lot.description[3] === 'Состоялся'
			? 'Ожидаем оплату'
			: lot.description[3] === 'Оплачен'
				? 'Подтвердить отправление'
				: lot.description[3] === 'Завершен' ||
					  lot.description[3] === 'Отправлен'
					? 'Оставить отзыв'
					: 'Объявить победителем';

	return {
		titleBot,
		isFinallyStage,
		isViewWinner,
		isOffers,
		chatButtonStatePokup,
		chatButtonStateProdav,
	};
};

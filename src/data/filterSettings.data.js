export const arrTrades = ['Все', 'Аукцион', 'Запрос предложений'];

export const arrStatus = [
	'Все',
	'Прием ставок',
	'Прием предложений',
	'Определение победителя',
	'Состоялся',
	'Завершен',
];

export const arrOtherFilter = [
	{
		id: 0,
		title: 'Цена',
		type: 'range',
	},
	{
		id: 1,
		title: 'Длина',
		type: 'from-to',
	},
	{
		id: 2,
		title: 'Натуральный цвет',
		type: 'checkbox-multi',
	},
	{
		id: 3,
		title: 'Текущий цвет',
		type: 'checkbox-multi',
	},
	{
		id: 4,
		title: 'Тип',
		type: 'checkbox',
	},
	{
		id: 5,
		title: 'Возраст донора',
		type: 'from-to',
	},
	{
		id: 6,
		title: 'Вес',
		type: 'from-to',
	},
	{
		id: 7,
		title: 'Страна',
		type: 'checkbox',
	},
	{
		id: 8,
		title: 'Город',
		type: 'checkbox',
	},
];

export const options_color = [
	'Брюнет',
	'Шатен',
	'Рыжий',
	'Русый',
	'Блондин',
	'Седой',
];

export const options_type = ['Прямые', 'Вьющиеся', 'Волнистые', 'Мелкие кудри'];

export const options_country = ['Все', 'Россия', 'Беларусь'];

export const options_city = [
	'Все',
	'Саратов',
	'Москва',
	'Минск',
	'Краснодар',
	'Самара',
];

export const arrButtons = [
	{
		id: 0,
		title: 'Аукцион',
		my_buttons: ['Все', 'Прием ставок', 'Состоялся', 'Завершен'],
	},
	{
		id: 1,
		title: 'Запрос предложений',
		my_buttons: [
			'Все',
			'Прием предложений',
			'Определение победителя',
			'Прием ставок',
			'Состоялся',
			'Завершен',
		],
	},
];

import FullLot from '@/components/full-lot/FullLot';
import Auth from '@/components/screens/auth/Auth';
import Chats from '@/components/screens/chats/Chats';
import CreateNewLot from '@/components/screens/crate-new-lot/CreateNewLot';
import Lots from '@/components/screens/lots/Lots';
import Offer from '@/components/screens/offer/Offer';
import Profile from '@/components/screens/profile/Profile';
import Traders from '@/components/screens/traders/Traders';
import Wallet from '@/components/screens/wallet/Wallet';

import ChatPeople from '../components/screens/chat-people/ChatPeople';
import Faq from '../components/screens/faq/Faq';
import Notifications from '../components/screens/notifications-page/Notifications';
import Pro from '../components/screens/pro/Pro';
import Rating from '../components/screens/rating/Rating';
import Referral from '../components/screens/referral/Referral';
import SettingsPage from '../components/screens/settings-page/SettingsPage';
import Statistics from '../components/screens/statistics/Statistics';
import Verification from '../components/screens/verification/Verification';

export const routes = [
	{
		path: '/',
		component: Auth,
		isAuth: false,
	},
	{
		path: '/traders',
		component: Traders,
		isAuth: false,
	},
	{
		path: '/traders/view/auction/:id',
		component: FullLot,
		isAuth: false,
	},
	{
		path: '/traders/view/offer/:id',
		component: FullLot,
		isAuth: false,
	},
	{
		path: '/lots',
		component: Lots,
		isAuth: false,
	},
	{
		path: '/lots/auction',
		component: Offer,
		isAuth: false,
	},
	{
		path: '/lots/auction/:id',
		component: FullLot,
		isAuth: false,
	},
	{
		path: '/lots/auction/create-new-lot',
		component: CreateNewLot,
		isAuth: false,
	},

	{
		path: '/lots/offer',
		component: Offer,
		isAuth: false,
	},
	{
		path: '/lots/offer/:id',
		component: FullLot,
		isAuth: false,
	},
	{
		path: '/lots/offer/create-new-lot',
		component: CreateNewLot,
		isAuth: false,
	},
	{
		path: '/chats',
		component: Chats,
		isAuth: false,
	},
	{
		path: '/chats/:id',
		component: ChatPeople,
		isAuth: false,
	},
	{
		path: '/wallet',
		component: Wallet,
		isAuth: false,
	},
	{
		path: '/wallet/pro',
		component: Pro,
		isAuth: false,
	},
	{
		path: '/profile',
		component: Profile,
		isAuth: false,
	},
	{
		path: '/profile/verification',
		component: Verification,
		isAuth: false,
	},
	{
		path: '/profile/settings',
		component: SettingsPage,
		isAuth: false,
	},
	{
		path: '/profile/notifications',
		component: Notifications,
		isAuth: false,
	},
	{
		path: '/profile/statistics',
		component: Statistics,
		isAuth: false,
	},
	{
		path: '/profile/faq',
		component: Faq,
		isAuth: false,
	},
	{
		path: '/profile/rating',
		component: Rating,
		isAuth: false,
	},
	{
		path: '/profile/referral',
		component: Referral,
		isAuth: false,
	},
];

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
import Pro from '../components/screens/pro/Pro';

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
		path: '/lots',
		component: Lots,
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
];

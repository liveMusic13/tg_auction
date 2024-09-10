import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

import Router from '@/routes/Router';

import '@st/global.scss';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<Router />
		</Provider>
	</StrictMode>,
);

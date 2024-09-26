import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as fullScreen } from './full-screen/fullScreen.slice';
import { reducer as likes } from './likes/likes.slice';
import { reducer as lots } from './lots-data/lots.data';
import { reducer as withMe } from './with-me/withMe.slice';

const reducers = combineReducers({
	likes,
	lots,
	withMe,
	fullScreen,
});

export const store = configureStore({
	reducer: reducers,
});

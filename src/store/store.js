import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as likes } from './likes/likes.slice';
import { reducer as lots } from './lots-data/lots.data';

const reducers = combineReducers({
	likes,
	lots,
});

export const store = configureStore({
	reducer: reducers,
});

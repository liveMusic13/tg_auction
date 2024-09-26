import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isFullScreen: false,
};

export const fullScreen = createSlice({
	name: 'fullScreen',
	initialState,
	reducers: {
		activeFullScreen: (state, { payload }) => {
			state.isFullScreen = true;
		},
		disabledFullScreen: (state, { payload }) => {
			state.isFullScreen = false;
		},
	},
});

export const { actions, reducer } = fullScreen;

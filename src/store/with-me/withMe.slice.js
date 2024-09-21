import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	arrWithMe: [1, 2],
};

export const withMe = createSlice({
	name: 'withMe',
	initialState,
	reducers: {
		addWithMe: (state, { payload }) => {
			state.arrWithMe.push(payload);
		},
		deleteWithMe: (state, { payload }) => {
			state.arrWithMe = state.arrWithMe.filter(id => id !== payload);
		},
	},
});

export const { actions, reducer } = withMe;

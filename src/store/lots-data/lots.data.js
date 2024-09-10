import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dataLots: [],
};

export const lots = createSlice({
	name: 'lots',
	initialState,
	reducers: {
		addLots: (state, { payload }) => {
			state.dataLots = payload;
		},
	},
});

export const { actions, reducer } = lots;

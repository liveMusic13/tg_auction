import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	arrLikes: [],
};

export const likes = createSlice({
	name: 'likes',
	initialState,
	reducers: {
		addLike: (state, { payload }) => {
			state.arrLikes.push(payload);
		},
		deleteLike: (state, { payload }) => {
			state.arrLikes = state.arrLikes.filter(id => id !== payload);
		},
	},
});

export const { actions, reducer } = likes;

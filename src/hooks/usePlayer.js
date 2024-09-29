import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { actions as fullScreenAction } from '../store/full-screen/fullScreen.slice';

export const usePlayer = () => {
	const dispatch = useDispatch();

	const [isPlaying, setIsPlaying] = useState(false);

	const activeFullScreen = () => {
		dispatch(fullScreenAction.activeFullScreen());
	};

	const disableFullScreen = () => {
		console.log('disabled');
		dispatch(fullScreenAction.disabledFullScreen());
	};

	const togglePlay = videoRef => {
		if (isPlaying) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	return {
		isPlaying,
		setIsPlaying,
		activeFullScreen,
		togglePlay,
		disableFullScreen,
	};
};

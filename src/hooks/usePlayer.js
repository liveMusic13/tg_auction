import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { actions as fullScreenAction } from '../store/full-screen/fullScreen.slice';

export const usePlayer = () => {
	const dispatch = useDispatch();
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [t, setT] = useState(false);

	// const activeFullScreen = () => {
	// 	// setT(false);
	// 	setIsFullScreen(true);
	// };
	// const disableFullScreen = () => {
	// 	// setT(true);
	// 	// setIsFullScreen(false);
	// 	// console.log('disabled');
	// 	setIsFullScreen(prevState => {
	// 		console.log('disabled', !prevState); // Отладка
	// 		return false;
	// 	});
	// };

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
		isFullScreen,
		setIsFullScreen,
		isPlaying,
		setIsPlaying,
		t,
		setT,
		activeFullScreen,
		togglePlay,
		disableFullScreen,
	};
};

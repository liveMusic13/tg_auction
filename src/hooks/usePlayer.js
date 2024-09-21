import { useState } from 'react';

export const usePlayer = () => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [t, setT] = useState('');

	const activeFullScreen = () => {
		setIsFullScreen(true);
	};
	const disableFullScreen = () => {
		setT('t');
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

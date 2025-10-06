import { Howl } from 'howler'

// Global reference to the audio preloader instance
let audioPreloader = null

// Function to set the audio preloader instance
export const setAudioPreloader = (preloader) => {
	audioPreloader = preloader
}

let transitionMusicHowl = null
let backgroundMusicHowl = null
let isFading = false

export const playMusic = () => {
	if (audioPreloader && audioPreloader.getPreloadedAudio('/Database_music.wav')) {
		// Use preloaded audio
		backgroundMusicHowl = new Howl({
			src: ['/Database_music.wav'],
			autoplay: true,
			loop: true,
			volume: 0.5,
		})
	} else {
		// Fallback to original method
		backgroundMusicHowl = new Howl({
			src: ['Database_music.wav'],
			autoplay: true,
			loop: true,
			volume: 0.5,
		})
	}
	backgroundMusicHowl.play()
	return backgroundMusicHowl
}

export const playTransitionMusic = () => {
	if (audioPreloader && audioPreloader.getPreloadedAudio('/t4.wav')) {
		// Use preloaded audio
		transitionMusicHowl = new Howl({
			src: ['/t4.wav'],
			autoplay: true,
			loop: false,
			volume: 0.65,
		})
	} else {
		// Fallback to original method
		transitionMusicHowl = new Howl({
			src: ['t4.wav'],
			autoplay: true,
			loop: false,
			volume: 0.65,
		})
	}
	transitionMusicHowl.play()
	return transitionMusicHowl
}

export const fadeOutTransitionMusic = (duration = 2000) => {
	if (transitionMusicHowl && !isFading) {
		console.log('Starting fade...')
		isFading = true
		transitionMusicHowl.fade(transitionMusicHowl.volume(), 0, duration)

		// Reset the flag after fade completes
		setTimeout(() => {
			isFading = false
		}, duration)
	} else if (isFading) {
		console.log('Fade already in progress, skipping...')
	}
}

export const fadeOutBackgroundMusic = (duration = 2000) => {
	if (backgroundMusicHowl) {
		console.log('Starting background music fade out...')
		backgroundMusicHowl.fade(backgroundMusicHowl.volume(), 0, duration)

		// Stop the music completely after fade completes
		setTimeout(() => {
			backgroundMusicHowl.stop()
			backgroundMusicHowl = null
		}, duration)
	}
}

export const playDBMusic = (duration = 1000) => {
	if (audioPreloader && audioPreloader.getPreloadedAudio('/insideDB.wav')) {
		// Use preloaded audio
		const dbMusicHowl = new Howl({
			src: ['/insideDB.wav'],
			autoplay: true,
			loop: false,
			volume: 0.5,
		})
		dbMusicHowl.play()
		return dbMusicHowl
	} else {
		// Fallback to original method
		const dbMusicHowl = new Howl({
			src: ['insideDB.wav'],
			autoplay: true,
			loop: false,
			volume: 0.5,
		})
		dbMusicHowl.play()
		return dbMusicHowl
	}
}

// Enhanced playAudio function for questions that uses preloaded audio
export const playAudio = (url) => {
	if (audioPreloader && audioPreloader.getPreloadedAudio(url)) {
		// Use preloaded audio
		const sound = new Howl({
			src: [url],
			volume: 0.3,
		})
		sound.play()
		return sound
	} else {
		// Fallback to original method
		const sound = new Howl({
			src: [url],
			volume: 0.3,
		})
		sound.play()
		return sound
	}
}

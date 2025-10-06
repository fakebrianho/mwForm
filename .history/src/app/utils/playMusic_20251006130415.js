import { Howl } from 'howler'

let transitionMusicHowl = null
let backgroundMusicHowl = null
let isFading = false

export const playMusic = () => {
	// useEffect(()=>{
	backgroundMusicHowl = new Howl({
		src: ['Database_music.wav'],
		autoplay: true,
		loop: true,
		volume: 0.5,
	})
	backgroundMusicHowl.play()
	return backgroundMusicHowl
	// })
}

export const playTransitionMusic = () => {
	transitionMusicHowl = new Howl({
		src: ['t4.wav'],
		autoplay: true,
		loop: false,
		volume: 0.65,
	})
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
	const dbMusicHowl = new Howl({
		src: ['insideDB.wav'],
		autoplay: true,
		loop: false,
		volume: 0.5,
	})
	dbMusicHowl.play()
	return dbMusicHowl
}
// export const playTailMusic = () => {
// 	var sound = new Howl({
// 		src: ['t3.wav'],
// 		autoplay: true,
// 		loop: false,
// 		volume: 0.38,
// 	})
// 	sound.play()
// 	return sound
// }

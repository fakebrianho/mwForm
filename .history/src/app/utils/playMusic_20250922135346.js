import { Howl } from 'howler'

let transitionMusicHowl = null
let isFading = false

export const playMusic = () => {
	// useEffect(()=>{
	var sound = new Howl({
		src: ['Database_music.wav'],
		autoplay: true,
		loop: true,
		volume: 0.5,
	})
	sound.play()
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

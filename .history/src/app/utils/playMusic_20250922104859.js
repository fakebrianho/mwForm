import { Howl } from 'howler'

let transitionMusicHowl = null

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
		src: ['t1.wav'],
		autoplay: true,
		loop: false,
		volume: 0.65,
	})
	transitionMusicHowl.play()
	return transitionMusicHowl
}

export const fadeOutTransitionMusic = (duration = 3000) => {
	if (transitionMusicHowl) {
		transitionMusicHowl.fade(transitionMusicHowl.volume(), 0, duration)
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

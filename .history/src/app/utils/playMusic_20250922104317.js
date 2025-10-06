import { Howl } from 'howler'
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
	var sound = new Howl({
		src: ['t1.wav'],
		autoplay: true,
		loop: false,
		volume: 0.65,
	})
	sound.play()
	return sound
}
export const playTailMusic = () => {
	var sound = new Howl({
		src: ['t3.wav'],
		autoplay: true,
		loop: false,
		volume: 0.4,
	})
	sound.play()
	return sound
}

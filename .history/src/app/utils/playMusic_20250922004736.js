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

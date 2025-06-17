import { Howl } from 'howler'
import { useEffect } from 'react'
export const useMusic = () => {
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

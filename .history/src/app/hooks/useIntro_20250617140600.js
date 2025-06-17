import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { Howl } from 'howler'

// Register the CustomEase plugin

export const useIntroAnimation = (shouldAnimate = false, options = {}) => {
	const { camera } = useThree()
	const tl = useRef()

	// Default options
	const {
		duration = 1.2,
		targetZ = 5,
		soundVolume = 0.5,
		soundSrc = 'Database_music.wav',
		ease = 'power2.inOut',
		enableSound = true,
	} = options

	// The hook itself is always called, but the animation logic inside
	// only runs when shouldAnimate is true
	useEffect(() => {
		// Only run the animation when shouldAnimate is true
		if (!shouldAnimate) return

		// Create custom ease-in-quad based on the cubic-bezier values

		if (enableSound) {
			var sound = new Howl({
				src: [soundSrc],
				autoplay: true,
				loop: true,
				volume: soundVolume,
				onend: function () {
					console.log('Finished!')
				},
			})
			sound.play()
		}

		tl.current = gsap.timeline()
		tl.current.to(camera.position, {
			z: targetZ,
			duration: duration,
			ease: ease,
		})

		return () => {
			tl.current && tl.current.kill()
		}
	}, [
		camera,
		shouldAnimate,
		duration,
		targetZ,
		soundVolume,
		soundSrc,
		ease,
		enableSound,
	]) // Include all props in dependencies

	return tl.current
}

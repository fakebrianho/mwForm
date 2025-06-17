import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { Howl } from 'howler'

// Register the CustomEase plugin

export const useIntroAnimation = (
	shouldAnimate = false,
	duration = 1.2,
	targetZ = 5,
	soundVolume = 0.5,
	soundSrc = 'Database_music.wav'
) => {
	const { camera } = useThree()
	const tl = useRef()

	// The hook itself is always called, but the animation logic inside
	// only runs when shouldAnimate is true
	useEffect(() => {
		// Only run the animation when shouldAnimate is true
		if (!shouldAnimate) return

		// Create custom ease-in-quad based on the cubic-bezier values

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

		tl.current = gsap.timeline()
		tl.current.to(camera.position, {
			z: targetZ,
			duration: duration,
			// ease: 'power2.inOut',
		})

		return () => {
			tl.current && tl.current.kill()
		}
	}, [camera, shouldAnimate, duration, targetZ, soundVolume, soundSrc]) // Include all props in dependencies

	return tl.current
}

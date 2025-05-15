import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'

export const useIntroAnimation = (shouldAnimate = false) => {
	const { camera } = useThree()
	const tl = useRef()

	// The hook itself is always called, but the animation logic inside
	// only runs when shouldAnimate is true
	useEffect(() => {
		// Only run the animation when shouldAnimate is true
		if (!shouldAnimate) return

		tl.current = gsap.timeline()
		tl.current.to(camera.position, {
			z: 5,
			duration: 1.75,
			ease: 'power3.inOut',
		})

		return () => {
			tl.current && tl.current.kill()
		}
	}, [camera, shouldAnimate]) // Include shouldAnimate in dependencies

	return tl.current
}

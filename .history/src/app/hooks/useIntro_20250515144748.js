import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { useRef, useEffect } from 'react'

// Register the CustomEase plugin
gsap.registerPlugin(CustomEase)

export const useIntroAnimation = (shouldAnimate = false) => {
	const { camera } = useThree()
	const tl = useRef()

	// The hook itself is always called, but the animation logic inside
	// only runs when shouldAnimate is true
	useEffect(() => {
		// Only run the animation when shouldAnimate is true
		if (!shouldAnimate) return

		// Create custom ease-in-quad based on the cubic-bezier values
		CustomEase.create('easeInQuad', 'cubic-bezier(.55, .085, .68, .53)')

		tl.current = gsap.timeline()
		tl.current.to(camera.position, {
			z: 5,
			duration: 1.5,
			ease: 'power2.in',
		})

		return () => {
			tl.current && tl.current.kill()
		}
	}, [camera, shouldAnimate]) // Include shouldAnimate in dependencies

	return tl.current
}

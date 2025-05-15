import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'

export const useIntroAnimation = () => {
	const { camera } = useThree()
	const tl = useRef()
	useEffect(() => {
		tl.current = gsap.timeline()
		tl.current.to(camera.position, {
			z: 5,
			duration: 1.75,
			ease: 'power3.inOut',
		})
		return () => {
			tl.current && tl.current.kill()
		}
	}, [camera]s)
}

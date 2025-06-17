import React from 'react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useIntroAnimation } from '@/app/hooks/useIntro'

function Blockers(props) {
	const meshRef = useRef()
	const [shouldAnimateCamera, setShouldAnimateCamera] = useState(false)

	useIntroAnimation(shouldAnimateCamera, props.setEnter)

	useEffect(() => {
		if (meshRef.current && props.intro) {
			gsap.to(meshRef.current.material, {
				opacity: 0,
				duration: 0.75,
				ease: 'power2.inOut',
				onComplete: () => {},
			})
			setShouldAnimateCamera(true)
		}
	}, [props.intro])
	// useEffect(() => {
	// 	if (meshRef.current) {
	// 		props.setStart(true)
	// 	}
	// }, [])
	return (
		<mesh position={[0, 0, 4]} ref={meshRef}>
			<planeGeometry args={[25, 10]} />
			<meshBasicMaterial color={'black'} transparent />
		</mesh>
	)
}

export default Blockers

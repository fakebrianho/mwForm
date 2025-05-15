import React from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
function Blockers(props) {
	const meshRef = useRef()
	useEffect(() => {
		if (meshRef.current) {
			gsap.to(meshRef.current.material, {
				opacity: 0,
				duration: 0.75,
				ease: 'power2.inOut',
				onComplete: () => {
					props.setStart(true)
				},
			})
		}
	}, [props.start])
	return (
		<mesh position={[0, 0, 4]} ref={meshRef}>
			<planeGeometry args={[15, 10]} />
			<meshBasicMaterial color={'black'} transparent />
		</mesh>
	)
}

export default Blockers

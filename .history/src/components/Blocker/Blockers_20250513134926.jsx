import React from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
function Blockers() {
	const meshRef = useRef()
	useEffect(() => {
		if (meshRef.current) {
			gsap.to(meshRef.current.material, {
				opacity: 0,
				duration: 0.75,
				ease: 'power2.inOut',
				onComplete: () => {
					console.log(meshRef.current.material)
				},
			})
		}
	}, [])
	return (
		<mesh position={[0, 0, 4]} ref={meshRef}>
			<planeGeometry args={[15, 10]} />
			<meshBasicMaterial color={'black'} />
		</mesh>
	)
}

export default Blockers

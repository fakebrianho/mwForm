import React from 'react'
import { useEffect, useRef } from 'react'
function Blockers() {
	const meshRef = useRef()
	useEffect(() => {
		if (meshRef.current) {
			console.log(meshRef.current.material)
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

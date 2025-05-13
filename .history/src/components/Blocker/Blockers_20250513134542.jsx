import React from 'react'

function Blockers() {
	return (
		<mesh position={[0, 0, 5]}>
			<planeGeometry args={[15, 10]} />
			<meshBasicMaterial color={'black'} />
		</mesh>
	)
}

export default Blockers

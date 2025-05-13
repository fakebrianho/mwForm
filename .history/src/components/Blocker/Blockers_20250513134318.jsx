import React from 'react'

function Blockers() {
	return (
		<mesh>
			<planeGeometry args={[1, 1, 1]} />
			<meshBasicMaterial color={'black'} />
		</mesh>
	)
}

export default Blockers

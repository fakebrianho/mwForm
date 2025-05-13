import React from 'react'

function Blockers() {
	return (
		<mesh>
			<planeGeometry args={[10, 15]} />
			<meshBasicMaterial color={'black'} />
		</mesh>
	)
}

export default Blockers

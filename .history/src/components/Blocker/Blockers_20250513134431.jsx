import React from 'react'

function Blockers() {
	return (
		<mesh>
			<planeGeometry args={[15, 10]} />
			<meshBasicMaterial color={'black'} />
		</mesh>
	)
}

export default Blockers

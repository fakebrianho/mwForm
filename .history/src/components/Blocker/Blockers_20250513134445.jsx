import React from 'react'

function Blockers() {
	return (
		<mesh>
			<planeGeometry args={[15, 10]} position={[0, 0, 2]} />
			<meshBasicMaterial color={'black'} />
		</mesh>
	)
}

export default Blockers

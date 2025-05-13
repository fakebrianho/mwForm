import React from 'react'

function Blockers() {
	return (
		<mesh>
			<planeGeometry args={[2, 2, 2]} />
			<meshBasicMaterial color={'black'} />
		</mesh>
	)
}

export default Blockers

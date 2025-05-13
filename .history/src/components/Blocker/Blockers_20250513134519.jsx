import React from 'react'

function Blockers() {
	return (
		<mesh>
			<planeGeometry args={[15, 10]} position={(0, 0, 5)} />
			<meshBasicMaterial color={'black'} />
		</mesh>
	)
}

export default Blockers

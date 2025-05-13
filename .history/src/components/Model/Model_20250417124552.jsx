import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useGLTF } from '@react-three/drei'

function Model(props) {
	const { scene } = useGLTF('/comp2.glb')

	return (
		<>
			<primitive
				object={scene}
				scale={1.5}
				position={[0, -2, 2]}
				rotation={[0, -Math.PI / 2, 0]}
			/>
		</>
	)
}

export default Model

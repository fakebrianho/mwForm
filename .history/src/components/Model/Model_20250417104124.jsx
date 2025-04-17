import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
function Model(props) {
	const gltf = useLoader(GLTFLoader, '/retro_computer.glb')
	return (
		<>
			<primitive
				object={gltf.scene}
				scale={1.5}
				rotation={[0, Math.PI / 2, 0]}
			/>
		</>
	)
}

export default Model

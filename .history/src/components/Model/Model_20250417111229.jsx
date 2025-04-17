import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

function Model(props) {
	const gltf = useLoader(GLTFLoader, '/comp2.glb', (loader) => {
		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath('./draco/')
		loader.setDRACOLoader(dracoLoader)
	})
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

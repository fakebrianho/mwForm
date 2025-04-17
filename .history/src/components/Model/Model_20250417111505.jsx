import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useGLTF } from '@react-three/drei'

function Model(props) {
    const {scene} = useGLTF('/comp2.glb')
	// const gltf = useLoader(GLTFLoader, '/retro_computer.glb', (loader) => {
		// const dracoLoader = new DRACOLoader()
		// dracoLoader.setDecoderPath('./draco/')
		// loader.setDRACOLoader(dracoLoader)
	})
	return (
		<>
			<primitive
				object={scene}
				scale={1.5}
				rotation={[0, Math.PI / 2, 0]}
			/>
		</>
	)
}

export default Model

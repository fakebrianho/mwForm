import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useGLTF } from '@react-three/drei'

function Model(props) {
	// const { scene } = useGLTF('/comp2.glb')
	const { scene } = useGLTF(props.url)

	return (
		<>
			<primitive
				object={scene}
				scale={props.scale}
				position={
					props.size > 768
						? [...props.position]
						: [props.size.x, props.size.y, props.size.z - 2]
				}
				rotation={[0, -Math.PI / 2, 0]}
			/>
		</>
	)
}

export default Model

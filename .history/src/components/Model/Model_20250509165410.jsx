import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useGLTF } from '@react-three/drei'
import { useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

function Model(props) {
	// const { scene } = useGLTF('/comp2.glb')
	const group = useRef()
	const { scene, animations } = useGLTF(props.url)
	const { actions } = useAnimations(animations, group)
	useEffect(() => {
		console.log(actions)
	}, [])

	return (
		<>
			<primitive
				ref={group}
				object={scene}
				scale={props.scale}
				// position={
				// 	props.size > 768
				// 		? [...props.position]
				// 		: [props.size.x, props.size.y, props.size.z - 2]
				// }
				position={props.position}
				// rotation={[0, -Math.PI / 2, 0]}
				rotation={props.rotation}
			/>
		</>
	)
}

export default Model

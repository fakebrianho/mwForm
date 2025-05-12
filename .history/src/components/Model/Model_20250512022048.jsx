import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useGLTF } from '@react-three/drei'
import { useAnimations } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'

function Model(props) {
	const group = useRef()
	console.log(props)
	const [error, setError] = useState(null)

	// Configure Draco loader
	useEffect(() => {
		// Pre-configure loaders
		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
		const loader = new GLTFLoader()
		loader.setDRACOLoader(dracoLoader)

		return () => dracoLoader.dispose()
	}, [])

	// Catch errors during model loading
	let gltf
	try {
		gltf = useGLTF(props.url, undefined, true)
	} catch (err) {
		console.error('Failed to load model:', err)
		setError(err)
	}

	const { scene, animations } = gltf || { scene: null, animations: [] }
	const { actions } = useAnimations(animations, group)

	if (error) {
		return null
	}

	return (
		<>
			{scene && (
				<primitive
					ref={group}
					object={scene}
					scale={props.scale}
					position={props.position}
					rotation={props.rotation}
				/>
			)}
		</>
	)
}

export default Model

// Preload models for performance
useGLTF.preload('/decimated.glb')
useGLTF.preload('/backrooms_long_hall.glb')

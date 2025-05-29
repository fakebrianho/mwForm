import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import FlashPlane from './FlashPlane'

/**
 * Example component demonstrating the FlashPlane usage
 */
const FlashPlaneExample = () => {
	const handleFlashClick = () => {
		console.log('Flash plane clicked!')
		alert('Flash plane was clicked!')
	}

	const handleSecondFlashClick = () => {
		console.log('Second flash plane clicked!')
	}

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
				{/* Basic lighting */}
				<ambientLight intensity={0.5} />
				<directionalLight position={[10, 10, 5]} intensity={1} />

				{/* Flash plane with flash2.png texture */}
				<FlashPlane
					width={3}
					height={3}
					position={[0, 0, 0]}
					onClick={handleFlashClick}
					animate={true}
				/>

				{/* Additional flash planes for comparison */}
				<FlashPlane
					width={1.5}
					height={1.5}
					position={[-3, 1, 0]}
					rotation={[0, Math.PI / 4, 0]}
					opacity={0.8}
					onClick={handleSecondFlashClick}
				/>

				<FlashPlane
					width={1}
					height={1}
					position={[3, -1, 0]}
					rotation={[Math.PI / 6, -Math.PI / 4, 0]}
					opacity={0.6}
				/>

				{/* Environment and controls */}
				<Environment preset='sunset' />
				<OrbitControls
					enablePan={true}
					enableZoom={true}
					enableRotate={true}
				/>
			</Canvas>
		</div>
	)
}

export default FlashPlaneExample

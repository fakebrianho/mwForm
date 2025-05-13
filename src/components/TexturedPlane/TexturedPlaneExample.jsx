import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Center } from '@react-three/drei'
import TexturedPlane from './TexturedPlane'

/**
 * Example component showing how to use the TexturedPlane component
 */
const TexturedPlaneExample = () => {
	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
				<Suspense fallback={null}>
					{/* Environment lighting for better visuals */}
					<Environment preset='city' />

					{/* Center helps with positioning */}
					<Center>
						{/* Basic example with a valid texture path */}
						<TexturedPlane
							textureUrl='/windows.webp'
							width={3}
							height={2}
						/>

						{/* Example with no texture path - will use the default placeholder */}
						<TexturedPlane
							width={1.5}
							height={1.5}
							position={[0, 0, -2]}
							doubleSided={true}
							animate={true}
						/>

						{/* Example with more props */}
						{/* 
						<TexturedPlane 
							textureUrl="/some-texture.png"
							width={2}
							height={2}
							position={[2, 0, 0]}
							transparent={true}
							opacity={0.8}
							doubleSided={true}
							animate={true}
						/>
						*/}
					</Center>

					{/* OrbitControls allows the user to rotate the view */}
					<OrbitControls />
				</Suspense>
			</Canvas>
		</div>
	)
}

export default TexturedPlaneExample

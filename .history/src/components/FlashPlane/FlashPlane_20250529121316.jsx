import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/**
 * FlashPlane component that displays a flat plane with the flash2.png texture
 * @param {Object} props
 * @param {number} props.width - Width of the plane (default: 2)
 * @param {number} props.height - Height of the plane (default: 2)
 * @param {Array<number>} props.position - Position of the plane [x, y, z] (default: [0, 0, 0])
 * @param {Array<number>} props.rotation - Rotation of the plane [x, y, z] in radians (default: [0, 0, 0])
 * @param {boolean} props.transparent - Whether the texture should be transparent (default: true)
 * @param {number} props.opacity - Opacity of the material (default: 1)
 * @param {boolean} props.doubleSided - Whether the plane should be visible from both sides (default: true)
 * @param {boolean} props.animate - Whether the plane should animate (default: false)
 * @param {Function} props.onClick - Function to call when the plane is clicked
 */
const FlashPlane = ({
	width = 2,
	height = 2,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	transparent = true,
	opacity = 1,
	doubleSided = true,
	animate = false,
	onClick,
	...props
}) => {
	const [textureError, setTextureError] = useState(false)
	const [hovered, setHovered] = useState(false)

	// Set cursor based on hover state
	React.useEffect(() => {
		if (onClick) {
			document.body.style.cursor = hovered ? 'pointer' : 'auto'
		}
		return () => {
			document.body.style.cursor = 'auto'
		}
	}, [hovered, onClick])

	// Load the flash2.png texture using drei's useTexture hook
	const texture = useTexture(
		'/flash2.png',
		// Success callback
		(texture) => {
			// Set texture properties for better quality
			texture.minFilter = THREE.LinearFilter
			texture.magFilter = THREE.LinearFilter
			texture.generateMipmaps = false
		},
		// Error callback
		(error) => {
			console.error('Error loading flash2.png texture:', error)
			setTextureError(true)
		}
	)

	// Create a reference to the mesh for animations
	const meshRef = useRef()

	// Optionally animate the plane
	useFrame((state, delta) => {
		if (animate && meshRef.current) {
			// Gentle floating animation
			meshRef.current.position.y =
				position[1] + Math.sin(state.clock.elapsedTime) * 0.1
			meshRef.current.rotation.z =
				Math.sin(state.clock.elapsedTime * 0.5) * 0.05
		}
	})

	return (
		<mesh
			ref={meshRef}
			position={position}
			rotation={rotation}
			onClick={onClick}
			onPointerOver={onClick ? () => setHovered(true) : undefined}
			onPointerOut={onClick ? () => setHovered(false) : undefined}
			{...props}
		>
			<planeGeometry args={[width, height]} />
			{textureError ? (
				// Fallback material if texture fails to load
				<meshStandardMaterial
					color='#ffff00'
					transparent={transparent}
					opacity={opacity}
					side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
				/>
			) : (
				<meshStandardMaterial
					map={texture}
					transparent={transparent}
					opacity={opacity}
					side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
					alphaTest={0.1}
				/>
			)}
		</mesh>
	)
}

export default FlashPlane

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/**
 * TexturedPlane component that applies a texture to a plane geometry
 * @param {Object} props
//  * @param {string} props.textureUrl - URL to the texture image
 * @param {number} props.width - Width of the plane (default: 1)
 * @param {number} props.height - Height of the plane (default: 1)
 * @param {number} props.widthSegments - Width segments of the plane (default: 1)
 * @param {number} props.heightSegments - Height segments of the plane (default: 1)
 * @param {boolean} props.transparent - Whether the texture should be transparent (default: false)
 * @param {number} props.opacity - Opacity of the material (default: 1)
 * @param {boolean} props.doubleSided - Whether the plane should be visible from both sides (default: false)
 * @param {Array<number>} props.position - Position of the plane [x, y, z] (default: [0, 0, 0])
 * @param {Array<number>} props.rotation - Rotation of the plane [x, y, z] in radians (default: [0, 0, 0])
 * @param {boolean} props.animate - Whether the plane should animate (default: false)
 */
const TexturedPlane = ({
	// textureUrl,
	width = 1,
	height = 1,
	widthSegments = 1,
	heightSegments = 1,
	transparent = false,
	opacity = 1,
	doubleSided = false,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	animate = false,
	...props
}) => {
	// Load the texture using drei's useTexture hook
	const texture = useTexture('./windows.webp')

	// Create a reference to the mesh for animations
	const meshRef = useRef()

	// Optionally animate the plane
	useFrame((state, delta) => {
		if (animate && meshRef.current) {
			meshRef.current.rotation.y += delta * 0.2
		}
	})

	return (
		<mesh ref={meshRef} position={position} rotation={rotation} {...props}>
			<planeGeometry
				args={[width, height, widthSegments, heightSegments]}
			/>
			<meshStandardMaterial
				map={texture}
				transparent={transparent}
				opacity={opacity}
				side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
			/>
		</mesh>
	)
}

export default TexturedPlane

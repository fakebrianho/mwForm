import React, { useRef } from 'react'
import { motion } from 'framer-motion-3d'
import { useGLTF } from '@react-three/drei'

export function Table(props) {
	const { nodes, materials } = useGLTF('/size.compressed.glb')

	// Updated variants with more appropriate 3D properties
	const variants = {
		hidden: {
			opacity: 0,
			y: -0.5, // Start slightly below final position
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1.5,
				ease: 'easeOut',
				delay: 0.5,
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
	}

	// Child variants for individual meshes
	const meshVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: 'easeOut',
			},
		},
	}

	return (
		<motion.group
			initial='hidden'
			animate='visible'
			variants={variants}
			{...props}
			dispose={null}
		>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Keyboard.geometry}
				material={materials.Material_0}
				position={[-0.486, 1.62, 0.833]}
				rotation={[0.179, 0, 0]}
				scale={0.453}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Flower.geometry}
				material={materials.Material_11}
				position={[-1.406, 2.506, -0.151]}
				rotation={[-2.68, 0.732, 2.252]}
				scale={[0.049, 0.288, 0.12]}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Desk.geometry}
				material={materials.Material_12}
				position={[0, 1.452, 0.217]}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Mouse.geometry}
				material={materials.Material_13}
				position={[0.941, 1.571, 0.872]}
				scale={[0.289, 0.294, 0.44]}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Cpu.geometry}
				material={materials.Material_19}
				position={[0.47, 1.741, 0.493]}
				rotation={[1.578, 0, 0]}
				scale={0.067}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Filling_cabnet_1.geometry}
				material={materials.Material_1}
				position={[-2.5, 1.706, 0.091]}
				scale={[1, 1, 0.924]}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Filling_cabnet_10.geometry}
				material={materials.Material_10}
				position={[-2.5, 1.706, 0.091]}
				scale={[1, 1, 0.924]}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Filling_cabnet_5.geometry}
				material={materials.Material_5}
				position={[-2.5, 1.706, 0.091]}
				scale={[1, 1, 0.924]}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Monitor_1.geometry}
				material={materials.Material_14}
				position={[0.322, 1.979, 0.502]}
				rotation={[1.578, 0, 0]}
				scale={0.067}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Monitor_2.geometry}
				material={materials.Material_15}
				position={[0.001, 2.4, 0.498]}
				rotation={[1.578, 0, 0]}
				scale={0.067}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Monitor_3.geometry}
				material={materials.Material_17}
				position={[0.322, 1.979, 0.502]}
				rotation={[1.578, 0, 0]}
				scale={0.067}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Monitor_4.geometry}
				material={materials.Material_18}
				position={[0.322, 1.979, 0.502]}
				rotation={[1.578, 0, 0]}
				scale={0.067}
				variants={meshVariants}
			/>
			<motion.mesh
				castShadow
				receiveShadow
				geometry={nodes.Monitor_5.geometry}
				material={materials.Material_16}
				position={[0.322, 1.979, 0.502]}
				rotation={[1.578, 0, 0]}
				scale={0.067}
				variants={meshVariants}
			/>
		</motion.group>
	)
}

useGLTF.preload('/size.compressed.glb')

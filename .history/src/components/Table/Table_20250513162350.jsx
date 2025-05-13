import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion-3d'
import { useMotionValue, animate } from 'framer-motion'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Table(props) {
	// const { nodes, materials } = useGLTF('/size.compressed.glb')
	const { nodes, materials } = useGLTF('/resized.glb')
	const groupRef = useRef()
	const opacity = useMotionValue(0) // <- correct usage

	useEffect(() => {
		animate(opacity, 1, { duration: 2.5, ease: 'easeInOut' })
	}, [])

	useFrame(() => {
		const val = opacity.get()
		groupRef.current?.traverse((child) => {
			if (child.material) {
				const materials = Array.isArray(child.material)
					? child.material
					: [child.material]
				materials.forEach((mat) => {
					mat.transparent = true
					mat.opacity = val
				})
			}
		})
	})

	return (
		// <motion.group ref={groupRef} position={props.position}>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Keyboard.geometry}
		// 		material={materials.Material_0}
		// 		position={[-0.486, 1.62, 0.833]}
		// 		rotation={[0.179, 0, 0]}
		// 		scale={0.453}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Flower.geometry}
		// 		material={materials.Material_11}
		// 		position={[-1.406, 2.506, -0.151]}
		// 		rotation={[-2.68, 0.732, 2.252]}
		// 		scale={[0.049, 0.288, 0.12]}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Desk.geometry}
		// 		material={materials.Material_12}
		// 		position={[0, 1.452, 0.217]}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Mouse.geometry}
		// 		material={materials.Material_13}
		// 		position={[0.941, 1.571, 0.872]}
		// 		scale={[0.289, 0.294, 0.44]}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Cpu.geometry}
		// 		material={materials.Material_19}
		// 		position={[0.47, 1.741, 0.493]}
		// 		rotation={[1.578, 0, 0]}
		// 		scale={0.067}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Filling_cabnet_1.geometry}
		// 		material={materials.Material_1}
		// 		position={[-2.5, 1.706, 0.091]}
		// 		scale={[1, 1, 0.924]}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Filling_cabnet_10.geometry}
		// 		material={materials.Material_10}
		// 		position={[-2.5, 1.706, 0.091]}
		// 		scale={[1, 1, 0.924]}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Filling_cabnet_5.geometry}
		// 		material={materials.Material_5}
		// 		position={[-2.5, 1.706, 0.091]}
		// 		scale={[1, 1, 0.924]}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Monitor_1.geometry}
		// 		material={materials.Material_14}
		// 		position={[0.322, 1.979, 0.502]}
		// 		rotation={[1.578, 0, 0]}
		// 		scale={0.067}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Monitor_2.geometry}
		// 		material={materials.Material_15}
		// 		position={[0.001, 2.4, 0.498]}
		// 		rotation={[1.578, 0, 0]}
		// 		scale={0.067}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Monitor_3.geometry}
		// 		material={materials.Material_17}
		// 		position={[0.322, 1.979, 0.502]}
		// 		rotation={[1.578, 0, 0]}
		// 		scale={0.067}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Monitor_4.geometry}
		// 		material={materials.Material_18}
		// 		position={[0.322, 1.979, 0.502]}
		// 		rotation={[1.578, 0, 0]}
		// 		scale={0.067}
		// 	/>
		// 	<motion.mesh
		// 		castShadow
		// 		receiveShadow
		// 		geometry={nodes.Monitor_5.geometry}
		// 		material={materials.Material_16}
		// 		position={[0.322, 1.979, 0.502]}
		// 		rotation={[1.578, 0, 0]}
		// 		scale={0.067}
		// 	/>
		// </motion.group>
		<motion.group ref={groupRef} {...props} dispose={null}>
			<group position={[-2.5, -0.696, 0.091]} scale={[1, 1, 0.924]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_1.geometry}
					material={nodes.Mouse_1.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_2.geometry}
					material={nodes.Mouse_2.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_3.geometry}
					material={nodes.Mouse_3.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_4.geometry}
					material={nodes.Mouse_4.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_5.geometry}
					material={nodes.Mouse_5.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_6.geometry}
					material={nodes.Mouse_6.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_7.geometry}
					material={nodes.Mouse_7.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_8.geometry}
					material={nodes.Mouse_8.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_9.geometry}
					material={nodes.Mouse_9.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_10.geometry}
					material={nodes.Mouse_10.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_11.geometry}
					material={nodes.Mouse_11.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_12.geometry}
					material={nodes.Mouse_12.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_13.geometry}
					material={nodes.Mouse_13.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_14.geometry}
					material={nodes.Mouse_14.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_15.geometry}
					material={nodes.Mouse_15.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_16.geometry}
					material={nodes.Mouse_16.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_17.geometry}
					material={nodes.Mouse_17.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_18.geometry}
					material={nodes.Mouse_18.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_19.geometry}
					material={nodes.Mouse_19.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_20.geometry}
					material={nodes.Mouse_20.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_21.geometry}
					material={nodes.Mouse_21.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_22.geometry}
					material={nodes.Mouse_22.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_23.geometry}
					material={nodes.Mouse_23.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_24.geometry}
					material={nodes.Mouse_24.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_25.geometry}
					material={nodes.Mouse_25.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_26.geometry}
					material={nodes.Mouse_26.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_27.geometry}
					material={nodes.Mouse_27.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_28.geometry}
					material={nodes.Mouse_28.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_29.geometry}
					material={nodes.Mouse_29.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_30.geometry}
					material={nodes.Mouse_30.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_31.geometry}
					material={nodes.Mouse_31.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_32.geometry}
					material={nodes.Mouse_32.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_33.geometry}
					material={nodes.Mouse_33.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_34.geometry}
					material={nodes.Mouse_34.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_35.geometry}
					material={nodes.Mouse_35.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_36.geometry}
					material={nodes.Mouse_36.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_37.geometry}
					material={nodes.Mouse_37.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_38.geometry}
					material={nodes.Mouse_38.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_39.geometry}
					material={nodes.Mouse_39.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_40.geometry}
					material={nodes.Mouse_40.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_41.geometry}
					material={nodes.Mouse_41.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_42.geometry}
					material={nodes.Mouse_42.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_43.geometry}
					material={nodes.Mouse_43.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_44.geometry}
					material={nodes.Mouse_44.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_45.geometry}
					material={nodes.Mouse_45.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_46.geometry}
					material={nodes.Mouse_46.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_47.geometry}
					material={nodes.Mouse_47.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_48.geometry}
					material={nodes.Mouse_48.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_49.geometry}
					material={nodes.Mouse_49.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_50.geometry}
					material={nodes.Mouse_50.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_51.geometry}
					material={nodes.Mouse_51.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_52.geometry}
					material={nodes.Mouse_52.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_53.geometry}
					material={nodes.Mouse_53.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_54.geometry}
					material={nodes.Mouse_54.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_55.geometry}
					material={nodes.Mouse_55.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_56.geometry}
					material={nodes.Mouse_56.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_57.geometry}
					material={nodes.Mouse_57.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_58.geometry}
					material={nodes.Mouse_58.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_59.geometry}
					material={nodes.Mouse_59.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_60.geometry}
					material={nodes.Mouse_60.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_61.geometry}
					material={nodes.Mouse_61.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_62.geometry}
					material={nodes.Mouse_62.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_63.geometry}
					material={nodes.Mouse_63.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_64.geometry}
					material={nodes.Mouse_64.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_65.geometry}
					material={nodes.Mouse_65.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_66.geometry}
					material={nodes.Mouse_66.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_67.geometry}
					material={nodes.Mouse_67.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_68.geometry}
					material={nodes.Mouse_68.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_69.geometry}
					material={nodes.Mouse_69.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_70.geometry}
					material={nodes.Mouse_70.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_71.geometry}
					material={nodes.Mouse_71.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_72.geometry}
					material={nodes.Mouse_72.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_73.geometry}
					material={nodes.Mouse_73.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_74.geometry}
					material={nodes.Mouse_74.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_75.geometry}
					material={nodes.Mouse_75.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_76.geometry}
					material={nodes.Mouse_76.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_77.geometry}
					material={nodes.Mouse_77.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_78.geometry}
					material={nodes.Mouse_78.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_79.geometry}
					material={nodes.Mouse_79.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_80.geometry}
					material={nodes.Mouse_80.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_81.geometry}
					material={nodes.Mouse_81.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_82.geometry}
					material={nodes.Mouse_82.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_83.geometry}
					material={nodes.Mouse_83.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_84.geometry}
					material={nodes.Mouse_84.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_85.geometry}
					material={nodes.Mouse_85.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_86.geometry}
					material={nodes.Mouse_86.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_87.geometry}
					material={nodes.Mouse_87.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_88.geometry}
					material={nodes.Mouse_88.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_89.geometry}
					material={nodes.Mouse_89.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Mouse_90.geometry}
					material={nodes.Mouse_90.material}
				/>
			</group>
			<group position={[-2.5, -0.696, 0.091]} scale={[1, 1, 0.924]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_1.geometry}
					material={nodes.Filling_cabnet_12_1.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_2.geometry}
					material={nodes.Filling_cabnet_12_2.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_3.geometry}
					material={nodes.Filling_cabnet_12_3.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_4.geometry}
					material={nodes.Filling_cabnet_12_4.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_5.geometry}
					material={nodes.Filling_cabnet_12_5.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_6.geometry}
					material={nodes.Filling_cabnet_12_6.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_7.geometry}
					material={nodes.Filling_cabnet_12_7.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_8.geometry}
					material={nodes.Filling_cabnet_12_8.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_9.geometry}
					material={nodes.Filling_cabnet_12_9.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_10.geometry}
					material={nodes.Filling_cabnet_12_10.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_11.geometry}
					material={nodes.Filling_cabnet_12_11.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_12.geometry}
					material={nodes.Filling_cabnet_12_12.material}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Filling_cabnet_12_13.geometry}
					material={nodes.Filling_cabnet_12_13.material}
				/>
			</group>
			<group rotation={[0, -0.334, 0]}>
				<directionalLight
					intensity={1}
					decay={2}
					color='#f3ede1'
					position={[0.794, 4.945, 1.474]}
					rotation={[-1.427, 0.173, 0.202]}
				/>
			</group>
		</motion.group>
	)
}

useGLTF.preload('/resized.glb')

import { useThree, useLoader } from '@react-three/fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { useEffect } from 'react'
import * as THREE from 'three'

function RotatedEnvironment({ url, rotation = 0 }) {
	const { scene, gl } = useThree()
	const hdrTexture = useLoader(RGBELoader, url)

	useEffect(() => {
		hdrTexture.mapping = THREE.EquirectangularReflectionMapping

		// Create a cube render target with PMREMGenerator
		const pmrem = new THREE.PMREMGenerator(gl)
		pmrem.compileEquirectangularShader()

		// Apply rotation to the texture
		const sceneWithEnv = new THREE.Scene()
		const envMesh = new THREE.Mesh(
			new THREE.BoxGeometry(),
			new THREE.MeshBasicMaterial({
				envMap: hdrTexture,
				side: THREE.BackSide,
			})
		)
		envMesh.rotation.y = rotation // Rotate here (in radians)
		sceneWithEnv.add(envMesh)

		const envRT = pmrem.fromScene(sceneWithEnv)
		scene.environment = envRT.texture
		scene.background = envRT.texture

		return () => {
			hdrTexture.dispose()
			pmrem.dispose()
			envRT.texture.dispose()
		}
	}, [hdrTexture, gl, rotation, scene])

	return null
}

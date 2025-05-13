import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
function Model() {
	const gltf = useLoader(GLTFLoader, '/retro_computer.glb')
	return <div>Model</div>
}

export default Model

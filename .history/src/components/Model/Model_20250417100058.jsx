import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
function Model() {
	const gltf = useLoader(GLTFLoader, '/')
	return <div>Model</div>
}

export default Model

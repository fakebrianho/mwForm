import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'
function Model(props) {
	const gltf = useLoader(GLTFLoader, '/retro_computer.glb')
    return (<><primitive object={gltf.scene} scale={0.5}</>)
}

export default Model

'use client'
import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question from '@/components/Question/Question'
import { useEffect, useState } from 'react'
import { useSaveData } from '@/app/hooks/useData'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import Model from '@/components/Model/Model'
import { Environment, OrbitControls } from '@react-three/drei'
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import TexturedPlane from '@/components/TexturedPlane'
import { useGLTF } from '@react-three/drei'
import { Table } from '@/components/Table/Table'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
import { MeshoptDecoder } from 'three/examples/jsm/loaders/MeshoptDecoder'

// Create a new component to handle the debugging
function RendererDebugger() {
	const { gl: renderer } = useThree()

	useEffect(() => {
		if (renderer) {
			const gl = renderer.getContext()
			console.log(
				'MAX_TEXTURE_SIZE:',
				gl.getParameter(gl.MAX_TEXTURE_SIZE)
			)
			console.log(
				'MAX_RENDERBUFFER_SIZE:',
				gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)
			)
			console.log(
				'MAX_TEXTURE_IMAGE_UNITS:',
				gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)
			)
		}
	}, [renderer])

	return null
}

// Create a component to handle KTX2 texture loading
function TextureOptimizer() {
	const { gl, scene } = useThree()

	useEffect(() => {
		// Initialize KTX2 loader
		const ktx2Loader = new KTX2Loader()
			.setTranscoderPath('/basis/') // Path to transcoder files
			.detectSupport(gl)

		// Check if we're on mobile for conditional normal map loading
		const isMobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)

		// Set a global flag that can be used by your materials
		window.USE_NORMAL_MAPS = !isMobile

		return () => {
			ktx2Loader.dispose()
		}
	}, [gl])

	return null
}

export default function Home() {
	useEffect(() => {
		const SPECTOR = require('spectorjs')
		const spector = new SPECTOR.Spector()
		spector.displayUI()
	}, [])
	const [dpr, setDpr] = useState(1)
	useEffect(() => {
		// Runs only on client
		setDpr(Math.min(window.devicePixelRatio, 1.5))
	}, [])
	const [stage, setStage] = useState(0)
	const saveData = useSaveData()
	const [answer1, setAnswer1] = useState('')
	const [answer2, setAnswer2] = useState('')
	const [answer3, setAnswer3] = useState('')
	const [answer4, setAnswer4] = useState('')
	const [answer5, setAnswer5] = useState('')
	const [answer6, setAnswer6] = useState('')
	const [answer7, setAnswer7] = useState('')
	const windowWidth = useWindowWidth()

	function TexturedPlaneWithClick({ position, width, height, onClick }) {
		return (
			<TexturedPlane
				position={position}
				width={width}
				height={height}
				onClick={onClick}
			/>
		)
	}
	const handlePlaneClick = (event) => {
		event.stopPropagation()
		setShowQuestions(true)
	}
	function ModelLoader({ url, ...props }) {
		const { gl } = useThree()
		const isMobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)

		// Use the useGLTF hook to load the model
		const { scene } = useGLTF(url, (loader) => {
			// Configure GLTF loading to use KTX2 textures when available
			const ktx2Loader = new KTX2Loader()
				.setTranscoderPath('/basis/')
				.detectSupport(gl)

			loader.setKTX2Loader(ktx2Loader)

			// Set mesh optimization options based on device
			if (isMobile) {
				loader.setMeshoptDecoder(MeshoptDecoder)
			}
		})

		// If the scene is available, render a primitive with it
		if (!scene) return null

		return (
			<primitive
				object={scene}
				scale={props.scale || 1}
				position={props.position || [0, 0, 0]}
				rotation={props.rotation || [0, 0, 0]}
			/>
		)
	}

	useEffect(() => {
		if (stage === 8) {
			const payload = {
				shop_name: answer1,
				instagram: answer2,
				city: answer3,
				address: answer4,
				fee: answer5,
				contact: answer6,
				email: answer7,
			}
			saveData.mutate(payload)
		}
	}, [stage])
	return (
		<div className={styles.page}>
			<div id='canvas-container'>
				<Canvas camera={{ position: [0, 0.1, 5] }} dpr={dpr}>
					<Suspense fallback={null}>
						<TextureOptimizer />
						<mesh>
							<OrbitControls />
							{/* <RendererDebugger /> */}
							{/* <Table /> */}
							<ModelLoader
								size={windowWidth}
								scale={0.4}
								position={[0, -0.47, 3.3]}
								rotation={[0, 0, 0]}
								url={'/comp2.glb'}
							/>

							<ModelLoader
								position={[0, 0, 0]}
								size={windowWidth}
								rotation={[0, -Math.PI / 2, 0]}
								url={'/backrooms_long_hall.glb'}
							/>
							<Environment
								preset='warehouse'
								// environmentIntensity={0.3}
							/>
						</mesh>
					</Suspense>
					<TexturedPlaneWithClick
						position={[0, 0.48, 3.507]}
						width={0.31}
						height={0.3}
						onClick={handlePlaneClick}
					/>
				</Canvas>
			</div>
			<main className={styles.main}>
				{stage === 0 && <Question1 setStage={setStage} />}
				{stage === 1 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Name: '}
						answerQuestion={setAnswer1}
					/>
				)}
				{stage === 2 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Instagram Handle: '}
						answerQuestion={setAnswer2}
					/>
				)}
				{stage === 3 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'City: '}
						answerQuestion={setAnswer3}
					/>
				)}
				{stage === 4 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={
							'If you know the full address: (This will not be public) '
						}
						answerQuestion={setAnswer4}
					/>
				)}
				{stage === 5 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Cut / Fee'}
						answerQuestion={setAnswer5}
					/>
				)}
				{stage === 6 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Email or Contact Info'}
						answerQuestion={setAnswer6}
					/>
				)}
				{stage === 7 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={
							'Your email, if you want us to send you access to the database when its public.'
						}
						answerQuestion={setAnswer7}
					/>
				)}
				<div
					style={{
						width: '100%',
						marginTop: '50px',
						textAlign: 'center',
						position: 'fixed',
						bottom: '100px',
						left: 0,
					}}
				>
					{/* Windows 98 style segmented progress bar */}
					<div
						style={{
							width: '300px',
							height: '16px',
							border: 'inset 2px #c0c0c0',
							margin: '0 auto',
							position: 'relative',
							background: '#fff',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								width: `${(stage / 8) * 100}%`,
								height: '100%',
								background: 'navy',
								position: 'absolute',
								top: 0,
								left: 0,
								backgroundImage:
									'linear-gradient(to right, navy, navy 5px, #0000cd 5px, #0000cd 10px)',
								backgroundSize: '10px 100%',
								backgroundRepeat: 'repeat-x',
							}}
						></div>
					</div>
				</div>
			</main>
		</div>
	)
}

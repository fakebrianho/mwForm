'use client'
import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question from '@/components/Question/Question'
import { useEffect, useState, useRef } from 'react'
import { useSaveData } from '@/app/hooks/useData'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import {
	Environment,
	OrbitControls,
	useGLTF,
	useAnimations,
} from '@react-three/drei'
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { Howl, Howler } from 'howler'
import { Vector2 } from 'three'
import TexturedPlane from '@/components/TexturedPlane'
import { Instances } from '@/components/Test/Test'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Loading from '@/components/Loading/Loading'
import gsap from 'gsap'

// This component will track mouse position inside the Canvas
function MouseTracker({ setMousePosition }) {
	const { camera, viewport } = useThree()
	const halfX = viewport.width / 2
	const halfY = viewport.height / 2

	useFrame(({ mouse }) => {
		// mouse is already normalized between -1 and 1
		console.log('Mouse position (normalized):', mouse.x, mouse.y)
		const mouseX = (mouse.x - halfX) / 10
		const mouseY = (mouse.y - halfY) / 10
		camera.position.x += mouseX - camera.position.x
		camera.position.y += -mouseY - camera.position.y
		// Just pass these normalized coordinates directly
		setMousePosition(new THREE.Vector2(mouse.x, mouse.y))
	})

	return null
}

// Simple component to handle model loading
function ModelLoader({ url, ...props }) {
	// Create a reference for the model
	const modelRef = useRef()

	// Use the useGLTF hook to load the model
	const { scene, animations } = useGLTF(url)

	// Use useAnimations for any animations with the ref
	const { actions } = useAnimations(animations, modelRef)

	// If the scene is available, render a primitive with it
	if (!scene) return null

	return (
		<primitive
			ref={modelRef}
			object={scene}
			scale={props.scale || 1}
			position={props.position || [0, 0, 0]}
			rotation={props.rotation || [0, 0, 0]}
		/>
	)
}

// Make sure to preload models in a static context
useGLTF.preload('/comp.glb')
useGLTF.preload('/backrooms_long_hall.glb')

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

// Create a more reliable camera animation component
function CameraAnimation() {
	const { camera } = useThree()
	const initialized = useRef(false)

	useEffect(() => {
		// Store the original target position
		const targetPosition = { x: 0, y: 0.5, z: 5 }

		// Save these values for cleanup
		const originalX = camera.position.x
		const originalY = camera.position.y
		const originalZ = camera.position.z

		// Set initial position (further away)
		camera.position.set(targetPosition.x, targetPosition.y, 20)

		// Create the animation with GSAP
		const tween = gsap.to(camera.position, {
			x: targetPosition.x,
			y: targetPosition.y,
			z: targetPosition.z,
			duration: 3,
			ease: 'power2.out',
			delay: 0.5,
		})

		initialized.current = true

		// Clean up function to reset camera if needed
		return () => {
			tween.kill()
			// Optionally reset camera position on unmount
			// camera.position.set(originalX, originalY, originalZ);
		}
	}, [])

	return null
}

export default function Home() {
	const [stage, setStage] = useState(0)
	const [showQuestions, setShowQuestions] = useState(false)
	const saveData = useSaveData()
	const [answer1, setAnswer1] = useState('')
	const [answer2, setAnswer2] = useState('')
	const [answer3, setAnswer3] = useState('')
	const [answer4, setAnswer4] = useState('')
	const [answer5, setAnswer5] = useState('')
	const [answer6, setAnswer6] = useState('')
	const [answer7, setAnswer7] = useState('')
	const windowWidth = useWindowWidth()
	const [mousePosition, setMousePosition] = useState(new THREE.Vector2())
	const [modelsLoaded, setModelsLoaded] = useState(false)
	const [loadingComplete, setLoadingComplete] = useState(false)
	const [loadError, setLoadError] = useState(null)
	const fadeOverlayRef = useRef(null)

	// Set models as loaded when both are ready
	useEffect(() => {
		let isMounted = true

		const loadModels = async () => {
			try {
				// Create a single loader for both models with Draco compression
				const dracoLoader = new DRACOLoader()
				dracoLoader.setDecoderPath(
					'https://www.gstatic.com/draco/v1/decoders/'
				)

				const gltfLoader = new GLTFLoader()
				gltfLoader.setDRACOLoader(dracoLoader)

				// Create loaders for each model
				const model1Promise = new Promise((resolve, reject) => {
					gltfLoader.load(
						'/comp.glb',
						(gltf) => resolve(gltf),
						undefined,
						(error) => reject(error)
					)
				})

				const model2Promise = new Promise((resolve, reject) => {
					gltfLoader.load(
						'/backrooms_long_hall.glb',
						(gltf) => resolve(gltf),
						undefined,
						(error) => reject(error)
					)
				})

				// Wait for both models to load
				await Promise.all([model1Promise, model2Promise])

				// Only update state if component is still mounted
				if (isMounted) {
					// Add a small delay to ensure everything is ready
					setTimeout(() => {
						if (isMounted) setModelsLoaded(true)
					}, 1000)
				}
			} catch (error) {
				console.error('Failed to load models:', error)
				if (isMounted) {
					setLoadError(error.message || 'Failed to load 3D models')
				}
			}
		}

		loadModels()

		// Cleanup function to prevent state updates after unmount
		return () => {
			isMounted = false
		}
	}, [])

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

	// Add a new effect for fade transition using GSAP
	useEffect(() => {
		if (modelsLoaded && fadeOverlayRef.current) {
			// Create a timeline for sequenced animations
			const tl = gsap.timeline({
				onComplete: () => setLoadingComplete(true),
			})

			// Add fade out animation to the timeline
			tl.to(fadeOverlayRef.current, {
				opacity: 0,
				duration: 2,
				ease: 'power2.inOut',
				delay: 1,
			})

			return () => {
				tl.kill()
			}
		}
	}, [modelsLoaded])

	// Handle click on the TexturedPlane
	const handlePlaneClick = (event) => {
		event.stopPropagation()
		setShowQuestions(true)
	}

	// If there's a loading error, show error message
	if (loadError) {
		return (
			<div className={styles.error}>
				<h2>Error loading 3D environment</h2>
				<p>{loadError}</p>
				<button onClick={() => window.location.reload()}>
					Try Again
				</button>
			</div>
		)
	}

	// Only show loading screen if transition isn't complete
	if (!loadingComplete) {
		return (
			<>
				<Loading />
				{modelsLoaded && (
					<div
						ref={fadeOverlayRef}
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100vw',
							height: '100vh',
							background: 'black',
							opacity: 1,
							zIndex: 1000,
							pointerEvents: 'none',
						}}
					/>
				)}
			</>
		)
	}

	// Render the full application once models are loaded
	return (
		<div className={styles.page}>
			<div id='canvas-container'>
				<Canvas
					camera={{ position: [0, 0.5, 5] }}
					gl={{
						preserveDrawingBuffer: true,
						antialias: true,
						powerPreference: 'high-performance',
						failIfMajorPerformanceCaveat: false,
						onContextLost: (event) => {
							console.log(
								'WebGL context lost, attempting to restore'
							)
							event.preventDefault()
						},
					}}
				>
					<CameraAnimation />
					<mesh>
						<OrbitControls
							enableZoom={false}
							enableDamping={true}
							enablePan={false}
							minPolarAngle={Math.PI / 2.35}
							maxPolarAngle={Math.PI / 2}
							minAzimuthAngle={-Math.PI / 15}
							dampingFactor={0.035}
							maxAzimuthAngle={Math.PI / 15}
							rotateSpeed={0.15}
						/>
						<ModelLoader
							size={windowWidth}
							scale={0.4}
							position={[0, 0.49, 3.3]}
							rotation={[0, 0, 0]}
							url={'/comp.glb'}
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
					<TexturedPlaneWithClick
						position={[0, 0.48, 3.507]}
						width={0.31}
						height={0.3}
						onClick={handlePlaneClick}
					/>
				</Canvas>
			</div>
			<main className={styles.main}>
				{showQuestions && (
					<>
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
					</>
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
